# NFL Edge Engine — Talent Assessment

**Question answered:** Which talents from this catalog are needed to build, run, and
maintain the NFL Edge Engine?

**Source project:** `nfl_edge` — a NestJS/TypeScript service (ported from CFB Slate
Swarm) that snapshots the NFL odds board, maintains power ratings, computes edge
against the market, and grades closing line value (CLV).

> **Provenance.** The working copy of this document lives in the private
> `VelozLabs/NFL-EDGE` repo at `docs/talent-assessment.md`, alongside the code it
> describes; paths such as `docs/…` and `talents/…` below refer to that tree. This
> copy is synced from it. Section 1 was corrected on 2026-09-11: it previously
> called the four-agent swarm "a genuine multi-agent LLM system", which a live
> dry run disproved — see Sprint 5.

---

## 1. What the project actually is

Reading the code and README, NFL Edge decomposes into seven working parts. Each is a
distinct skill demand, which is what the talent mapping keys off of.

| Subsystem | Modules | What it demands |
|---|---|---|
| **Service shell** | `app.module.ts`, `main.ts`, NestJS + Swagger, health check | Backend architecture, dependency injection, config |
| **Data ingestion** | `odds/`, `espn/`, `weather/`, `polymarket/` | Resilient third-party API integration, tokenizers, de-vig math |
| **Persistence** | `prisma/schema.prisma` (append-only `OddsSnapshot`, `Game`, ratings, `Bet`) | Schema design, indexing, append-only integrity |
| **Multi-agent swarm** | `swarm/`, `agents/agent1..4`, `judgment-resolver`, `lib/llm.ts` | **Demoted in Sprint 5.** Adapters + optional brief. Not a decision layer. See `docs/sprint5-ideation.md`. |
| **Quant model** | `model/ratings.service.ts`, `model/edge.service.ts`, `lib/devig.ts`, `lib/margin.ts` | Power ratings, EV, fractional Kelly, push probabilities — statistical modelling |
| **Grading & settlement** | `grading/` (CLV, settle), `snapshots/` | Financial correctness, reconciliation |
| **Distribution & ops** | `discord/` (bot, slash, webhook, nacl verify), snapshot cron cadence | Chat integration, scheduling, secrets, uptime |

Two facts shape the staffing: (1) the money-sensitive parts are the **model**
and **grading** — bugs there cost real bankroll, not just a bad UX; and (2) the
inherited four-agent layer is leftover Abacus/CFB shape. It is not a genuine
ensemble. Sprint 5 makes that explicit. The talents that remain load-bearing
are the modeller, the backend architect, data/ingestion, and snapshot ops.

---

## 2. Core team (must-have)

These map directly onto load-bearing subsystems. I cite the talent's catalog `id`.

### `engineering-backend-architect` — **Lead**
Owns the NestJS shell, module boundaries, config, and API surface (`/snapshots/capture`,
admin, discord controllers). The catalog role is literally "scalable system design,
database architecture, API development." This is the spine of the whole service.

### `engineering-ai-engineer`
Owns `lib/llm.ts` and the optional `BriefRenderer` (was Agent 4). Catalog
role stays “intelligent features” — here that means a template-first brief
and a prompt that cannot invent EV or injuries. Does **not** own BET/PASS.

### `agents-orchestrator` — pipeline, not four analysts
`SwarmService` used to fan four personas. Sprint 5 retargets this talent to
sequence capture → `GamePacket` → edge → render → Discord. Quality gate:
incomplete packet ⇒ no brief. The upstream catalog role is a *dev* pipeline
manager; do not re-create a research swarm to give this talent work.

### `engineering-database-optimizer`
The `OddsSnapshot` table is **append-only and is the historical-odds substitute** — the
schema comment says it's "the only reason CLV and RLM are computable without paying for
the historical odds tier." Indexing (`@@index([season, week])`, `[kickoffUtc]`), write
throughput under the 15-minute pre-kickoff cadence, and never mutating history are this
talent's core competency.

### `engineering-data-engineer`
Owns ingestion resilience across four external feeds (The Odds API, ESPN, weather,
Polymarket) and `toSnapshotRows()` flattening. Catalog role: "Data engineering / ETL."
The tokenizer rewrite (ESPN nickname matching, blocking ambiguous "new york"/"los
angeles") is data-engineering work.

### `sports-betting-modeler` — quantitative model owner
Owns `model/ratings.service.ts`, `model/edge.service.ts`, `lib/devig.ts` and
`lib/margin.ts` as *math*, not as code: which de-vig method applies to which market,
the key-number structure behind push probability on 3/7/10, the QB adjustment (the
largest single lever in the model), the Kelly fraction and its caps, and CLV as the
metric the whole system is graded on. Pairs with `engineering-ai-engineer` — this talent
specifies and validates, the AI engineer implements. This is the role that was missing
from the catalog when this assessment was first written (see §4).

### `specialized-model-qa` — model QA
Validates `EdgeResult` / cover calibration, not Agent 1 lean labels. Brief
fidelity: template may only contain `GamePacket` fields. Does not sign the
modeller’s own spec.

### `engineering-devops-automator`
The snapshot **cron cadence is the product** (Tue–Thu 4h → 15 min in the final hour
before kickoff). Missing the closing snapshot means no CLV benchmark. This talent owns
scheduling, the `x-api-key`-protected cron target, secrets (`ODDS_API_KEY`,
`DISCORD_*`, `ABACUSAI_API_KEY`), and deploy.

---

## 3. Supporting talents (bring in per phase)

| Talent (`id`) | Why | When |
|---|---|---|
| `engineering-sre` | Closing snapshot is unmissable; needs alerting on cron failure + uptime around kickoff windows | Before first live NFL week |
| `testing-api-tester` | Four flaky third-party feeds + own REST surface; contract/response tests | During build |
| `testing-reality-checker` | Validates the model against the **known gaps** list (QB lever unpopulated, week from calendar not schedule, totals unmodelled) so they don't ship silently | Continuous |
| `support-finance-tracker` | `Bet` rows, staking, CLV, settlement = real P&L tracking and reconciliation | After first bets graded |
| `support-legal-compliance-checker` | Sports-betting model + Discord distribution has jurisdictional/ToS exposure (odds API terms, gambling-content rules) | Before public distribution |
| `report-distribution-agent` | Discord webhook chunking + slash-command briefs = report distribution channel | During build |
| `engineering-technical-writer` | README is strong; keep model assumptions (push-prob conservatism, Kelly fraction) documented as they change | Continuous |
| `engineering-code-reviewer` | Money-path code (`devig.ts`, `edge.service.ts`, `grading`) needs a second set of eyes on every change | Continuous |
| `engineering-security-engineer` | nacl signature verification is present; validate it plus secret handling and the admin controller's auth | Pre-launch review |

---

## 4. The gap this catalog did not cleanly fill — now filled

**Quantitative / sports-betting modelling.** The heart of the edge —
`projectMargin()`, power de-vig, EV, **fractional Kelly**, push probability on integer
keys (3/7/10), CLV grading — is applied statistics / actuarial work. At the time of this
assessment no talent in the 145 was a "quant," "data scientist," or "betting model
analyst."

Why the gap existed: the catalog was converted from an upstream general-purpose agent
repo whose coverage is software delivery, design, marketing and sales. Applied
statistical modelling of a wagering market sits outside all of those, and the roles that
look adjacent aren't. `engineering-ai-engineer` (systematic, analytical) is the closest
proxy and can carry the implementation, and `testing-reality-checker` guards the
assumptions, but neither is a domain modeller. The README's own "Known gaps" are quant
gaps: the QB adjustment "is the largest single lever in the model" and nothing populates
it yet; season seeding doesn't blend Vegas win totals; totals are stored but unmodelled.
None of those are engineering defects — they are unowned modelling decisions, and a
codebase can be perfectly built and still have no edge.

**Resolution:** the gap is now filled by a new catalog talent, **`sports-betting-modeler`**
(Sports Betting Modeler, role: Quantitative Analyst) — original to this repo rather than
converted from upstream. It owns CLV as the north-star metric, de-vig method selection
(multiplicative / additive / power / Shin), the probability-space rule that caught the
"averaging American odds" bug, ridge/Elo power ratings with the QB lever and HFA
estimation, empirical key-number margin distributions and push probability, fractional
Kelly with hard caps and correlation adjustment, market-shrinkage discipline,
walk-forward backtesting with no look-ahead, model versioning for per-cohort attribution,
and the compliance framing. It is configured at temperature 0.25 rather than the catalog
default 0.7, deliberately: this role should be reproducible and conservative, not
creative.

**Recommendation (updated):** staff `sports-betting-modeler` as a core team member from
the start, paired with `engineering-ai-engineer` for implementation and
`specialized-model-qa` for independent validation. No external hire is required. The
remaining risk is not coverage but sequencing — the QB adjustment must be populated
before any real bankroll is staked.

---

## 5. Staffing by phase

**Build / port completion**
`engineering-backend-architect` (lead) · `sports-betting-modeler` ·
`engineering-data-engineer` · `engineering-database-optimizer` ·
`testing-api-tester` · `report-distribution-agent` ·
`engineering-ai-engineer` (optional brief only)

**Hardening before first live week**
`engineering-devops-automator` · `engineering-sre` · `specialized-model-qa` ·
`sports-betting-modeler` (backtest + CLV audit, D30 seed, QB lever) ·
`engineering-security-engineer` · `engineering-code-reviewer` ·
`support-legal-compliance-checker` · `testing-reality-checker`

**Weekly operation**
`engineering-devops-automator` (cron) · `sports-betting-modeler` (ratings, edge report,
staking, CLV audit) · `support-finance-tracker` (P&L reconciliation) ·
`testing-reality-checker` (gap watch) · `agents-orchestrator` (packet pipeline, not swarm)

**No remaining external gap.** The quantitative betting-model owner is now
`sports-betting-modeler`, added to this catalog.

---

## 6. One-line answer

Staff it with a **backend architect** to lead, a **sports-betting-modeler** to own the
math that *is* the edge, **data-engineer + database-optimizer** for the append-only
odds pipeline, **devops-automator + SRE** for the snapshot cron, and
**model-QA + reality-checker + finance-tracker + legal** to keep a money-handling
system honest. The AI engineer and agents-orchestrator stay on the team as
**brief + pipeline**, not as a four-agent research swarm. Minutes:
`docs/sprint5-ideation.md`.
