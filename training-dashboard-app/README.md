# Training Dashboard

> **This tree is destined for its own repo — `velozlabs/training-dashboard`.**
> It is staged inside the `agency-talent` catalog only because that was the active
> git scope when it was scaffolded. It is **not** part of the talent catalog: lift it
> out wholesale (`git init` + copy, or `git subtree split`) into the dedicated repo.
> Do not add it to the catalog's README / TALENT_INDEX / CATEGORIES.

A personal **training intelligence dashboard** that owns my training data and answers
three questions off one spine — *what did I train*, *what's coming up*, *is it working* —
architected to eventually replace Ladder once it can **prescribe**, not just **log**.

## One spine, three reads
One data model — **planned vs. actual training on a timeline** — viewed three ways:
1. **What did I train** → the `actual` column (past + today)
2. **What's coming up** → the `planned` column (future)
3. **Is it working** → the delta + body-comp & recovery trends over time

The Timeline is the persistent home; the Today card and Trends are drill-downs from it.

## Stack
- React + Vite + TypeScript + Tailwind (dark, data-dense terminal aesthetic)
- Supabase: Postgres + Auth + Storage + Edge Functions
- Anthropic API for the vision screenshot parser (server-side only)

## Data sources — three access tiers
| Source | Tier | How data gets in |
|---|---|---|
| **Oura** | clean | Cloud API v2 + personal access token; day-1 backfill, then manual Sync |
| **Apple Health** | bridge | Health Auto Export POSTs JSON; one-time XML import for backfill |
| **Ladder** | locked | Screenshot → Anthropic vision parser → review/confirm (scaffolding only) |

## Getting started
```bash
cp .env.example .env          # fill in VITE_SUPABASE_URL + anon key
npm install
supabase start                # local Postgres + Auth + Storage
supabase db reset             # applies supabase/migrations/0001_init.sql
npm run dev
```

Server-side secrets (Anthropic key, Oura PAT, Apple Health token) go in Supabase
secrets, never in the client — see `.env.example`.

```bash
supabase functions deploy oura-sync apple-health-ingest parse-screenshot
supabase secrets set ANTHROPIC_API_KEY=... OURA_PAT=... APPLE_HEALTH_TOKEN=...
npm run import:apple-health -- ./export.xml   # one-time body-comp backfill
```

## Layout
```
supabase/migrations/0001_init.sql   # the data spine: tables, RLS, v_training_timeline
supabase/functions/                 # oura-sync, apple-health-ingest, parse-screenshot
scripts/import-apple-health-xml.ts  # one-time body_metric backfill from export.xml
src/                                # React app (Timeline home + drill-downs)
design/                             # visual concept + sample mockup
```

## v1 scope
Live on launch: body-comp + recovery trends (backfilled), Today card fusion, screenshot
→ actual lift logging. The `planned` column exists in the schema from day one but is **not**
populated in v1 (screenshot-fed planned ingestion + planned-vs-actual delta are post-v1).

**Non-goals (v1):** no prescribe/programming engine, no multi-user/social, no bloodwork,
no real-time streaming, no cron (manual Sync).

See the full build plan and the Agency talent-team review that shaped it in
`docs/BUILD_PLAN.md`.
