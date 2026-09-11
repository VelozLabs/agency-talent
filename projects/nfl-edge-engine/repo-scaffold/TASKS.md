# NFL Edge — Task Board

**This file is the source of truth for project state.** It is plain Markdown on purpose:
it must survive a change of AI tool, editor, or human. No task state lives in any tool's
internal todo list, database, or chat history. If it isn't written here, it didn't happen.

- **Full diagnosis and rationale:** `docs/remediation-sprint-plan.md` (52 verified issues, IDs `D1`–`D52`)
- **Deployment and cost constraints:** `docs/path-to-production.md`
- **Who owns what:** `docs/talent-assessment.md` and `talents/`
- **How to work this board:** `AGENTS.md`

## Status

| | |
|---|---|
| **Current sprint** | Sprint 0 — Preserve and run |
| **Open issues** | 52 (9 critical, 11 high, 21 medium, 11 low) |
| **Closed** | 0 |
| **Build** | `tsc --noEmit` and `nest build` exit 0 |
| **Tests** | 1 test in the entire repo. `lint` fails: 242 errors, 18 warnings |
| **Safe to run with real money?** | **No.** See the two blocking gates below |

### Two gates that override everything

1. **Do not reorder Sprint 2 before Sprint 3.** Money-path fixes are unverifiable without
   tests. A one-character change to money math with no test is exactly how `D15` was written.
2. **Do not complete Sprint 4 before Sprint 3.** Right now nothing can stake anything,
   because `EdgeService`/`RatingsService`/`GradingService` have no callers (`D26`). Wiring
   the product up while the math is still wrong is the single most dangerous sequence
   available. Today's broken state is safer than a half-fixed one.

---

## Sprint 0 — Preserve and run (~0.5d)

*Goal: the code lives somewhere durable and `npm run start:prod` serves a health check.*

- [x] `git init`, baseline commit of the known-broken state
- [ ] Push to the private remote
- [ ] **D1** (C) `nest build` emits `dist/src/main.js` but `start:prod` runs `node dist/main` → add `"scripts"` to the exclude array in `tsconfig.build.json`
- [ ] **D2** (C) `main.ts:47` hardcodes port 3000 → `app.listen(process.env.PORT ?? 3000)`
- [ ] **D3** (H) `bootstrap()` is a floating promise → `void bootstrap().catch(e => { logger.error(e); process.exit(1); })`
- [ ] **D4** (H) commit `prisma/migrations/` (generated during diagnosis; applies cleanly to Postgres 16)
- [ ] Write a real `.env` from `.env.example`

**Done when:** `npm ci && npm run build && npm run start:prod` serves `GET /` → 200 on `$PORT` against a real Postgres, from a clean clone.
**Exit:** a second engineer clones and reproduces it in under ten minutes with no verbal instructions.

---

## Sprint 1 — Security, cost, config (~2–3d)

*Goal: nothing can spend money, leak a secret, or start misconfigured.*

- [ ] **D7** (C) `POST /snapshots/capture` is **unauthenticated when `SWARM_API_KEY` is unset** (`undefined !== undefined` is false) → `if (!expected || apiKey !== expected)`
- [ ] **D10** (M) delete all three hand-rolled key checks; replace with one `ApiKeyGuard` using `crypto.timingSafeEqual`
- [ ] **D8** (H) `GET /snapshots/movement` has no auth at all and serves the proprietary line-movement history → put behind the guard
- [ ] **D9** (H) a failed odds pull dumps the axios error object — **`ODDS_API_KEY` appears 28 times in 68 KB of log** → log `err.response?.status` and a query-stripped URL; add a redacting formatter
- [ ] **D13** (M) no `validationSchema` on `ConfigModule.forRoot` → refuse to boot without `DATABASE_URL`, `ODDS_API_KEY`, `SWARM_API_KEY`
- [ ] **D51** (H) odds regions/markets hardcoded at 6 credits/call (`getExpandedGame` is 12) → env-driven `ODDS_REGIONS=us`, `ODDS_MARKETS=h2h,spreads`; stop pulling the whole board for one game
- [ ] **D52** (H) `x-requests-remaining` is logged but never enforced → parse it and hard-stop below a configured reserve
- [ ] **D11** (M) `enableCors()` with no allowlist
- [ ] **D12** (L) Swagger mounted unconditionally in production
- [ ] **D48** (M) add `directUrl` to the Prisma datasource (Neon pooled + unpooled)
- [ ] **D5** (M) `tsx` missing from `devDependencies`; `dotenv` present transitively but undeclared
- [ ] **D6** (M) `safe-seed.ts` guards `scripts/seed.ts` which **does not exist**, inside a `try` with an **empty `catch`** — the delete-protection check fails open. Make it fail closed
- [ ] **D32** (L) package still named `nodejs_space`
- [ ] **D33** (L) drop `uuid` and `@types/uuid` — neither is imported anywhere
- [ ] **D34** (L) drop `openai` — declared, never imported; `llm.ts` uses raw `fetch`
- [ ] **D36** (L) unpin `@types/node` to `^22`
- [ ] **D37** (L) delete `packageManager` + `.yarnrc.yml` (carries a scaffolding host's absolute path); commit `package-lock.json` as the single lockfile

**Done when:** every route requires a key except `GET /`; the process refuses to boot without required env; a forced odds failure logs one line with no key in it; a credit reserve demonstrably blocks a capture.
**Exit:** `npm run start:prod` with `SWARM_API_KEY` deliberately unset **fails to boot** rather than serving an open capture endpoint.

> Cutting 6 credits/call to 2 is a 3x budget increase for a config edit. It belongs early because every later sprint burns credits to test.

---

## Sprint 2 — Tests and CI (~3–4d)

*Goal: the money path becomes verifiable. **This sprint fixes no bugs.***

- [ ] **D38** (M) split `lint` (no `--fix`, CI gate) from `lint:fix`; drive 242 errors to zero by typing the four external API responses instead of `any`
- [ ] **D39** (M) enable `strict: true` and fix the fallout
- [ ] **D40** (C) **the centrepiece** — unit tests for `devig.ts`, `margin.ts`, `edge.service.ts`, `ratings.service.ts`, `grading.service.ts`. Seed them from §3.3 of the sprint plan: every reproduction there is a ready-made failing test with a known-correct expected value
- [ ] **D41** (M) mock `PrismaService` in the e2e stub; add a separate integration suite that uses a real database
- [ ] CI: `npm ci && npm run lint && npm test && npm run build`, required to merge

**Done when:** `npm run lint` exits 0; `npm test` exits 0 with meaningful coverage of `lib/` and `model/`; CI blocks merges.
**Exit:** every §3.3 defect has a **failing** test committed. Sprint 3 is the work of turning them green.

---

## Sprint 3 — Money-path correctness (~4–6d)

*Goal: every number the system produces is one you would stake on.* Fix **D14 first** — nothing else in grading is observable until it is.

- [ ] **D14** (C) **`gradeClv()` can never match a closing line.** Snapshots store `side` as `"Kansas City Chiefs"`, bets as `"KC -3"`. 100% silent failure on the north-star metric. Normalise `OddsSnapshot.side` to the abbreviation at write time in `toSnapshotRows()`; store `Bet.side` as structured `{ abbr, line }`, not a display string. Fix the cause, not the predicate
- [ ] **D15** (C) `clvPoints = Math.abs(a) - Math.abs(b)` inverts the sign for every favourite and zeroes any line crossing zero (3 of 4 cases wrong) → `lineTaken - closingLine` in the bet's own frame
- [ ] **D16** (C) **`coverProb()` assigns zero push mass** and credits it to the away side as a win. On `LAR +3 @ -110` it stakes the **hard Kelly cap on a -EV bet** (reported EV +0.1036; honest EV -0.0682). Replace with an empirical NFL margin distribution returning `{ win, push, loss }`. **This one needs `sports-betting-modeler`, not just an implementer**
- [ ] **D17** (H) away bets are priced with the **home** side's juice
- [ ] **D18** (H) `EdgeResult.market_line` is always the home spread, but `settle()` expects the bet's own frame → inverts every away settlement. Fix the type, not the caller
- [ ] **D19** (H) `deriveFairProbs` pushes home/away moneylines in independent `if` blocks then zips by index → desync or `NaN`. Pair per book in one pass; assert no `NaN` reaches a `Bet`
- [ ] **D20** (M) `devigPower` bisects over a hardcoded `[0.5, 2.0]` bracket with no convergence check, then normalises — solver failure is invisible
- [ ] **D21** (M) no validation on money primitives: `kellyStake(0.9, 0)` → `NaN`, which would be written straight to `Bet.stakeUnits`
- [ ] **D22** (M) `weekOf()` computes first Thursday of September; docstring says Thursday after Labor Day. Off by a full week in 2005/2011/2016/2022
- [ ] **D23** (M) "closing line" is whichever book sorts first, not a designated sharp book
- [ ] **D24** (M) `movement()` doesn't filter by book — "opened" and "current" can come from different books, making the RLM signal meaningless
- [ ] **D25** (L) `parseLines` keeps the **last** sharp book, so `SHARP_BOOKS` precedence is never honoured — Pinnacle loses to whatever follows it
- [ ] **D47** (M) `getAbbr()` silently returns the raw team name on a miss, poisoning every downstream comparison → throw or return `null`
- [ ] **D50** (M) `writeRatings` does 32 sequential upserts with no transaction → wrap it

**Done when:** every Sprint 2 test is green; CLV computes a correct signed value end-to-end against a seeded database.
**Exit:** a **paper-trading dry run** over a full historical week produces edges, stakes and CLV that a human reconciles by hand and signs off on. **No real money before that signature.**

---

## Sprint 4 — Wire the product up (~5–8d)

*Goal: the modules that exist actually run.* **Do not start before Sprint 3 is green.**

- [ ] **D26** (C) `EdgeService`, `RatingsService`, `GradingService` have **no callers anywhere**
- [ ] **D27** (C) **no `Bet` row is created by any code path** — README weekly-loop step 4 is unimplemented. Build the loop as real code: read ratings → `projectMargin()` → `evaluateSpread()` → write `Bet` rows for qualifying plays → `gradeClv()` → `settle()`
- [ ] `scripts/backfill-nflverse.ts` — the only way to validate Sprint 3 without spending a season collecting snapshots, and it supplies the empirical margin distribution **D16** needs
- [ ] **D28** (H) populate the QB adjustment — "the largest single lever in the model". **Gate real money on this**
- [ ] **D31** (M) health check is static and cannot fail → touch Postgres, report remaining odds credits
- [ ] **D46** (M) add `@@index([season, week])` to `TeamRating`
- [ ] **D35** (M) global `ValidationPipe` and real DTOs
- [ ] **D42** (H) verify model ids `gemini-3.5-flash` and `claude-sonnet-4-6` against the provider (unverified — egress blocked during diagnosis; `gemini-3.5-flash` matches no published Google generation). With D34, do the LLM work properly: pick a provider, use a typed client, add an RPM throttle
- [ ] **D49** (L) swap `wttr.in` for Open-Meteo — reliability and terms, not cost
- [ ] **D43** (L) `llm.ts` leaks the 120s abort timer on non-abort rejections
- [ ] **D44** (L) `admin/status` advertises a stale mode string contradicting the cron design
- [ ] **D45** (L) Discord slash registration is a boot-time side effect that 403s → make it an explicit command

**Done when:** the README's five-step weekly loop executes end to end on a real slate and produces graded `Bet` rows.
**Exit:** one full NFL week runs unattended — capture cron, edge report, CLV graded — with no manual intervention.

---

## Deferred (deliberately)

- **D29** (M) totals captured and stored but never modelled; `weather.totalAdjustment()` is dead code
- **D30** (M) `seedSeason()` doesn't blend Vegas win totals — its own docstring calls this "the single highest value improvement available before week 6"

Neither blocks a first milestone, and `docs/path-to-production.md` §2 recommends **dropping the `totals` market** from the odds pull to save credits until a totals model exists. **Do not build the totals model until spreads are demonstrably beating the close.**

---

## Decision log

Append-only. Record anything a future session would otherwise have to re-derive.

| Date | Decision | Why |
|---|---|---|
| 2026-09-11 | Private repo, not public | The repo contains the edge. Scheduled GitHub Actions don't fire on free private repos, which is fine — Actions was already ruled out as the cron |
| 2026-09-11 | npm is the package manager; Yarn 4 declaration is vestigial | No `yarn.lock`, npm-flavoured scripts, and `.yarnrc.yml` carries a scaffolding host's absolute path |
| 2026-09-11 | Sprint 2 (tests) precedes Sprint 3 (money fixes), and Sprint 4 (wiring) comes last | Money-path fixes are unverifiable without tests; wiring an unfixed model up is more dangerous than the current broken state |
| 2026-09-11 | `devigPower` is **correct** — do not "fix" it | Suspected of inverting favourite–longshot bias; verified it converges to `sum(p^k)=1` and moves longshots down correctly. Only its unchecked bracket (D20) is a defect |
| 2026-09-11 | Agent 1's probability-space averaging is genuinely done | The README's claimed fix is real; don't re-litigate it |

## Session log

Append one line per working session so the next tool knows where the last one stopped.

| Date | Who | What changed | Next |
|---|---|---|---|
| 2026-09-11 | Claude (Opus) | Diagnosed 52 issues; created this repo; assembled docs, talents and task board | Push to remote, then Sprint 0 |
