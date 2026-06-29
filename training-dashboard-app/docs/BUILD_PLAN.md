# Training Dashboard — v1 Build Plan

## Context

Harold (VelozLabs) wants a personal **training intelligence dashboard** that owns his
training data and answers three questions off one spine: *what did I train* (actual),
*what's coming up* (planned), *is it working* (the delta + body-comp/recovery trends).
It is architected to eventually replace his coaching app (Ladder) once it can *prescribe*,
not just *log*.

This repo (`velozlabs/agency-talent`) is a markdown/yaml **talent catalog** — 145 agent
profiles plus a `projects/` folder of planning docs (e.g. `clay-fitness-planning`, an
earlier venture review of the same founder's fitness-app idea). It contains **zero
application code** and is the wrong home for a React/Supabase app.

**Decision (confirmed with the user):** build a *working app in a separate, dedicated
repo* — not in this catalog. This file is the build plan for that app.

### Delivery mechanic (important constraint)
My git scope this session is limited to `velozlabs/agency-talent`, and the dedicated repo
does not exist yet. So execution proceeds as:
1. I scaffold the complete, self-contained app into a local staging directory
   `training-dashboard-app/` (a clean tree, **not** wired into the catalog) so it can be
   lifted into a fresh repo wholesale (`git init` + copy, or `git subtree`).
2. The user creates `velozlabs/training-dashboard` and grants it to my scope; I then push
   the staged tree there (or hands it over for them to push).
The staging dir will carry its own `README.md` stating it is destined for a separate repo,
and I will **not** add it to the catalog's `README.md` / `TALENT_INDEX.md` / `CATEGORIES.md`.

> If the user would rather I not stage code inside this repo at all, the fallback is to
> deliver this plan only and scaffold once the new repo is in scope. I'll confirm at
> approval.

## Architecture — one spine, three reads

The entire app is **one data model — planned vs. actual training on a timeline** — viewed
through three lenses (what did I train / what's coming up / is it working). The `planned`
status + timeline are built to *hold* planned data from day one (cheap; keeps the founder's
spec promise that planned isn't "expensive to retrofit later"), but v1 does **not** spend
effort *populating* it — see "Reconciled scope" below.

> **Reviewed by an Agency talent team** (Backend Architect, AI Engineer, UX Architect,
> Reality Checker). Their attributed input is folded in throughout and summarized in the
> "Team review — incorporated" section at the end. The guiding verdict, unanimous: this is
> a tool for a userbase of one — resist infrastructure that serves a crowd.

### Stack
- **Frontend:** React + Vite + TypeScript, Tailwind (dark, data-dense terminal aesthetic),
  TanStack Query for data fetching, Recharts for trend/progression charts.
- **Backend/DB:** Supabase (Postgres + Auth + Storage + Edge Functions). Single user now,
  but RLS keyed to `auth.uid()` so multi-user stays *possible*, not built.
- **Vision parser:** Anthropic API, server-side only (Edge Function). See "Screenshot
  pipeline" below.
- **Secrets:** Anthropic API key, Oura PAT, Apple Health ingest token → Supabase secrets,
  used only inside Edge Functions. **Never** in the React client.

### Data model (`supabase/migrations/0001_init.sql`)
Snake_case Postgres tables, all with `user_id uuid` + RLS `user_id = auth.uid()`:
- `training_session`: `date`, `status` enum(`planned`|`actual`|`both`), `source`
  enum(`ladder_screenshot`|`apple_health`|`manual`), envelope (`duration_min`, `avg_hr`,
  `calories`), `notes`. **`unique(user_id, date, source)`** so a re-sync/re-upload updates
  rather than duplicates *(Backend Architect: idempotency, not uptime, is the real reliability
  concern here)*.
- `exercise_entry`: FK `training_session`, `exercise_name`, `order_index`.
- `set_entry`: FK `exercise_entry`, `set_number`, `reps`, `load`, `rpe` — **normalized**
  (each Ladder set is its own row) rather than the flattened sketch in the spec; `est_1rm`
  derived (Epley) in a view, not stored.
- `body_metric`: `date`, `weight_kg`, `body_fat_pct`, `lean_mass_kg`, `source`;
  unique(`user_id`,`date`).
- `recovery_day`: `date`, `readiness`, `hrv`, `sleep_score`, `resting_hr`,
  `temp_deviation`, `total_sleep_min`, `source`; unique(`user_id`,`date`).
- `ingest_event`: raw `jsonb` payload stash for the **Oura/Apple JSON tiers only**, so a
  parse can be cheaply re-run *(Backend Architect: "cheap re-processing of the original
  payload is worth more than any index")*. **Not** used for screenshots — the uploaded image
  in Supabase Storage is provenance enough *(AI Engineer / Reality Checker: don't build a
  reprocessing pipeline for a throwaway tier)*.
- **`v_training_timeline`** (view): the "is it working" rollup — joins sessions, exercise
  progression (est 1RM), body comp, and recovery by date. The rollup is a query, not a table.

### Ingestion — three access tiers (this drives everything)
1. **Oura (clean)** — Edge Function `oura-sync`. Cloud API v2 with a personal access token
   (no OAuth dance for a single user). Hits `/usercollection/daily_sleep`,
   `/daily_readiness`, `/heartrate`, `/daily_activity` with `start_date`/`end_date` →
   **backfill historical ranges on day 1**, then a **manual "Sync" button** for ongoing
   pulls. Upserts `recovery_day` (+ activity envelope) keyed on `unique(user_id, date)`, so
   re-syncs are safe. *(Reality Checker: `pg_cron` is surface area for a userbase of one —
   a manual sync + idempotent upserts is the right amount of engineering; cron is a trivial
   later add if the button gets tedious.)*
2. **Apple Health (bridge)** — Edge Function `apple-health-ingest`, an HTTP POST endpoint
   receiving JSON from the Health Auto Export app on a schedule (bearer-token secured).
   Parses body weight + body fat % (smart scale) → `body_metric`, and workout envelope
   (duration / avg HR / calories) → `training_session` (actual). A one-time `export.xml`
   importer (`scripts/import-apple-health-xml.ts`) backfills `body_metric` history.
3. **Ladder (locked) — screenshot pipeline** — see below. The only way granular set/rep/
   load data escapes Ladder.

### Screenshot pipeline (transition mechanism — NOT permanent infrastructure)
- After a Ladder session: screenshot the summary → upload to Supabase Storage → Edge
  Function `parse-screenshot` calls the Anthropic API with the **image as a base64 vision
  block** + **structured outputs** (`output_config.format` with a `json_schema`) to extract
  `[{exercise, sets:[{reps, load, rpe?}]}]`.
- The **same pipeline** can later parse Ladder's week-ahead view to populate `planned` —
  but that is **post-v1** (see "Reconciled scope").
- **Human-in-the-loop:** parsed result lands in a thin review/edit UI; user confirms before
  it commits to `exercise_entry`/`set_entry`. **Re-confirming an already-saved session
  overwrites its child rows in one transaction** (never appends) *(Backend Architect: this
  rule is what stops the review UI becoming a duplicate-data generator)*. The review step
  **is** the accuracy guarantee — no confidence scoring, retry, or auto-correction layer
  *(AI Engineer)*. Keep it as **one Edge Function with an inline prompt** — no eval harness,
  no model A/B — disposable enough to delete in an afternoon when Ladder is dropped.
- **Model:** default **`claude-haiku-4-5`** ($1/$5 per MTok), with `PARSER_MODEL` as the
  escape hatch up to `claude-sonnet-4-6` / `claude-opus-4-8` if the review UI shows misreads.
  *(AI Engineer overrode my Opus draft: "Ladder's layout is regular and the schema is tiny —
  this is a near-trivial extraction task; defaulting to Opus is the one bit of over-engineering
  here.")* Use `@anthropic-ai/sdk` `messages.create` with `output_config.format` (json_schema;
  reps/load/rpe typed as numbers, rpe nullable) — not the deprecated `output_format`; no
  `budget_tokens`, no prefill.

### Frontend (the three reads on one spine)
*UX Architect's structural note, adopted: "the three reads need a single navigational spine,
not three peer pages — otherwise 'one spine' lives in the data model but not the user's mental
model." So the Timeline is the persistent home; Trends and the Today card are drill-downs from
a selected point on it, not peer destinations.*
- **Timeline** (`pages/Timeline`, the home): the spine — sessions on one time axis, past
  `actual` solid, future `planned` ghosted. Selecting a point drills into the Today card or
  Trends.
- **Today card** (`components/TodayCard`): a **read-only** fusion of all three sources for one
  session — lift detail (Ladder) + physiology envelope (Apple Health HR/calories) + recovery
  context (Oura readiness), e.g. "trained hard on a 62 readiness day." Degrades gracefully to
  "no lift data yet" rather than becoming a mini-editor *(UX Architect: keep it thin)*.
- **Trends** (drill-down): body comp (weight / bf% / lean mass) and recovery (readiness / HRV
  / sleep) over time — populated immediately from backfill. Lift progression (est 1RM per
  lift) starts empty and fills as screenshots accumulate.
- **Cold-start as the *intended* v1 state, not an empty state to apologize for** *(UX
  Architect)*: lead every "is it working" surface with what has history (body comp + recovery);
  frame empty lift charts as "collecting — N sessions logged" with a clear next action (upload
  a screenshot), never a blank/zero chart that reads as broken.
- **Upload/Review** (`components/ScreenshotReview`): screenshot → parse → confirm/correct the
  table → save as `actual`. A plain confirm step, no reconciliation/diffing logic.

### Repo layout (staged in `training-dashboard-app/`)
```
training-dashboard-app/
  README.md                      # states: destined for velozlabs/training-dashboard
  .env.example                   # SUPABASE_URL, anon key; (secrets only in Supabase)
  supabase/
    config.toml
    migrations/0001_init.sql     # schema + RLS + v_training_timeline (no pg_cron in v1)
    functions/oura-sync/
    functions/apple-health-ingest/
    functions/parse-screenshot/
  scripts/import-apple-health-xml.ts
  src/
    lib/supabase.ts
    types/db.ts
    pages/{Dashboard,Trends,Upload}.tsx
    components/{Timeline,TodayCard,ProgressionChart,TrendChart,ScreenshotReview}.tsx
  package.json  tsconfig.json  index.html  tailwind.config.ts
```

## Build phases (v1)
0. **Scaffold** — Vite+React+TS+Tailwind, Supabase client, schema migration, Auth + RLS.
0.5 **Parser de-risk spike (do this BEFORE the rollup)** — run `parse-screenshot` on **~10
   real Ladder screenshots** and eyeball accuracy in the review UI. *(Reality Checker: "the
   screenshot parser is the load-bearing wall and the flakiest brick — it's the only thing
   that justifies replacing Ladder. De-risk it first, because if parsing doesn't work the
   whole 'is it working' thesis collapses." If hand-correcting is barely faster than typing,
   reconsider the whole lift lane before building more on top of it.)*
1. **Oura** — `oura-sync` backfill + manual Sync → `recovery_day`. Recovery trends live.
2. **Apple Health** — `apple-health-ingest` endpoint + XML backfill → `body_metric` +
   envelope. Body-comp trends live; Today-card envelope live. *("is it working" now ~2/3
   populated at launch, per spec — and it leads with the data that has history.)*
3. **Screenshot parser (actual)** — review UI → `exercise_entry`/`set_entry`. Lift
   progression starts filling.
4. **Rollup + polish** — `v_training_timeline`-backed "is it working" view; dark terminal UI.

### Reconciled scope — the `planned` column
Reality Checker argued for cutting the planned lane entirely as v1 scope creep; the founder's
spec argues for building it from day one. **Reconciliation:** the `status` enum and timeline
*hold* planned data from day one (cheap, keeps the retrofit cheap), but **screenshot-fed
planned ingestion + the planned-vs-actual delta move to post-v1.** v1 mostly fills `actual`,
exactly as the spec admits — so we don't spend v1 effort populating a half-empty lane.

### Explicit non-goals (do NOT over-build — from spec + team)
No prescribe/programming engine. Don't build the parser as permanent infra (one disposable
Edge Function, inline prompt, no eval/A-B/confidence machinery — *AI Engineer*). No multi-user,
social, or bloodwork — and don't let "multi-user stays possible" leak past RLS into tenant
scoping or role tables (*Backend Architect*). No `pg_cron`, no real-time streaming — manual
sync is fine. No planned-vs-actual diffing until the planned lane is actually fed.

## Verification
- **Local stack:** `supabase start`, apply `0001_init.sql`, `npm run dev`.
- **Schema/RLS:** insert sample rows as the test user; confirm RLS blocks cross-user reads.
- **Oura:** invoke `oura-sync` with a known date range against the real PAT; assert
  `recovery_day` rows match Oura's web data for those dates.
- **Apple Health:** POST a sample Health Auto Export JSON to `apple-health-ingest`; run the
  XML importer on a small `export.xml`; verify `body_metric`/envelope rows.
- **Parser:** run `parse-screenshot` on a real Ladder summary screenshot; assert the
  structured JSON matches the visible exercises/sets, then confirm the review→save path
  writes `exercise_entry`/`set_entry`.
- **End-to-end:** load the Timeline — selecting a session drills into a Today card with the
  fused view; Trends show backfilled body-comp + recovery; empty lift charts read as
  "collecting", not broken; a saved screenshot appears as `actual` on the timeline.

## Team review — incorporated (attribution)
Reviewed by four Agency talents; their verdict was unanimous that this is a tool for a
userbase of one and infrastructure should reflect that. Changes folded in:

- **Backend Architect** — schema is right-sized, don't add to it; `unique(user_id, date,
  source)` for idempotent re-syncs; re-confirm overwrites child rows in one transaction (the
  duplicate-data bug); keep `ingest_event` raw stash for the JSON tiers; RLS is fine but don't
  let multi-user leak past it.
- **AI Engineer** — default parser model dropped from Opus to **Haiku** (`PARSER_MODEL`
  escape hatch); structured outputs + human review *are* the validation, no extra layer;
  parser stays one disposable Edge Function.
- **UX Architect** — Timeline is the persistent spine, Trends/Today are drill-downs;
  cold-start designed as the intended state ("collecting — N sessions"); Today card and review
  loop kept thin/read-only.
- **Reality Checker** — added a **Phase 0.5 parser-accuracy spike** before building the
  rollup (the parser is the load-bearing risk); dropped `pg_cron` for a manual Sync button;
  **deferred screenshot-fed `planned` ingestion + the delta to post-v1** (reconciled against
  the founder's spec, which keeps the planned *column* from day one).
