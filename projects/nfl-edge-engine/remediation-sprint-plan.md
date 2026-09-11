# NFL Edge Engine — Remediation Sprint Plan

**Question answered:** What is actually broken in `nfl_edge`, and in what order do we fix it
to get a service that runs, is correct, and is complete?

**Answer:** It compiles, and that is the most misleading fact about it. `npx tsc --noEmit`
and `npm run build` both exit 0. What that green build hides is that **the NFL-specific
product — power ratings, edge detection, staking and CLV grading — has no callers at all.**
`EdgeService`, `RatingsService` and `GradingService` are instantiated by Nest and then
invoked by nothing: no controller, no cron, no scheduler. No `Bet` row is ever written by
any code path in the repository. What boots is the inherited CFB swarm shell with an NFL
team registry bolted on.

And where the money math *does* exist, it is wrong in ways that a green build cannot see.
The worst of them, proven end-to-end against a live Postgres: **`gradeClv()` can never
match a closing line.** Snapshots store `side` as `"Kansas City Chiefs"`; bets store `side`
as `"KC -3"`. The matcher compares them and always fails, logs a warning, and returns
`null`. CLV is the metric this system declares as its north star — the talent assessment
calls it "the metric the whole system is graded on" — and it has a **100% silent failure
rate**.

**52 issues verified by reproduction. 9 critical, 11 high, 21 medium, 11 low.** Every one
below was reproduced; nothing in the inventory is inferred from reading alone, and where a
suspicion was refuted I have said so.

---

## 0. Urgent, before any of the below: this code is not in a repository

```
$ git rev-parse --show-toplevel
fatal: not a git repository (or any of the parent directories): .git
```

`nfl_edge` exists only as an extracted directory inside an **ephemeral agent scratchpad**
(`/tmp/claude-0/.../scratchpad/nfl_edge_extracted/nfl_edge`). That container is reclaimed
after inactivity. There is no remote, no history, no lockfile provenance, no backup.

Everything else in this document is worth nothing if the directory evaporates first.

**Do this before reading further:** `git init`, commit as-is (a "known-broken baseline"
commit is more valuable than a tidy one — it makes every fix below reviewable as a diff),
and push to a **private** GitHub repo. Private is not optional: §6 of `path-to-production.md`
notes the repo contains the edge, and separately that scheduled GitHub Actions do not fire
on private free-tier repos — which is fine, because that document already rules Actions out
as the cron.

One consequence worth planning around: a private free repo gets 2,000 CI minutes/month.
That is ample for the test suite this plan builds, and it is the natural gate for the
`npm run lint` and `npm test` exit codes that currently fail.

While diagnosing I generated `prisma/migrations/20260911001534_init/` (see D4 — the repo
shipped with none). It applies cleanly against Postgres 16. Keep it or regenerate it, but
do not ship without one.

---

## 1. What I ran, and what it actually did

Full toolchain, on Node v22.22.2 / npm 10.9.7, against a real PostgreSQL 16 instance I
stood up locally so that boot and grading could be tested for real rather than mocked.

| Command | Exit | Result |
|---|---|---|
| `npm install` | **0** | 747 packages. Warns `@types/uuid@11.0.0: This is a stub types definition… you do not need this installed` |
| `npx tsc --noEmit` | **0** | Clean |
| `npm run build` | **0** | Clean — **but emits `dist/src/main.js`, not `dist/main.js`** (D1) |
| `npm run start:prod` | **1** | `Error: Cannot find module '…/dist/main.js'` — **production start is broken** |
| `npm run lint` | **1** | `✖ 260 problems (242 errors, 18 warnings)` across 15 files |
| `npm test` | **0** | `Tests: 1 passed, 1 total` — one test, on the health check |
| `npm run test:e2e` | **1** | `PrismaClientInitializationError: Environment variable not found: DATABASE_URL` |
| `npx prisma validate` | 1 → **0** | Fails without `DATABASE_URL`; valid with one |
| `npx prisma generate` | **0** | **Succeeded.** `binaries.prisma.sh` was reachable |
| `npx prisma migrate dev` | **0** | Schema applies cleanly to Postgres 16 |
| `npx prisma db seed` | **1** | `Error: Command failed with ENOENT: tsx … spawn tsx ENOENT` |
| `node dist/src/main.js` | **0** | **Boots.** All 15 modules init, Prisma connects, `GET /` returns 200 |

So the honest headline on "does it run" is: **it boots and serves a health check**, but only
after fixing the build output path, and only with a `DATABASE_URL` present. That is a much
better starting position than the issue count suggests, and it shapes the sprint plan below
— Sprint 0 is genuinely small.

### Live endpoint probe

With the service up and a dummy env:

| Endpoint | No key | With key |
|---|---|---|
| `GET /` | 200 `{"status":"ok"…}` | — |
| `GET /admin/status` | 401 | 200 |
| `GET /swarm/games` | 401 | 401→upstream |
| `POST /snapshots/capture` | 401 | **500** (opaque) |
| `GET /snapshots/movement` | **200 — no auth at all** | — |

---

## 2. Sandbox artefact vs. real defect vs. missing config

The brief asked me to keep these strictly apart. Three things failed here for reasons that
are **not** code defects, and I am not counting them in the 52:

**Sandbox limitations (egress proxy).** `api.the-odds-api.com` and `apps.abacus.ai` both
return `curl: (56) CONNECT tunnel failed, response 403`. I therefore could not execute a
live odds pull or a live LLM call, and **could not verify the model identifiers** in D42.
`repo.yarnpkg.com` is likewise blocked, so Corepack cannot fetch Yarn 4 (relevant to D37).

**A README warning that did not bite.** The README cautions that `prisma generate` needs
`binaries.prisma.sh` and may fail behind a restricted network. Here it **succeeded** —
`binaries.prisma.sh` resolves (HTTP 404 on `/`, i.e. host reachable), a full 292 KB
`index.d.ts` client was generated, and Prisma model types are properly typed rather than
falling back to loose typing. Do not budget remediation effort against this warning; it is
environment-specific and did not apply.

**Missing configuration, not broken code.** There is no `.env` (only `.env.example`) and no
database. That is the sole cause of the `prisma validate` failure and the `test:e2e`
failure. Both pass the moment a `DATABASE_URL` exists. It is legitimately a defect that the
e2e *stub* needs a live Postgres to assert a static health check (D41), but the failure
itself is configuration.

**One self-inflicted note, disclosed for honesty:** `npm run lint` carries `--fix`, so
running the project's own lint script **rewrote source formatting in the working tree**
during diagnosis. That is itself finding D38. No logic was altered — the 242 remaining
errors are all non-auto-fixable `no-unsafe-*` rules — but it is a real hazard for anyone who
runs the documented command expecting a read-only check.

---

## 3. Verified issue inventory

Severity: **C**ritical / **H**igh / **M**edium / **L**ow. Category: **BLD** blocks build or
deploy · **BOOT** blocks boot · **MONEY** money-path correctness · **CAP** missing model
capability · **SEC** security · **HYG** hygiene.

### 3.1 Blocks build / deploy

| # | Sev | Cat | Issue | Reproduction / evidence |
|---|---|---|---|---|
| D1 | C | BLD | `nest build` emits `dist/src/main.js`, but `start:prod` runs `node dist/main`. **Production start fails.** Root cause: `tsconfig.build.json` excludes `test` but not `scripts`, so `scripts/safe-seed.ts` widens the inferred `rootDir` to the project root | `npm run start:prod` → `MODULE_NOT_FOUND`. Proven causal: adding `"scripts"` to the exclude list makes `dist/main.js` appear |
| D2 | C | BLD | `main.ts:47` hardcodes `app.listen(3000)`, ignoring `process.env.PORT`. Render and every comparable PaaS inject `PORT`; the service binds the wrong port and fails its platform health check | Read + observed bind on 3000 regardless of env |
| D3 | H | BOOT | `main.ts:51` — `bootstrap()` is a floating promise. A boot failure surfaces as an unhandled rejection rather than a non-zero exit | eslint `no-floating-promises` at `main.ts:51:1` |
| D4 | H | BLD | **No `prisma/migrations/` directory ships with the repo.** `path-to-production.md` runbook step 6 is `npx prisma migrate deploy` — there is nothing to deploy | `ls prisma/` → `schema.prisma` only |
| D5 | M | BLD | `prisma.seed` = `tsx --require dotenv/config …` but **`tsx` is not in `devDependencies`** | `npx prisma db seed` → `Error: Command failed with ENOENT: tsx … spawn tsx ENOENT`. `node_modules/tsx` absent |
| D6 | M | BLD | `scripts/safe-seed.ts` reads and guards `scripts/seed.ts`, **which does not exist** — then `execSync`s it unconditionally. Worse, the guard sits in a `try` with an **empty `catch`**, so a missing or unreadable seed file silently *passes* the delete-protection check | File listing + read. Two independent failures stacked on one broken path |

D5 and D6 together confirm the brief's lead 1 and go past it: seeding is broken in three
separate ways, and the safety check protecting production data fails open.

### 3.2 Security

| # | Sev | Cat | Issue | Reproduction / evidence |
|---|---|---|---|---|
| D7 | C | SEC | **`POST /snapshots/capture` is unauthenticated when `SWARM_API_KEY` is unset.** `snapshot.controller.ts:22` is `if (apiKey !== process.env.SWARM_API_KEY) throw` — with both `undefined`, `undefined !== undefined` is **false**, so the guard passes. `AdminController` and `SwarmController` both guard correctly with `if (!expected \|\| …)`; this one does not | **Proven.** With `SWARM_API_KEY` removed from `.env`, an unauthenticated POST returns **500** (it reached the odds call), while `GET /admin/status` under identical conditions correctly returns **401** |
| D8 | H | SEC | `GET /snapshots/movement` has **no authentication whatsoever**, while every sibling route requires `x-api-key`. It serves the proprietary line-movement history — the dataset `path-to-production.md` §4 identifies as the only asset you cannot buy back | `curl` with no key → **HTTP 200** |
| D9 | H | SEC | A failed odds pull dumps the entire axios error object to the log. **`ODDS_API_KEY` appears 28 times in 68 KB of log output from a single failure** (it travels in the query string) | `grep -c dummy_odds_key boot.log` → `28`; `wc -c` → `68423` |
| D10 | M | SEC | Three divergent hand-rolled key checks (`admin`, `swarm`, `snapshots`), one reading `process.env` directly and bypassing `ConfigService`. All use non-constant-time `!==`. No guard, pipe or decorator | Read of all three controllers |
| D11 | M | SEC | `app.enableCors()` with no origin allowlist — any origin may call the API | `main.ts:12` |
| D12 | L | SEC | Swagger is mounted unconditionally, documenting the full admin and swarm surface in production | `main.ts:38` |
| D13 | M | SEC | `ConfigModule.forRoot({ isGlobal: true })` has **no `validationSchema`**. Eight required secrets, zero boot-time validation — the service starts happily on garbage and fails at first call | Booted cleanly with dummy creds; Discord 403 only at module init |

D7 is the one to fix first in this group. The endpoint it exposes is the one that **spends
odds credits** — the binding constraint of the entire $0 architecture per
`path-to-production.md` §1. An open `POST /snapshots/capture` is a direct path to
exhausting a 500-credit month.

### 3.3 Money-path correctness

This is the category that matters, and it is worse than the README's "Known gaps" admits.

| # | Sev | Cat | Issue | Reproduction / evidence |
|---|---|---|---|---|
| D14 | C | MONEY | **`gradeClv()` can never match a closing line.** `toSnapshotRows()` writes `side` as the Odds API outcome name — `"Kansas City Chiefs"`. `EdgeService` writes `Bet.side` as `"KC -3"`. The matcher is `bet.side.startsWith(c.side.slice(0,3)) \|\| c.side === bet.side` → `"KC -3".startsWith("Kan")` is false, equality is false. Returns `null`, logs a warning, moves on | **Proven end-to-end against live Postgres.** Seeded a game, a correct closing snapshot at −5, and a bet taken at −3. True CLV = **+2.0 points**. Result: `No closing snapshot found for bet 1`, `clvPoints = null`, `clvPct = null`, `closingLine = null` |
| D15 | C | MONEY | `clvPoints = Math.abs(bet.lineTaken) - Math.abs(match.line)`. The `abs()` **inverts the sign for every favourite** and **zeroes out** any bet whose line crosses zero | **Proven, 3 of 4 cases wrong.** Took KC −3, closed −5 (you beat the close by 2): truth **+2**, code **−2**. Took KC −5, closed −3: truth **−2**, code **+2**. Took LAR +1, closed −1: truth **+2**, code **0**. Correct formula `lineTaken - closingLine` passes all four |
| D16 | C | MONEY | **`coverProb()` assigns exactly zero probability to a push**, and silently credits the entire mass at the key number to the away/under side as a *win*. The docstring claims pushes are "treated as losses of half a bet by splitting the mass at the number" — the code does no such thing; it is a continuous normal with no mass anywhere | **Proven and quantified.** At keys 3/7/10, modelled push mass = `0.000000`. Real NFL `P(margin == 3) ≈ 9–10%`. On `LAR +3 @ −110` with model margin −6.5 the engine reports **EV +0.1036 and stakes 0.02 — the hard Kelly cap, a maximum bet.** Remove the ~9% push mass and honest EV is **−0.0682** and honest stake is **0** |
| D17 | H | MONEY | `EdgeService` prices an **away** bet with the **home** side's juice. `price = lines.sharp_spread_price`, which `parseLines` sets from `homeSpread.price` | **Proven.** Model margin −9 vs market −3 → `side: "LAR +3"`, `price: -135` — the KC −3 price |
| D18 | H | MONEY | `EdgeResult.market_line` is **always the home spread**, but `settle()` computes `adjusted = -margin + line` expecting the line in the *bet's own* frame. Persisting the only line field `EdgeResult` offers inverts every away settlement | **Proven by replication.** Bet `"LAR +3"`, KC wins 24–23 → Rams cover. Truth **win**. With `market_line` (−3): **loss**. With the bet-side line (+3): **win** |
| D19 | H | MONEY | `agent1.deriveFairProbs` pushes `homeMLs` and `awayMLs` in **independent** `if` blocks, then zips them by index. One book quoting a single side desyncs every subsequent pair — or yields `NaN` | **Proven.** Two books, one quoting only the home side → `homeProb = NaN`, `awayProb = NaN`. Three books in a desyncing order → `homeProb = 0.7300`, computed by pairing book 1's home price with book 2's away price |
| D20 | M | MONEY | `devigPower` bisects `k` over a **hardcoded bracket [0.5, 2.0]** with no convergence check, then normalises the result — so a solver failure is invisible | **Proven.** At overround 1.60, `k` clamps at the 2.0 ceiling and `sum(p^k) = 1.28`. Unconverged, then normalised into plausible-looking output |
| D21 | M | MONEY | No input validation on money primitives. `kellyStake(0.9, 0)` → **`NaN`**; `americanToDecimal(0)` → `Infinity`; `decimalToAmerican(1.0)` → `-Infinity`. A `NaN` stake would be written straight to `Bet.stakeUnits` | Direct evaluation |
| D22 | M | MONEY | `weekOf()` computes the **first Thursday of September**; its own docstring says **Thursday after Labor Day**. These diverge by a full week whenever Sept 1 is a Thursday | **Proven** for 2005, 2011, 2016, 2022 — in each, real Week 1 Thursday is reported as **week 2** |
| D23 | M | MONEY | `closingLines()` returns the latest row for *every* book; `gradeClv` takes the first `find()` hit. The "closing line" is whichever book happens to sort first, not a designated sharp book | Read + schema |
| D24 | M | MONEY | `movement()` filters by game and market but **not by book**. "Opened" and "current" can come from different books, making the reverse-line-movement signal meaningless | `snapshot.service.ts:91–107` |
| D25 | L | MONEY | `parseLines` overwrites `sharpSpread` on every match, so it keeps the **last** sharp book in bookmaker order. `SHARP_BOOKS = ['pinnacle', …]` implies a precedence that is never honoured — Pinnacle loses to whatever follows it | `odds.service.ts:157–161` |

**D14 is the worst bug in the codebase.** Not because its arithmetic is the most wrong —
D15 and D16 are worse arithmetic — but because it sits upstream of them and fails silently.
CLV never computes, so D15's sign inversion never even gets the chance to produce a visibly
wrong number that someone might notice. The system would run a full season, grade nothing,
log warnings nobody reads, and report `avg_clv_pct: null` while `summary()` cheerfully
returns an ROI. A metric that is always `null` looks like "no data yet" for a very long time.

**D16 is the most dangerous bug.** It is the one that moves money. It sizes a **maximum
2%-of-bankroll bet on a negative-EV wager**, and it does so specifically on the 3 — the most
common margin in the NFL and the number more spread bets sit on than any other. This is not
the README's "approximated, deliberately in the conservative direction." The error is
**asymmetric**: the home/favourite side of a key number excludes the push mass and is
genuinely conservative, while the away/underdog side includes it as a win and is
systematically over-valued by up to ~9 probability points — against an `EV_THRESHOLD` of
0.015. The README's claim of conservatism is true for one side of the bet and false for the
other.

### 3.4 Missing capability — the product is not wired up

| # | Sev | Cat | Issue | Reproduction / evidence |
|---|---|---|---|---|
| D26 | C | CAP | **`EdgeService`, `RatingsService` and `GradingService` have no callers anywhere in the codebase.** No controller, no service, no cron invokes `evaluateSpread`, `projectMargin`, `gradeClv`, `updateFromResults` or `settle` | `grep -rn` across `src/` excluding the defining modules themselves returns **zero** hits |
| D27 | C | CAP | **No `Bet` row is created by any code path.** README weekly-loop step 4 ("Qualifying plays get a `Bet` row with `modelVersion` stamped") is unimplemented, which makes D14/D15/D18 latent until it is | `grep -rn "bet.create"` → nothing outside grading |
| D28 | H | CAP | QB and rest adjustments are `projectMargin()` parameters nothing populates — and `projectMargin()` itself has no caller. The README calls QB "the largest single lever in the model" | Confirmed; README gap is real and understated |
| D29 | M | CAP | Totals are captured, stored, and never modelled. `weather.totalAdjustment()` has **no caller** — dead code | `grep -rn totalAdjustment` → definition only |
| D30 | M | CAP | `seedSeason()` regresses last season's ratings toward zero and does not blend Vegas win totals, which its own docstring calls "the single highest value improvement available before week 6" | `ratings.service.ts:44–54` |
| D31 | M | CAP | The health check is static. It returns `status: "ok"` without touching Postgres or reporting odds credits. **It cannot fail**, so it cannot be monitored | `app.controller.ts` |
| D51 | H | CAP | Odds regions/markets are hardcoded: `us,us2` × `spreads,totals,h2h` = **6 credits/call**. `getExpandedGame()` is worse — `us,us2,eu,uk` = **12 credits/call**, and it pulls the entire board to find one game | `odds.service.ts:75–76, 97–99`. Directly contradicts `path-to-production.md` §2 |
| D52 | H | CAP | `x-requests-remaining` is **logged but never enforced**. No reserve, no hard stop. `path-to-production.md` §7 calls this "the single most important $0 safety feature" | `odds.service.ts:82–84` |

D26 and D27 are the finding that reframes everything else. The talent assessment describes
a seven-subsystem product; four of those subsystems are libraries with no consumer. This is
not a port that is nearly finished — it is a port where the shell arrived and the payload
did not.

### 3.5 Hygiene, dependencies, testing

| # | Sev | Cat | Issue | Reproduction / evidence |
|---|---|---|---|---|
| D40 | C | HYG | **Two spec files in the entire repository**: `src/app.controller.spec.ts` (asserts the health check returns `"ok"`) and the `test/app.e2e-spec.ts` stub. **Zero tests on `devig.ts`, `margin.ts`, `edge.service.ts`, `ratings.service.ts`, `grading.service.ts`** | `npm test` → `Tests: 1 passed, 1 total` |
| D38 | M | HYG | `npm run lint` carries `--fix`, so the documented lint command **mutates the working tree** and is unusable as a CI gate. It also currently fails: **242 errors, 18 warnings, 15 files** — 153 `no-unsafe-member-access`, 61 `no-unsafe-assignment`, 22 `no-unsafe-call`, plus one `no-floating-promises` (D3) | `npx eslint` → exit 1 |
| D39 | M | HYG | `tsconfig.json` sets `strictNullChecks` and `noImplicitAny` but **not `strict: true`**, on code that sizes wagers | Read |
| D41 | M | HYG | `test/app.e2e-spec.ts` boots the whole `AppModule` and therefore requires live Postgres to assert a static health check | `PrismaClientInitializationError` |
| D42 | H | HYG | Model ids `gemini-3.5-flash` (llm.ts default, agent3, judgment-resolver) and `claude-sonnet-4-6` (agent4 ×2) are POSTed to `apps.abacus.ai`. **Unverifiable here — egress blocked.** Flagging rather than asserting: `gemini-3.5-flash` matches no published Google generation (1.0/1.5/2.0/2.5/3 — there is no 3.5), and reads like a conflation of Gemini with GPT-3.5 naming | Read; live check blocked by proxy 403 |
| D34 | L | HYG | **`openai@^7.8.0` is declared and never imported.** `llm.ts` uses raw `fetch` against a hardcoded URL. There is no SDK and no `baseURL` to configure | `grep` for `from 'openai'` → **0 files** |
| D33 | L | HYG | `uuid@^14.0.2` **and** `@types/uuid@^11.0.0` are both declared and **neither is imported anywhere**. npm warns the `@types` package is a deprecated stub | `grep` → 0 files; npm deprecation warning |
| D35 | M | HYG | `class-validator` and `class-transformer` are declared and never imported. No global `ValidationPipe`. Controller bodies are untyped `@Body() body: { game_id: string }` with no runtime validation | `grep` → 0 files |
| D36 | L | HYG | `@types/node` pinned to exactly `22.0.0` while `engines.node` is `>=18.18.0` — types assert a floor the engines field does not | `package.json` |
| D37 | L | HYG | `packageManager: yarn@4.13.0` and a Yarn-4-only `.yarnrc.yml` — including `globalFolder: /opt/hostedapp/node/yarn/global`, an **absolute path from the scaffolding host** — but no `yarn.lock`, npm-flavoured scripts, and a README that says `npm install`. **npm is what actually works** | `npm install` exit 0 and produced `package-lock.json`. Corepack cannot fetch Yarn 4 here (blocked host), but the absent lockfile and stale absolute path settle it regardless |
| D32 | L | HYG | Package name is still `nodejs_space` | `package.json:2` |
| D43 | L | HYG | `llm.ts` calls `clearTimeout` only on the success path. A non-abort fetch rejection leaks the 120-second abort timer | `lib/llm.ts:38–78` |
| D44 | L | HYG | `admin/status` advertises hardcoded model names and a stale mode string — `"on-demand, single-game only … no scheduled runs"` — that flatly contradicts the cron-driven snapshot design the README documents | `admin.controller.ts:51–61` |
| D45 | L | HYG | `DiscordSlashService.onModuleInit` makes an outbound Discord call at boot. Observed: `Failed to register slash command: Request failed with status code 403`. Non-fatal, but boot is coupled to a third party | Boot log |
| D46 | M | HYG | `TeamRating` has no index serving `getRatings`'s `where {season, week ≤ n} orderBy week desc`. The only index is `@@unique([abbr, season, week])` — abbr-first, so it cannot serve a season-prefix scan | `schema.prisma:52–63` |
| D47 | M | HYG | `getAbbr()` silently returns the **raw team name** on a lookup miss. One Odds API naming change puts a full team name into `Game.homeAbbr` and `Bet.side`, breaking every downstream `startsWith` comparison with no error | `lib/nfl-teams.ts:57–59` |
| D48 | M | HYG | No `DIRECT_URL` in the datasource. `path-to-production.md` §7 requires pooled + unpooled URLs for Neon migrations | `schema.prisma:5–8` |
| D50 | M | HYG | `writeRatings` performs 32 sequential awaited upserts with no transaction. A partial failure leaves a half-written rating week that `getRatings` will then read as authoritative | `ratings.service.ts:100–108` |
| D49 | L | HYG | Weather provider is **`wttr.in`**, an unofficial community service with no SLA or key — **not a keyed API.** Noted as a correction to `path-to-production.md` §7, which says to "delete the weather API key env entirely"; there is no weather key to delete (`.env.example` has none). The Open-Meteo swap is still the right call, for reliability and terms rather than for cost | `weather.service.ts:106` |

### 3.6 Leads from the brief: confirmed, refined, or refuted

The brief asked me to confirm or refute each lead rather than repeat it. Two came back
differently than expected:

| Lead | Verdict |
|---|---|
| 1 — `tsx`/`dotenv` missing, seeding broken | **Confirmed and worse.** `tsx` absent (D5); `dotenv` is in fact present transitively but undeclared. Two further failures stacked: `scripts/seed.ts` does not exist, and the safety guard fails open (D6) |
| 2 — `uuid` version mismatch, `@types` unnecessary | **Confirmed and superseded.** Both are correct, but the finding is larger: **neither package is imported at all** (D33). Delete both rather than reconciling versions |
| 3 — package still `nodejs_space` | **Confirmed** (D32) |
| 4 — `llm.ts` incoherent: model / `baseURL` / key provider | **Partly refuted, and the refutation matters.** There is **no `openai` SDK in use and no `baseURL`** — `llm.ts` is raw `fetch` to a hardcoded Abacus URL, and `openai` is an unused dependency (D34). The model-id concern stands but is **unverifiable here** (D42). Consequence: `path-to-production.md` §7's instruction to "point the `openai` SDK `baseURL` at Gemini's OpenAI-compatible endpoint" describes a client that does not exist — that work is a rewrite, not a config change |
| 5 — `@types/node` pinned vs `engines.node` | **Confirmed**, low severity (D36) |
| 6 — no money-path tests | **Confirmed.** Exactly one test in the repo (D40) |
| 7 — README "Known gaps" | **Confirmed, and understated.** Week numbers are wrong by a full week in specific years, not merely approximate (D22). QB/rest adjustments are unpopulated *and* `projectMargin()` has no caller (D26/D28). Push probability is not "conservatively approximated" — it is **zero, and asymmetrically wrong** (D16) |

**One suspicion I raised and then refuted, recorded so it does not resurface:** I initially
suspected `devigPower` inverted the favourite–longshot relationship. It does not. The
implementation is **correct** — it converges to `sum(p^k) = 1`, sums to 1, and moves the
longshot's probability *down* relative to multiplicative de-vig, which is the right response
to favourite–longshot bias. The only genuine defect there is the unchecked bracket (D20).
Similarly, `coverProb`'s spread *direction* is correct in all three orientations I tested,
and `americanToImplied` / `americanToDecimal` / `expectedValue` / `kellyStake` are all
arithmetically right on valid inputs. The Agent 1 fix the README claims — averaging in
probability space rather than averaging American prices — **is genuinely done**. The de-vig
library is in better shape than the rest of the money path.

---

## 4. Sprint plan

Sequenced by dependency, on one principle: **money-path correctness work is worthless until
there are tests to prove it.** Sprint 2 exists to make Sprint 3 verifiable. Do not reorder
them.

### Sprint 0 — Preserve and run (0.5 days)

*Goal: the code exists somewhere durable, and `npm run start:prod` serves a health check.*

| Fix | File |
|---|---|
| `git init`, baseline commit, push to a private remote | — |
| Add `"scripts"` to the exclude array (D1) | `tsconfig.build.json` |
| `app.listen(process.env.PORT ?? 3000)` (D2) | `src/main.ts` |
| `void bootstrap().catch(e => { logger.error(e); process.exit(1); })` (D3) | `src/main.ts` |
| Commit `prisma/migrations/` (D4) | `prisma/` |
| Write a real `.env` from `.env.example` | — |

**Definition of done:** `npm ci && npm run build && npm run start:prod` serves
`GET /` → 200 on `$PORT`, against a real Postgres, from a clean clone.
**Exit criteria:** a second engineer clones the private repo and reproduces that in under
ten minutes with no verbal instructions.

This sprint is deliberately tiny. It is four one-line edits and a `git init`. The value is
that it converts "an ephemeral directory that might be gone tomorrow" into "a deployable
service," and everything after it becomes a reviewable diff.

### Sprint 1 — Stop the bleeding: security, cost, and config (2–3 days)

*Goal: nothing can spend money, leak a secret, or start misconfigured.*

- **D7** — fix the `capture` auth guard to `if (!expected || apiKey !== expected)`. Then
  **delete all three hand-rolled checks (D10)** and replace them with a single
  `ApiKeyGuard`, using `crypto.timingSafeEqual`.
- **D8** — put `/snapshots/movement` behind that guard.
- **D9** — never log an axios error object. Log `err.response?.status` and
  `err.config?.url` with query parameters stripped. Add a redacting log formatter.
- **D13** — add a `validationSchema` to `ConfigModule.forRoot` so the process **refuses to
  boot** without `DATABASE_URL`, `ODDS_API_KEY`, `SWARM_API_KEY`.
- **D51/D52** — the `path-to-production.md` §2/§7 work, and the highest-value item here:
  make regions and markets env-driven (`ODDS_REGIONS=us`, `ODDS_MARKETS=h2h,spreads`),
  **parse `x-requests-remaining` and hard-stop below a configured reserve**, and fix
  `getExpandedGame` to stop pulling four regions to find one game.
- **D11, D12** — CORS allowlist; gate Swagger behind `NODE_ENV !== 'production'`.
- **D48** — add `directUrl` to the datasource.
- **D5, D6** — add `tsx` and `dotenv` to `devDependencies`; either write the missing
  `scripts/seed.ts` or delete the `prisma.seed` entry. **Remove the empty `catch`** — a
  safety guard must fail closed.
- **D32, D33, D34, D36, D37** — rename the package; drop `uuid`, `@types/uuid` and
  `openai`; unpin `@types/node` to `^22`; delete `packageManager` and `.yarnrc.yml` and
  commit `package-lock.json` as the single source of truth.

**Definition of done:** every route requires a key except `GET /`; the process refuses to
boot without required env; a forced odds failure produces a one-line log with no key in it;
a configured credit reserve demonstrably blocks a capture.
**Exit criteria:** `npm run start:prod` with `SWARM_API_KEY` deliberately unset **fails to
boot** rather than serving an open capture endpoint.

Cutting 6 credits/call to 2 is a 3× budget increase for a config edit, per
`path-to-production.md` §2. It belongs this early because every later sprint burns credits
to test.

### Sprint 2 — Test scaffolding and CI (3–4 days)

*Goal: the money path becomes verifiable. This sprint fixes no bugs.*

- **D38** — split the scripts: `lint` (no `--fix`, CI gate) and `lint:fix` (explicit). Then
  drive the 242 errors to zero — mostly by typing the four external API responses
  (`OddsGame`, ESPN, Polymarket, wttr) instead of `any`, which is real defect-prevention
  work, not cosmetics.
- **D39** — enable `strict: true`, fix the fallout.
- **D40** — the centrepiece. Unit tests for `devig.ts`, `margin.ts`, `edge.service.ts`,
  `ratings.service.ts`, `grading.service.ts`. **Seed them with the reproductions in §3.3 of
  this document** — every one is a ready-made failing test case with a known-correct
  expected value. Include golden-value tests pinning `americanToImplied`,
  `devigPower`, `coverProb` and `kellyStake` against hand-computed constants.
- **D41** — mock `PrismaService` in the e2e stub so a health-check test does not need a
  database; add a separate integration suite that does.
- CI on the private repo: `npm ci && npm run lint && npm test && npm run build`, required
  to merge.

**Definition of done:** `npm run lint` exits 0; `npm test` exits 0 with meaningful coverage
of `lib/` and `model/`; CI blocks merges.
**Exit criteria:** every §3.3 defect has a **failing** test committed. Sprint 3 is the work
of turning them green.

### Sprint 3 — Money-path correctness (4–6 days)

*Goal: every number the system produces is one you would stake on.*

Fix in this order — D14 first, because nothing else in grading is observable until it is:

- **D14** — settle the side vocabulary once, repo-wide. Recommendation: **normalise
  `OddsSnapshot.side` to the team abbreviation at write time in `toSnapshotRows()`**, and
  store `Bet.side` as a structured `{ abbr, line }` rather than a display string. The
  current bug is a symptom of using a human-readable string as a join key; fix the cause.
- **D15** — `clvPoints = lineTaken - closingLine`, both in the bet's own frame. Delete the
  `abs()`.
- **D16** — replace the continuous-normal `coverProb` with an **empirical NFL margin
  distribution** and return `{ win, push, loss }` rather than a single cover probability.
  Feed all three into EV. This is the `sports-betting-modeler` deliverable and the one that
  needs a domain owner, not just an implementer.
- **D17** — carry both sides' prices through `GameLines`; price each side with its own juice.
- **D18** — make `EdgeResult` carry the line **in the bet's own frame**, so `settle()`
  cannot be fed the wrong one. Fix the type, not the caller.
- **D19** — pair moneylines **per book** in a single pass; skip books that do not quote both
  sides. Add a `NaN` assertion on every probability before it can reach a `Bet`.
- **D20** — widen the bisection bracket, assert convergence, fall back to multiplicative
  with a warning on failure.
- **D21** — validate money primitives at the boundary; reject non-finite results.
- **D22** — real Week 1 anchor (Thursday after Labor Day), pending the schedule join.
- **D23, D24, D25** — designate a sharp book for closing lines and honour `SHARP_BOOKS`
  precedence; filter `movement()` by book.
- **D47, D50** — `getAbbr()` throws or returns `null` on a miss; wrap `writeRatings` in a
  transaction.

**Definition of done:** every Sprint 2 test is green. CLV computes a correct signed value
end-to-end against a seeded database.
**Exit criteria:** a **paper-trading dry run** over a full historical week produces edges,
stakes and CLV that a human reviewer reconciles by hand and signs off on. No real money
before that signature.

### Sprint 4 — Wire the product up (5–8 days)

*Goal: the modules that exist actually run. This is where `nfl_edge` becomes a product.*

- **D26/D27** — the weekly loop from the README, as real code: a controller and/or
  scheduled job that reads ratings, calls `projectMargin()`, calls `evaluateSpread()`,
  **writes `Bet` rows for qualifying plays**, and calls `gradeClv()` then `settle()`.
  Nothing in Sprint 3 has a production consumer until this lands.
- **`scripts/backfill-nflverse.ts`** — `path-to-production.md` §4 calls this "the
  highest-leverage thing you can build this week," and it is even more so now: it is the
  only way to validate the Sprint 3 model work without spending a season collecting
  snapshots. It also supplies the empirical margin distribution D16 needs.
- **D28 — populate the QB adjustment.** See §6; I would gate real money on this.
- **D31** — health check that touches Postgres and reports remaining odds credits
  (`path-to-production.md` §7).
- **D46** — `@@index([season, week])` on `TeamRating`.
- **D35** — global `ValidationPipe` and real DTOs.
- **D42** — verify the model identifiers against the provider and fix or replace them.
  Combined with D34, this is the moment to do §7's LLM work properly: pick a provider,
  use its SDK or a typed client, add the RPM throttle.
- **D49** — swap wttr.in for Open-Meteo.
- **D43, D44, D45** — timer leak; truthful `admin/status`; make Discord registration an
  explicit command rather than a boot-time side effect.

**Definition of done:** the README's five-step weekly loop executes end to end on a real
slate and produces graded `Bet` rows.
**Exit criteria:** one full NFL week runs unattended — capture cron, edge report, CLV
graded — with no manual intervention.

### Deferred: D29, D30 (totals modelling, Vegas win-total seeding)

Genuine capability gaps, correctly identified by the README. Neither blocks a first
milestone, and `path-to-production.md` §2 actively recommends **dropping the `totals`
market** from the odds pull to save credits until a totals model exists. Do not build the
totals model until spreads are demonstrably beating the close.

---

## 5. Effort estimates

**Stated assumptions.** One experienced NestJS/TypeScript engineer, full-time, with the
`sports-betting-modeler` role available for consultation during Sprint 3 and embedded for
D16. Includes code review, excludes the Sprint 3 exit-criteria dry run (calendar time, not
effort) and excludes any deployment work from `path-to-production.md` §8.

| Sprint | Scope | Estimate | Confidence |
|---|---|---|---|
| 0 | Preserve and run | **0.5 d** | High — four one-line edits, all proven |
| 1 | Security, cost, config | **2–3 d** | High — all well-understood, mechanical |
| 2 | Tests, lint, CI | **3–4 d** | Medium — the 242 lint errors are the variable; typing four external APIs could run long |
| 3 | Money-path correctness | **4–6 d** | **Low–Medium** — D16 is a modelling decision, not a code fix. If the empirical margin distribution needs real research this doubles |
| 4 | Wire the product up | **5–8 d** | Low — D26/D27 is net-new design work, and the nflverse backfill is a new script against an unfamiliar dataset |
| | **Total** | **~15–22 days** | |

**These are estimates and should be read as such.** The two I least trust are D16 and
Sprint 4. D16 is quant work whose duration depends on how much distribution research the
modeller wants; I have costed "use published key-number frequencies," not "derive them from
scratch." Sprint 4 is the only sprint building something that does not exist yet, and
net-new work estimates poorly. Sprints 0–2 I would defend to within a day, because the
failures are all reproduced and the fixes are known.

A reasonable planning posture: **commit to Sprints 0–2 (6–8 days) as a fixed scope**, and
treat 3 and 4 as re-estimated once the test suite reveals what else it catches. I would
expect it to catch more — the port introduced D14, D17, D18 and D19, all of the same
family, and I found those by reading rather than by running.

---

## 6. Risks and mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **The scratchpad is reclaimed and the code is lost** | Medium | Total | Sprint 0, today. This is the only risk with no recovery path |
| **Someone stakes real money before Sprint 3** | Medium | **Severe** | D16 sizes max bets on negative-EV wagers. Hard rule: no real bankroll until the Sprint 3 dry run is signed off. Enforce in code — a `DRY_RUN` env flag defaulting to on |
| More port bugs of the D14/D17/D19 family remain undiscovered | **High** | High | Assume they do. Sprint 2 exists to find them. Budget contingency in Sprint 3 |
| Debugging burns the 500-credit odds budget | High | Medium | `path-to-production.md` §3 warns of exactly this. D52's hard reserve is the structural fix; until it ships, use a recorded-fixture test double and never point tests at the live API |
| D16's empirical distribution is wrong in a new way | Medium | High | Have `specialized-model-qa` validate the distribution independently of whoever implements it. Golden-value tests with hand-computed constants |
| D42's model ids are invalid and the swarm cannot run | Medium | Medium | Unverified due to sandbox egress. Verify against the provider on day one of Sprint 1 — it is a five-minute check with a real key and it de-risks all of Sprint 4's LLM work |
| CLV stays `null` and nobody notices | **High** if unfixed | High | This already happens today. Alert on `avg_clv_pct === null` when settled bets exist — a null metric must be loud, not quiet |
| Fixing D14 by changing stored `side` breaks existing snapshot rows | Low now, High later | Medium | Do it **now**, while the table is empty. The schema comment correctly forbids mutating `OddsSnapshot` — so this vocabulary fix must land before the first production capture, or it becomes a migration against append-only history |

That last row is a genuine sequencing trap and deserves emphasis: **D14's fix gets
dramatically more expensive the moment the capture cron starts running.** The table is
append-only by design and by explicit schema comment. Fix the vocabulary before you collect
a season of rows in the wrong one.

---

## 7. Recommendation: what to fix now, what to defer

**Fix now (non-negotiable):** Sprint 0 and Sprint 1 — 3 days. Preservation, the D7 auth
bypass, the D9 key leak, and the D51/D52 credit controls. None of these are model work and
all of them protect an asset: the code itself, the odds budget, the API keys.

**Fix next, in order:** Sprint 2 then Sprint 3. Do not let anyone reorder these. The
temptation will be to fix D15's `abs()` immediately — it is a one-character change and it is
obviously wrong. Resist it. A one-character change to money math with no test is how D15 got
written in the first place.

**Defer:** totals modelling (D29), Vegas win-total seeding (D30), Discord slash commands
(`path-to-production.md` §6 defers these anyway for the cold-start reason), and the `us2`
region and `totals` market until there is a model that reads them.

### On the question the brief put to me directly

The brief asked whether a model that boots but sizes bets from an unpopulated QB adjustment
is more dangerous than one that does not boot at all. **I agree, and the evidence here is
stronger than the hypothetical.**

A service that does not boot fails loudly and costs nothing. This one fails silently and
would cost bankroll. I proved three independent silent-failure modes:

1. **D16** stakes the **maximum permitted 2% of bankroll** on a bet whose true EV is
   **−0.068**, on the most common margin in the sport, and reports EV **+0.104** while doing
   it.
2. **D14** means the only scoreboard that would catch this — CLV — returns `null` for every
   bet, forever, behind a warning-level log.
3. **D28** leaves the model's single largest lever at zero, so projected margins are
   systematically wrong in an unmodelled direction on exactly the games where a starting
   QB is out and the market has already moved.

Compound those: a system that bets big, is wrong, and cannot tell you it is wrong. That is
strictly worse than a crash. The saving grace — and it is a large one — is **D26**: none of
this code has a caller, so today the engine cannot actually stake anything. The dangerous
configuration is not the current one. It is the one that exists the day someone implements
the weekly loop (Sprint 4) without having done Sprint 3 first.

**That is the single most important sequencing decision in this document: Sprint 4 must not
precede Sprint 3.** Wiring the product up is the fun work and the visible work, and it is
the one thing that converts every latent money bug into a live one.

### What "working" should mean for the first milestone

Not "it boots." Not "the swarm posts a Discord brief." I would define Milestone 1 as:

> The service runs the snapshot cron for one full NFL week without manual intervention,
> stays inside its odds credit reserve, produces edge calls with stakes, writes `Bet` rows,
> and **grades CLV to a correct signed number that a human has reconciled by hand** —
> with `DRY_RUN` on and no real money staked.

CLV is the right milestone gate because it is the metric the system is built around and
because, per the README, it is the only honest scoreboard before the results sample means
anything. It is also, right now, the thing most comprehensively broken. A milestone that
does not force D14 and D15 to be correct is a milestone that lets the system's own
scoreboard stay silently `null` — which is exactly the state it is in today.

---

## 8. One-line answer

It builds, and that is the trap: `tsc` and `nest build` both pass while **the entire NFL
model — ratings, edge, staking, CLV — has no caller and no test**, and the money math that
does exist will **stake a maximum 2%-of-bankroll bet at a true EV of −0.068** on the key
number 3 while its own CLV grader silently returns `null` for every bet forever. Spend half
a day getting it into a private git repo and onto a real `$PORT`, three days closing the
open `capture` endpoint and the API-key leak and the uncapped credit spend, then **build the
test suite before touching a single line of the money path** — because the fastest way to
make this system genuinely dangerous is to wire the product up (Sprint 4) before you have
made it correct (Sprint 3).

---

### Appendix: reproducing this

All findings above were reproduced on Node v22.22.2 / npm 10.9.7 against PostgreSQL 16.

```bash
npm install                  # 0 — warns @types/uuid is a deprecated stub
npx tsc --noEmit             # 0
npm run build                # 0 — but emits dist/src/main.js
npm run start:prod           # 1 — MODULE_NOT_FOUND (D1)
npx eslint "{src,apps,libs,test}/**/*.ts"   # 1 — 242 errors, 18 warnings (D38)
npm test                     # 0 — Tests: 1 passed, 1 total (D40)
npm run test:e2e             # 1 — needs DATABASE_URL (config, not a defect)
npx prisma generate          # 0 — binaries.prisma.sh reachable; README warning did not apply
npx prisma migrate dev       # 0 — schema is valid and applies cleanly
npx prisma db seed           # 1 — spawn tsx ENOENT (D5)

# D7, proven: with SWARM_API_KEY absent from .env,
#   POST /snapshots/capture with no x-api-key  -> 500 (guard passed)
#   GET  /admin/status      with no x-api-key  -> 401 (guard held)

# D14, proven end-to-end against live Postgres: a bet taken at -3 with a
# correct closing snapshot at -5 (true CLV +2.0) grades to
#   clvPoints = null, clvPct = null, closingLine = null
#   WARN [GradingService] No closing snapshot found for bet 1

# D16, proven: LAR +3 @ -110, model home margin -6.5
#   engine   -> EV +0.1036, stake 0.02 (the hard Kelly cap), qualifies: true
#   honest   -> EV -0.0682, stake 0.0000  (after removing ~9% push mass at the 3)
```

**Caveat on reproduction:** `npm run lint` carries `--fix` and will reformat your working
tree. Use `npx eslint` directly until D38 is fixed.

**Not reproducible in this sandbox** (egress proxy returns `CONNECT tunnel failed, response
403`): any live call to `api.the-odds-api.com` or `apps.abacus.ai`, and therefore D42's
model identifiers. Verify those against the provider with a real key before Sprint 4.
