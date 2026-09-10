# NFL Edge Engine — Talent Assessment

**Question answered:** Which talents from this catalog are needed to build, run, and
maintain the NFL Edge Engine?

**Source project:** `nfl_edge` — a NestJS/TypeScript service (ported from CFB Slate
Swarm) that snapshots the NFL odds board, maintains power ratings, computes edge
against the market, and grades closing line value (CLV).

---

## 1. What the project actually is

Reading the code and README, NFL Edge decomposes into seven working parts. Each is a
distinct skill demand, which is what the talent mapping keys off of.

| Subsystem | Modules | What it demands |
|---|---|---|
| **Service shell** | `app.module.ts`, `main.ts`, NestJS + Swagger, health check | Backend architecture, dependency injection, config |
| **Data ingestion** | `odds/`, `espn/`, `weather/`, `polymarket/` | Resilient third-party API integration, tokenizers, de-vig math |
| **Persistence** | `prisma/schema.prisma` (append-only `OddsSnapshot`, `Game`, ratings, `Bet`) | Schema design, indexing, append-only integrity |
| **Multi-agent swarm** | `swarm/`, `agents/agent1..4`, `judgment-resolver`, `lib/llm.ts` | LLM orchestration, prompt/eval discipline, retry/backoff |
| **Quant model** | `model/ratings.service.ts`, `model/edge.service.ts`, `lib/devig.ts`, `lib/margin.ts` | Power ratings, EV, fractional Kelly, push probabilities — statistical modelling |
| **Grading & settlement** | `grading/` (CLV, settle), `snapshots/` | Financial correctness, reconciliation |
| **Distribution & ops** | `discord/` (bot, slash, webhook, nacl verify), snapshot cron cadence | Chat integration, scheduling, secrets, uptime |

Two facts shape the staffing: (1) the money-sensitive parts are the **model** and
**grading** — bugs there cost real bankroll, not just a bad UX; and (2) the swarm is a
genuine multi-agent LLM system, not a single prompt.

---

## 2. Core team (must-have)

These map directly onto load-bearing subsystems. I cite the talent's catalog `id`.

### `engineering-backend-architect` — **Lead**
Owns the NestJS shell, module boundaries, config, and API surface (`/snapshots/capture`,
admin, discord controllers). The catalog role is literally "scalable system design,
database architecture, API development." This is the spine of the whole service.

### `engineering-ai-engineer`
Owns the agent layer (`agents/agent1-sentiment` … `agent4-summarizer`,
`judgment-resolver`) and `lib/llm.ts`. Catalog role: "building intelligent features, data
pipelines, and AI-powered applications." The README's own change log (Agent 1 was
averaging American odds incorrectly; converting to probability first) is exactly the kind
of modelling-adjacent bug this talent exists to catch.

### `agents-orchestrator` — multi-agent orchestration
`SwarmService` fans four agents + a resolver across a slate per game. That is
orchestration, not single-model inference. This talent covers the coordination,
per-game sequencing, and judgment-resolution flow that `engineering-ai-engineer` alone
doesn't.

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

### `specialized-model-qa` — LLM/Model QA
The four agents emit labels and `needs_judgment` flags that feed money decisions. This
talent validates model outputs, guards against the "confidently wrong LLM" failure mode,
and is the natural owner of eval sets for the sentiment/sharp labels.

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

## 4. The gap this catalog does not cleanly fill

**Quantitative / sports-betting modelling.** The heart of the edge —
`projectMargin()`, power de-vig, EV, **fractional Kelly**, push probability on integer
keys (3/7/10), CLV grading — is applied statistics / actuarial work. No talent in the
145 is a "quant," "data scientist," or "betting model analyst."

`engineering-ai-engineer` (systematic, analytical) is the closest proxy and can carry
the implementation, and `testing-reality-checker` guards the assumptions, but neither
is a domain modeller. The README's own "Known gaps" are quant gaps: the QB adjustment
"is the largest single lever in the model" and nothing populates it yet; season seeding
doesn't blend Vegas win totals; totals are stored but unmodelled. **Recommendation:**
treat this as an external hire or a new catalog talent (`engineering-quant-modeler` /
`sports-analytics-modeler`) rather than assume an existing talent covers it.

---

## 5. Staffing by phase

**Build / port completion**
`engineering-backend-architect` (lead) · `engineering-ai-engineer` ·
`agents-orchestrator` · `engineering-data-engineer` · `engineering-database-optimizer` ·
`testing-api-tester` · `report-distribution-agent`

**Hardening before first live week**
`engineering-devops-automator` · `engineering-sre` · `specialized-model-qa` ·
`engineering-security-engineer` · `engineering-code-reviewer` ·
`support-legal-compliance-checker`

**Weekly operation**
`engineering-devops-automator` (cron) · `support-finance-tracker` (P&L/CLV) ·
`testing-reality-checker` (gap watch) · `engineering-ai-engineer` (model iteration)

**Persistent gap to fill externally:** quantitative betting-model owner.

---

## 6. One-line answer

Staff it with a **backend architect** to lead, an **AI engineer + agents-orchestrator**
for the LLM swarm, **data-engineer + database-optimizer** for the append-only odds
pipeline, **devops-automator + SRE** for the make-or-break snapshot cron, and
**model-QA + reality-checker + finance-tracker + legal-compliance** to keep a
money-handling system honest — and hire a **quant modeller from outside the catalog**,
because that role, which is the actual edge, isn't here.
