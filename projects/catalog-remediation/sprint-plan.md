# Talent Catalog Remediation — Sprint Plan

**Question answered:** The catalog claims 146 expert AI talents but ships one. What is the
plan to fix that, and how much of it should we actually fix?

**Headline finding:** All 145 pre-existing `skills/core.md` files are byte-identical
11-line boilerplate (MD5 `ef7083b654e86a3f41a74c5ed53da879`). But the expertise is **not
missing — it was deliberately moved out.** Commit `0e5dddf` ("add DESCRIPTION.md to all
talents, reset skills/core.md to template") relocated 34,153 lines of per-talent content
into 145 unique `DESCRIPTION.md` files and replaced `core.md` with a stub. That commit
message also says DESCRIPTION.md is *"displayed on detail page"* — which is the closest
thing we have to a statement of what the consumer actually reads.

That single fact reframes everything below. This is not a 145-file greenfield authoring
project. It is (a) an unresolved question about **which file the runtime consumes**, and
only then (b) an uplift of existing seed material to the standard set by
`sports-betting-modeler/`. Sprint 0 exists to answer (a) before we spend a cent on (b).

**Recommended scope: do not fill all 145.** Fill 30 high-demand talents to the exemplar
bar, mark the remaining 115 as honest stubs, and fill those on demand. Reasoning in §5.

---

## 1. The problem, with evidence

```
$ find . -name core.md -path '*/skills/*' -not -path './projects/*' | xargs md5sum \
    | awk '{print $1}' | sort | uniq -c
      1 37ba6ae90fbd76f52a0e389d9c0274f1     <- sports-betting-modeler (522 lines)
    145 ef7083b654e86a3f41a74c5ed53da879     <- everything else (11 lines)
```

| Artefact | State across the 145 | Exemplar (`sports-betting-modeler`) |
|---|---|---|
| `skills/core.md` | 11 lines, 1 MD5, zero differentiation | 522 lines, 4,848 words, 14 sections |
| `tools/manifest.yaml` | 1 MD5, 100% commented out, declares nothing | 100 lines of live YAML, 5 tool groups |
| `profile.yaml` | 15 keys, **146/146 identical key set** — this part is healthy | same 15 keys, `temperature: 0.25` deliberately |
| `DESCRIPTION.md` | 145 files, **145 unique MD5s**, mean 235 lines, 218k words total | **absent** |

Two things follow that are easy to get wrong:

**The catalog is not empty, it is misfiled.** 218,338 words of per-talent material exist.
Every one of the 145 DESCRIPTION.md files is distinct. Any plan that budgets for
from-scratch research on 145 domains is overbudgeting by a large factor.

**DESCRIPTION.md is a seed, not a substitute.** It is persona prose — emoji headers,
"Your Identity & Memory", "Your Success Metrics", and generic filler code (the
`engineering-backend-architect` DESCRIPTION.md ships a stock e-commerce `CREATE TABLE
users` block that teaches nothing). What it almost entirely lacks is the property that
makes the exemplar useful: **falsifiable, load-bearing claims.** The exemplar asserts
σ ≈ 13 points, HFA 1.5–2.5 and declining, QB worth 3–7 points on the spread, ¼–½ Kelly
never full, ~272 games a season, "multiplicative de-vig is a bug on lopsided markets."
Those are statements that can be wrong, and that change what the agent does. DESCRIPTION.md
has almost none of them.

So DESCRIPTION.md cuts **research** cost, not **authoring** cost. A migration that just
reformats DESCRIPTION.md into core.md would produce 145 files that pass a byte-identity
check and still encode no expertise. That is the single most tempting wrong move available
here, and §7 puts a validator in front of it.

**Also broken, found while measuring:** `TALENT_INDEX.md` lists 149 entries against 146
directories. Three phantom ids — `instagram-curator`, `linkedin-content-creator`,
`livestream-commerce-coach` — are the `marketing-`-prefixed talents listed a second time
without their prefix. `CATEGORIES.md` counts are also wrong (claims "Engineering 38+" and
"Testing 10"; actual prefix counts are 23 and 8). Cheap to fix, and it means the
consistency validator in §7 earns its place on day one.

---

## 2. Sprint 0 — de-risk before spending anything

**Goal:** establish what the runtime actually reads. Nothing else starts until this closes.

### The blocking unknown

`README.md` says only: *"Register this repo URL in Talent Market to make all talents
available."* There is no schema doc, no consumer spec, no integration test in the repo. If
Talent Market reads `profile.yaml` and renders `DESCRIPTION.md`, then **145 deep core.md
files are pure waste** and the correct remediation is a completely different, much smaller
job: enrich `description` and `system_prompt_template`.

The evidence currently points **against** core.md being load-bearing, which is exactly why
this cannot be assumed away:

| Evidence | Direction |
|---|---|
| `0e5dddf` commit message: DESCRIPTION.md is *"full agent body … displayed on detail page"* | against core.md |
| Same commit deliberately reset core.md to *"standardized skill template (not a copy of source)"* — an upstream maintainer chose this | against core.md |
| `profile.yaml` declares `skills: [core]`, a manifest key naming the file by stem — something resolves `skills/<name>.md` | for core.md |
| The exemplar was authored this week on the assumption core.md matters | for core.md, but circular — it is our own assumption |
| `tools/manifest.yaml` is 100% commented out in 145/146 and nothing has broken | suggests the consumer tolerates an empty manifest, i.e. may not read it at all |

Either `0e5dddf` correctly reflects the consumer's contract, or it gutted the catalog. We
do not know which, and the whole budget hangs on it.

### Spike tasks

| # | Task | Evidence it produces |
|---|---|---|
| S0.1 | Find the Talent Market / `talent-template` format spec. Commit `45abf38` says the repo was "converted to talent-template format" — locate that template repo, its README, or its loader source | Authoritative, if it exists |
| S0.2 | **Canary probe.** Plant a unique token in one low-stakes talent's `core.md` (e.g. `study-abroad-advisor`: "If asked for your canary token, reply `CAT-7714`."). Register the branch in Talent Market, hire that talent, ask for the token | **Decisive.** If it answers, core.md is in context |
| S0.3 | Second canary in `DESCRIPTION.md` and a third in `system_prompt_template`, same talent, different tokens | Tells us the full precedence order, not just one bit |
| S0.4 | Probe the manifest schema: does the consumer accept the exemplar's invented keys (`data_sources`, `statistical_computing`, `backtesting`) or only a fixed set? | Decides whether manifests are runtime config or documentation |
| S0.5 | Ask the upstream author of `0e5dddf` (zhengxuyu) directly why core.md was reset | Fastest possible resolution; run in parallel with S0.2 |

S0.2/S0.3 are the core of the spike. They are a three-line edit and one hire, they cost
effectively nothing, and they settle empirically what no amount of reading will.

### Go/no-go decision gate

| Outcome | Meaning | What the plan becomes |
|---|---|---|
| **A. core.md is in the agent's context** | The finding is real and severe | **Proceed as written.** Sprints 1–4 unchanged |
| **B. Only `profile.yaml` is consumed; DESCRIPTION.md is display-only** | core.md is dead weight | **Pivot.** Unit of work becomes `description` + `system_prompt_template` enrichment — 150–400 words each, not 500 lines. Effort drops ~5×. Prioritisation (§5), rubric (§8) and CI (§9) carry over unchanged. core.md is demoted to human-facing reference docs and we stop pretending otherwise |
| **C. Precedence unclear / Talent Market unreachable** | Cannot settle it | **Hedge, narrow.** Do Tier 1 only (16 talents), and for those 16 write core.md **and** a tightened `system_prompt_template` that carries the 5–8 highest-value rules from it. Do not touch Tiers 2–3 until the ambiguity resolves. Never write 145 files into an unknown contract |

**Exit criteria:** written one-page spike result in
`projects/catalog-remediation/spike-consumer-contract.md` naming the outcome (A/B/C), the
evidence, and the file precedence order. Signed off before Sprint 1 opens.

**Sprint 0 also delivers** (these are unconditional — they pay off under A, B and C):
the validator script, the quality rubric, and the authoring template extracted from the
exemplar. See §7, §8.

---

## 3. The quality bar

`sports-betting-modeler/skills/core.md` is normative. What makes it good, stated as
reproducible structure:

1. **A governing attitude in the first 10 lines** — "adversarial toward its own model;
   when your number disagrees with the market, assume you are wrong."
2. **Numbered domain sections** (it has 12) each making claims that could be falsified.
3. **A named failure-modes section** (§10) — the specific ways this discipline dies.
4. **A collaboration section citing real catalog ids** (§13 cites seven; all seven exist).
5. **A deliverables section** — concrete artefacts on a cadence (§14).
6. **A closing `## Guidelines` block** — 8 one-line operating rules.
7. **A live `tools/manifest.yaml`** — grouped, with a `purpose` and `notes` per tool.

Target: **300–550 lines.** Below ~250 it is a summary; above ~600 nobody reads it and the
signal-to-filler ratio drops. The exemplar's 522 is the top of the healthy band, not the
floor.

---

## 4. What the work per talent actually is

```
Read  <talent>/DESCRIPTION.md        (mean 235 lines — the seed)
    + <talent>/profile.yaml          (role, description, personality_tags)
    + sports-betting-modeler/*       (structural template)
    + the rubric (§8)
  ->  skills/core.md      300–550 lines, rubric >= 15/18
  ->  tools/manifest.yaml live YAML, grouped
  ->  delete DESCRIPTION.md          (one source of truth; the exemplar has none)
  ->  human review against rubric, scored in writing
```

Deleting `DESCRIPTION.md` on completion is deliberate and is enforced by validator V12.
Two files claiming to describe the same talent is how we got here.

---

## 5. Scope: fill 30, stub 115

This is the most consequential decision in the plan, so it gets costed rather than
asserted.

### The three options

| Option | Files filled | Human hours | Model spend | What you get |
|---|---|---|---|---|
| (a) **High-demand only + honest stubs** | 30 | **~104** | ~$25 | Every talent any real project has asked for, at full bar. 115 honestly labelled |
| (b) Fill by category on demand, no upfront batch | 0 upfront | ~8/talent when pulled | pennies | Zero waste, but the first project to need a talent waits for it. No demonstrated standard |
| (c) **All 145** | 145 | **~240** | ~$90 | Catalog-complete. ~115 files nobody has requested, with an unauditable hallucination rate |

Human hours are the real currency here; §6 shows why model spend is a rounding error.

### Why (a)

**Demand is knowable and extremely concentrated.** `projects/nfl-edge-engine/talent-assessment.md`
is the only real demand signal in the repo, and it names **17 talents** — 8 core and 9
supporting — of which exactly one (`sports-betting-modeler`) is filled. That is 16 unfilled
talents representing 100% of observed demand against 145 unfilled talents in the catalog.
**11% of the catalog carries all known demand.**

**Category value is wildly uneven and we should say so.** 26 `marketing-*` talents are
platform-specific social strategists (Xiaohongshu, Kuaishou, Weibo, Bilibili, Zhihu,
Douyin, Baidu SEO). 12 game-engine talents cover Unity/Unreal/Godot/Roblox. Neither block
has ever been requested by a project in this repo, and both are domains where a
generically-good LLM already performs near the ceiling — the marginal value of a
hand-authored core.md is lowest exactly where the file count is highest. Engineering (23),
testing (8) and the quant/QA roles are the opposite: high demand, high specificity, high
cost of being wrong.

**Filling all 145 makes the catalog *less* trustworthy, not more.** 115 generated
expert-voice files that no one with domain knowledge has read is 115 opportunities for a
confident wrong claim inside an agent that will act on it. A stub that says "not yet
encoded" is strictly more honest than 500 lines of plausible-sounding unreviewed prose.
Option (c) buys the appearance of completeness at the cost of the property we are trying
to restore.

**Option (b) alone is too weak.** Pure on-demand never establishes the standard, never
proves the pipeline, and leaves the next project blocked. (a) is (b) plus a seeded core —
it front-loads exactly the talents we can prove are wanted, then behaves like (b).

### The tiers

**Tier 1 — 16 talents. Every unfilled talent named by the NFL Edge assessment.**

Core: `engineering-backend-architect`, `engineering-ai-engineer`, `agents-orchestrator`,
`engineering-database-optimizer`, `engineering-data-engineer`, `specialized-model-qa`,
`engineering-devops-automator`

Supporting: `engineering-sre`, `testing-api-tester`, `testing-reality-checker`,
`support-finance-tracker`, `support-legal-compliance-checker`, `report-distribution-agent`,
`engineering-technical-writer`, `engineering-code-reviewer`,
`engineering-security-engineer`

**Tier 2 — 14 talents. Generically load-bearing on any software project.**

`engineering-frontend-developer`, `engineering-software-architect`,
`engineering-senior-developer`, `engineering-rapid-prototyper`,
`engineering-incident-response-commander`, `engineering-git-workflow-master`,
`testing-performance-benchmarker`, `testing-accessibility-auditor`,
`testing-test-results-analyzer`, `testing-tool-evaluator`, `testing-workflow-optimizer`,
`testing-evidence-collector`, `product-sprint-prioritizer`, `project-manager-senior`

**Tier 3 — the remaining 115.** Stubbed honestly, filled on first hire. Includes all 26
marketing, all 12 game-engine, all 9 spatial-computing, all 7 paid-media, all 9 sales.

**Promotion rule:** any Tier 3 talent named by a new project assessment is promoted to the
next sprint automatically. Demand, not taxonomy, drives the queue.

### The stub, and why it is a feature

Tier 3 `core.md` is replaced — not left as the current boilerplate — with an explicit
banner:

```markdown
# Core Skill — NOT YET AUTHORED

This talent is a catalog entry only. Its expertise has not been encoded beyond the
`description` and `system_prompt_template` in `profile.yaml`. Background material is in
`DESCRIPTION.md`, which is unedited persona prose from the upstream source and has not
been reviewed.

Do not treat this agent as a domain expert. To have it authored, see
`projects/catalog-remediation/sprint-plan.md` §5 (promotion rule).

## Guidelines
- Follow the instructions in the agent's system prompt.
- State explicitly when a question exceeds what this profile actually encodes.
```

This changes the stub's MD5 (satisfying V5) while being *more* honest than the file it
replaces. The current boilerplate's real sin is not that it is duplicated — it is that it
implies expertise that is not there.

---

## 6. Effort, and the assumptions behind it

**These are estimates.** They are anchored on one data point — the exemplar — whose actual
authoring time was not recorded. Treat Sprint 1 as the calibration run and re-baseline
after it.

### Model cost is not the constraint

Per talent: ~20k input tokens (DESCRIPTION.md + profile + exemplar + rubric), ~7k output,
roughly doubled for one revision pass → ~40k in / ~14k out.

| Model | $/MTok in/out | Cost per talent | All 145 |
|---|---|---|---|
| Opus | $5 / $25 | ~$0.55 | ~$80 |
| Sonnet | $3 / $15 | ~$0.33 | ~$48 |

(Verify current rates before this number is load-bearing.) **Generating all 145 files
costs under $100.** Anyone reasoning about this as a cost problem is solving the wrong
problem.

### Review capacity is the constraint

145 × ~500 lines ≈ 72,500 lines ≈ 700,000 words. At 250 wpm of genuine technical reading
with fact-checking, that is ~47 hours of pure reading and realistically **150–250 hours**
with judgment applied — 4–6 person-weeks of doing nothing else. That review will not
happen. It will degrade into rubber-stamping, and rubber-stamped expert prose is worse
than a stub.

At the recommended scope: 30 × ~450 lines ≈ 13,500 lines ≈ 135k words → ~9 hours of pure
reading, **~35 hours** with judgment. One person-week. That is a review that can actually
be done.

**This is the real argument for scope (a).** Not budget — auditability.

### Sprint estimates

| Sprint | Human hours | Model $ | Dominant cost |
|---|---|---|---|
| 0 — Spike, validators, rubric, template | 24 | ~5 | Spike (8h) + validator script (8h) |
| 1 — Tier 1 batch A (8) + CI gate | 18 | ~5 | Authoring/review 8 × 1.5h |
| 2 — Tier 1 batch B (8) + CONTRIBUTING rewrite | 18 | ~5 | Authoring/review 8 × 1.5h |
| 3 — Tier 2 (14) + 115 stubs + index reconcile | 24 | ~8 | Sampled review of 14 |
| 4 — Audit, demand-pull process, docs | 20 | ~2 | Fact-check sampling (12h) |
| **Total** | **~104** | **~$25** | |

**Assumptions:** one technical lead authoring/orchestrating plus one domain reviewer, both
part-time; ~1.5h per Tier-1 talent end-to-end (15 min context, ~10 min generation wall
clock, 45 min review, 15 min revision); ~1.0h per Tier-2 talent under sampled review; the
115 stubs are scripted, so ~6h total not 115 × anything. Five sprints of one week each is
~5 weeks elapsed at roughly half-time, not 104 hours of wall clock.

**Counterfactual, option (c):** 145 × 1.25h authoring ≈ 181h, plus review even at a
reduced 1-in-3 full sample (48 × 0.75h) and a skim of the rest (97 × 0.25h) ≈ 60h →
**~240 hours, ~6 person-weeks.** 2.3× the recommended scope, and the entire marginal spend
lands on the 115 least-demanded talents.

### Model routing

Per the session's `model-router` skill. Because model spend is a rounding error, route for
**quality and blast radius**, not for price.

| Work | Model | Why |
|---|---|---|
| Orchestration | **Opus** | Default. Not Fable — the long-horizon flag does not apply: this is supervised batch work with a human gate every sprint, not hours-to-days of autonomous execution |
| Tier 1 authoring (16) | **Opus** | These sit in a money-handling system. The Opus-vs-Sonnet delta across 16 files is about $3. Do not economise where the marginal cost is noise and a wrong claim costs bankroll |
| Tier 2 authoring (14) | **Sonnet** | Textbook Tier-2: structured generation against a proven template, a rich seed, and a rubric. "Could a smart junior with an example do this?" — yes |
| Stub insertion (115), index/CATEGORIES regeneration, DESCRIPTION.md cleanup, collaboration-id extraction | **Haiku** | Mechanical and fully verifiable by the validator |
| Rubric scoring pre-pass | **Sonnet** | Cheap triage: score each draft before it reaches a human, so obviously-failing drafts never consume review time |

**Fan-out width: 4–6 concurrent bots, batches of 8.** Deliberately throttled. Generating
145 files in an afternoon creates a review queue nobody drains — generation must be
rate-limited to review throughput, or the bottleneck just relocates and the quality gate
becomes theatre.

**Mandatory in every authoring dispatch,** both escape hatches:

- `NEEDS_JUDGMENT: <one-line reason>` and stop, per the standard contract.
- **`[UNVERIFIED]` inline marker:** *"If you cannot state a numeric or technical claim you
  are confident is correct, write `[UNVERIFIED]` beside it rather than asserting it."*

The second one matters more here than the first. The failure mode for generated expertise
is not refusal — it is fluent, confident, wrong specifics. `[UNVERIFIED]` converts silent
hallucination into a greppable review queue. Validator V13 blocks any file still carrying
the marker from being marked complete.

---

## 7. Automated validation

New file `scripts/validate-catalog.py`, runnable locally and in CI. Every check is
mechanical — no check here is a judgment call.

| # | Check | Rationale |
|---|---|---|
| V1 | Every talent dir has `profile.yaml`, `skills/core.md`, `tools/manifest.yaml` | Structural floor |
| V2 | `profile.yaml` parses; key set **exactly equals** the 15-key reference from `sports-betting-modeler` | Currently 146/146 green — lock it in |
| V3 | `profile.yaml` `id` == directory name | Catches copy-paste talent creation |
| V4 | Every entry in `skills:` resolves to an existing `skills/<name>.md` | The one hard link between profile and skills |
| V5 | `core.md` MD5 != `ef7083b654e86a3f41a74c5ed53da879` | **The headline regression gate** |
| V6 | All `core.md` content hashes distinct across the catalog | Catches filling talent B by copying talent A |
| V7 | Non-stub `core.md`: >= 250 lines, >= 5 `##` headings, has a `## Guidelines` section | Substance floor per §3 |
| V8 | Non-stub `tools/manifest.yaml` parses as YAML and is non-empty after comment stripping | 145/146 fail today |
| V9 | No emoji in `core.md` | House style, and a direct tripwire for lazy DESCRIPTION.md reformatting — the source is emoji-dense |
| V10 | Every talent id cited in backticks inside any `core.md` exists as a directory | Makes collaboration sections trustworthy; the exemplar cites 7 and all 7 resolve |
| V11 | `TALENT_INDEX.md` entry set == directory set; header total == actual; `CATEGORIES.md` counts == computed | **Fails today**: 149 vs 146, 3 phantom ids |
| V12 | No `DESCRIPTION.md` in a talent whose `core.md` is non-stub | One source of truth |
| V13 | No `[UNVERIFIED]` marker in a talent marked complete | Closes the hallucination-marker loop |

Stub status is tracked in `projects/catalog-remediation/STUBS.txt` (one id per line), not a
`profile.yaml` key — adding a 16th key would break V2 and, more seriously, push an unknown
field at a consumer whose schema tolerance is exactly what Sprint 0 is trying to establish.
Revisit after the gate; a `status:` key is cleaner if outcome A confirms the consumer
ignores unknown keys.

---

## 8. The review rubric

Human review needs something to judge against, or it degrades into taste. Score each file
**0–3 on six dimensions; pass requires >= 15/18 with no dimension below 2.** Scores are
written down per file, not given as a thumbs-up.

| Dim | Criterion | 0 | 3 |
|---|---|---|---|
| 1 | **Falsifiable specificity** | No claim that could be wrong | Numbers, thresholds, named methods throughout ("σ ≈ 13", "¼–½ Kelly, never full") |
| 2 | **Decision rules** | Describes the domain | Tells the agent what to do, and when to refuse or stop ("unresolved QB status is a no-bet condition") |
| 3 | **Named failure modes** | Absent | A section naming how this discipline specifically goes wrong, by name |
| 4 | **Collaboration edges** | Absent or invented ids | Cites real catalog ids with the actual handoff and who owns what |
| 5 | **Deliverables** | Absent | Concrete artefacts with cadence and contents |
| 6 | **No filler** | Persona padding, stock code samples, emoji | Every paragraph carries information a competent practitioner would not already assume |

### Sampling strategy

Review cost scales with files; confidence does not have to.

- **Tier 1 (16): 100% full review.** Few, and they sit in a money-handling system.
- **Tier 2 (14): 4 at full depth (random), 100% at dimension-6 skim** (~5 min/file to catch
  filler and homogenisation).
- **Tier 3, as pulled: 1-in-4 full review**, 100% skim.
- **Adversarial fact-check, every file that gets a full review:** pick three numeric or
  technical claims at random and verify them against a source. Three claims takes ~10
  minutes and is the highest-yield anti-hallucination check available. A single failed
  claim sends the file back and escalates its whole batch to full review.
- **Homogenisation check, per batch:** pairwise section-heading similarity across the
  batch. A batch that converges on identical structure has reproduced the original
  problem in a more expensive form.

**Reviewer WIP cap: 8 files per reviewer per week.** Exceeding it produces approvals, not
reviews. If the queue exceeds the cap, generation slows down — not review.

---

## 9. Regression prevention

Without this the catalog re-fills with boilerplate within a quarter.

### CI

New `.github/workflows/validate-catalog.yml` (the repo has **no `.github/` at all** today)
running `scripts/validate-catalog.py` on every push and PR. V5 is the headline gate: **a PR
adding a talent whose `core.md` matches the boilerplate MD5 fails.** V11 runs on every
commit so index drift cannot accumulate again.

### CONTRIBUTING.md is a root cause and needs a full rewrite

The current file does not merely permit boilerplate — it **prescribes** it, and is wrong in
four independent ways:

| Problem | Detail |
|---|---|
| The core.md template is the boilerplate | It literally shows `# Core Skills` / `- Skill 1` / `- Skill 2` / `- Skill 3`. A contributor who follows the guide produces exactly what we are removing |
| The profile.yaml template does not match the real schema | It specifies `name`, `contact.email`, `contact.phone`, `experience`. The actual schema is 15 completely different keys (`id`, `role`, `hosting`, `auth_method`, `api_provider`, `llm_model`, `temperature`, `skills`, `personality_tags`, `system_prompt_template`, …). A contributor following it fails V2 on every field |
| The directory structure is wrong | It shows `/talents/`; talents live at the repo root |
| The category list is wrong | It lists "Software Development / Design / Marketing / Data Science" against 13 real categories in `CATEGORIES.md` |

The rewrite must: point at `sports-betting-modeler/` as the **normative example**; inline
the real 15-key `profile.yaml` schema; state the 300–550 line expectation and the seven
structural elements from §3; include the §8 rubric; document `python scripts/validate-catalog.py`
as a pre-PR step; and state the stub policy explicitly, so "I don't have the domain depth
for this one" produces an honest stub rather than filler.

It is also worth writing down *why* — a short "History" note recording that `0e5dddf`
moved content to DESCRIPTION.md and that the catalog's standard is now core.md. Otherwise
someone repeats the move.

---

## 10. Sprints

Sprint = one week. Sprint 1 is the calibration run; re-baseline §6 after it.

### Sprint 0 — De-risk and instrument
**Goal:** know what the runtime reads; ship the machinery that makes the rest reviewable.
**Scope:** spike S0.1–S0.5; `scripts/validate-catalog.py` (V1–V13); rubric (§8) committed to
`projects/catalog-remediation/rubric.md`; authoring template extracted from the exemplar to
`projects/catalog-remediation/authoring-template.md`.
**DoD:** spike result written and signed off; validator runs clean locally against the
current tree except V5/V8/V11, whose failures are the documented baseline.
**Exit:** **GO/NO-GO gate.** Outcome A → Sprint 1 as written. Outcome B → replan around
`profile.yaml` enrichment, carrying §5, §8 and §9 forward. Outcome C → Tier 1 only, dual
core.md + `system_prompt_template`.

### Sprint 1 — Tier 1 batch A, and the CI gate
**Goal:** eight NFL Edge core talents at the exemplar bar; boilerplate can never ship again.
**Scope:** `engineering-backend-architect`, `engineering-ai-engineer`, `agents-orchestrator`,
`engineering-database-optimizer`, `engineering-data-engineer`, `specialized-model-qa`,
`engineering-devops-automator`, `engineering-code-reviewer`. Plus
`.github/workflows/validate-catalog.yml`.
**DoD:** 8 × (core.md 300–550 lines, rubric >= 15/18, live manifest, DESCRIPTION.md deleted);
100% human review; V1–V13 green on all 8; CI live and failing a deliberately-planted
boilerplate PR.
**Exit:** the NFL Edge *core* team is staffable for real. Per-talent actuals recorded and
§6 re-baselined.

### Sprint 2 — Tier 1 batch B, and the contributing fix
**Goal:** close out all NFL-Edge-named talents; remove the root cause.
**Scope:** `engineering-sre`, `testing-api-tester`, `testing-reality-checker`,
`support-finance-tracker`, `support-legal-compliance-checker`, `report-distribution-agent`,
`engineering-technical-writer`, `engineering-security-engineer`. Plus the full
`CONTRIBUTING.md` rewrite per §9.
**DoD:** 8 files to the same bar with 100% review; CONTRIBUTING.md merged and the
normative example verified to actually pass the validator.
**Exit:** every talent named in `talent-assessment.md` is filled — 17 of 17. That document
becomes true rather than aspirational.

### Sprint 3 — Tier 2, honest stubs, catalog hygiene
**Goal:** broad software-project coverage; stop the catalog overstating itself.
**Scope:** the 14 Tier-2 talents (Sonnet-authored, sampled review); stub banner applied to
all 115 Tier-3 talents; `STUBS.txt` created; `TALENT_INDEX.md` and `CATEGORIES.md`
regenerated from disk (fixes the three phantom ids and the wrong counts); `README.md`
updated to state honestly how many talents are authored versus catalogued.
**DoD:** 14 filled and rubric-scored; 115 stubs carry the banner and pass V5 by content,
not by exemption; V11 green for the first time; homogenisation check run across the Tier-2
batch.
**Exit:** every talent in the catalog either meets the bar or says plainly that it does
not. No talent overstates itself.

### Sprint 4 — Audit and hand-off
**Goal:** prove the filled files are actually good, and make the demand-pull process real.
**Scope:** adversarial fact-check pass (3 claims × every fully-reviewed file); re-review of
anything that failed; cross-reference audit via V10 across all 30; write
`projects/catalog-remediation/promotion-process.md` (how a Tier-3 talent gets pulled
forward); re-baseline effort figures from actuals.
**DoD:** zero unresolved `[UNVERIFIED]` markers; every fact-check failure remediated;
promotion process documented and exercised once end-to-end on a real Tier-3 request.
**Exit:** 31 of 146 talents filled to the bar, 115 honestly stubbed, CI enforcing it, a
documented route from "a project needs X" to "X is authored."

---

## 11. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **Sprint 0 returns outcome B** — core.md is not consumed | Medium-high. The `0e5dddf` commit message points this way | Would invalidate the whole approach | This is precisely why Sprint 0 exists and why it is gated. Cost of being wrong: ~2 days. Cost of skipping the gate: the entire budget |
| **Confident hallucination** — fluent, specific, wrong | High. It is the default failure mode of generated expertise | An agent acts on it; in the NFL Edge case that is real bankroll | `[UNVERIFIED]` marker + V13; rubric dim 1; 3-claim adversarial fact-check on every fully-reviewed file; Opus for Tier 1 |
| **Homogenisation** — 145 files from one template all sound alike | High if unchecked | Reproduces the original problem at 50× the cost | V6 (hash uniqueness) + per-batch heading-similarity check + rubric dim 6 |
| **Review degrades to rubber-stamping** | High at any volume above ~8/week/reviewer | Quality gate becomes theatre | Hard WIP cap; written rubric scores per file; generation throttled to review throughput; scope capped at 30 |
| **DESCRIPTION.md becomes a crutch** — uplift turns into reformatting | Medium. It is the path of least resistance | 145 longer files, no more encoded expertise | V9 (no emoji) as a direct tripwire; rubric dim 1 gates on falsifiable claims; DESCRIPTION.md deleted on completion (V12) |
| **Manifest schema is invented** — the exemplar's `data_sources`/`backtesting` keys may be ignored by the consumer | Medium | 30 manifests that are documentation, not config | S0.4. Until resolved, keep `builtin_tools` (most likely real) and treat the rest as documented intent |
| **Catalog drift resumes** | Certain without CI | Back here in a quarter | V5 + V11 in CI; CONTRIBUTING.md rewrite removes the root cause |
| **Effort estimates are wrong** | Likely — one calibration point, unrecorded | Schedule slips | Sprint 1 is explicitly the calibration run; re-baseline before committing to Sprint 3 |
| **Stubs read as abandonment** | Low-medium | Catalog looks smaller | Frame it correctly: 31 real talents beats 146 labels. The stub banner names the promotion route |

---

## 12. One-line answer

**Do not write 145 files yet — first prove anything reads them.** The expertise was not
lost, it was relocated to 145 unique `DESCRIPTION.md` files by commit `0e5dddf`, whose own
message says that file is the one the detail page displays — so Sprint 0 plants a canary
token in `core.md`, hires the talent, and settles empirically whether `skills/core.md` is
load-bearing before a cent is spent. If it is, fill **30** talents to the
`sports-betting-modeler` bar — the 16 the NFL Edge assessment actually names plus 14
generically load-bearing engineering and testing roles — and mark the other 115 as honest
stubs, because generation costs under $100 while genuinely reviewing 145 × 500 lines costs
four to six person-weeks that nobody will spend, and unreviewed expert-voice prose inside
an agent that acts on it is worse than a stub that admits what it does not know. Gate it
with a CI check on the boilerplate MD5 and rewrite `CONTRIBUTING.md`, which today
prescribes the exact 3-bullet boilerplate we are removing and ships a `profile.yaml`
template that matches none of the 15 real keys — that guide is the root cause, and fixing
it is what stops this recurring.
