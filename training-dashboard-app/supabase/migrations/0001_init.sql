-- Training Dashboard — v1 schema (the spine)
-- One data model: planned vs. actual training on a timeline, read three ways.
--
-- Design notes (from the Agency talent-team review):
--   * Backend Architect: idempotency, not uptime, is the reliability concern here.
--     Every ingestion path can replay, so natural dedupe keys make re-syncs safe.
--     est_1rm is DERIVED in a view, never stored. Schema is right-sized — don't add to it.
--   * RLS keyed to auth.uid() keeps multi-user *possible* without building it. Single user now.
--   * No pg_cron in v1 (manual Sync button). No materialized views / warehouse.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type session_status as enum ('planned', 'actual', 'both');
create type data_source    as enum ('ladder_screenshot', 'apple_health', 'oura', 'manual');

-- ---------------------------------------------------------------------------
-- training_session — the spine row. planned (future) vs actual (past/today).
--   unique(user_id, date, source): a re-sync or re-upload UPDATES, never duplicates.
-- ---------------------------------------------------------------------------
create table training_session (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  date         date not null,
  status       session_status not null,
  source       data_source not null,
  duration_min integer,           -- workout envelope (Apple Health)
  avg_hr       integer,
  calories     integer,
  notes        text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (user_id, date, source)
);
create index training_session_user_date_idx on training_session (user_id, date);

-- ---------------------------------------------------------------------------
-- exercise_entry / set_entry — normalized lift detail (Ladder screenshots).
--   Each logged set is its own row; est_1rm is computed in v_training_timeline.
-- ---------------------------------------------------------------------------
create table exercise_entry (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  session_id    uuid not null references training_session(id) on delete cascade,
  exercise_name text not null,
  order_index   integer not null default 0
);
create index exercise_entry_session_idx on exercise_entry (session_id);

create table set_entry (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users(id) on delete cascade,
  exercise_entry_id  uuid not null references exercise_entry(id) on delete cascade,
  set_number         integer not null,
  reps               integer,
  load               numeric(6,2),   -- weight (kg or lb — UI fixes the unit)
  rpe                numeric(3,1)     -- nullable: Ladder doesn't always surface it
);
create index set_entry_exercise_idx on set_entry (exercise_entry_id);

-- ---------------------------------------------------------------------------
-- body_metric — from Apple Health smart scale. unique(user_id, date) = idempotent.
-- ---------------------------------------------------------------------------
create table body_metric (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  date          date not null,
  weight_kg     numeric(5,2),
  body_fat_pct  numeric(4,1),
  lean_mass_kg  numeric(5,2),
  source        data_source not null default 'apple_health',
  unique (user_id, date)
);

-- ---------------------------------------------------------------------------
-- recovery_day — from Oura. unique(user_id, date) = idempotent backfill + sync.
-- ---------------------------------------------------------------------------
create table recovery_day (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  date            date not null,
  readiness       integer,
  hrv             integer,
  sleep_score     integer,
  resting_hr      integer,
  temp_deviation  numeric(4,2),
  total_sleep_min integer,
  source          data_source not null default 'oura',
  unique (user_id, date)
);

-- ---------------------------------------------------------------------------
-- ingest_event — raw payload stash for the JSON tiers (Oura / Apple Health) ONLY,
-- so a parse can be cheaply re-run. NOT used for screenshots (the image in Storage
-- is provenance enough).
-- ---------------------------------------------------------------------------
create table ingest_event (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  source       data_source not null,
  payload      jsonb not null,
  status       text not null default 'received',  -- received | processed | error
  error        text,
  created_at   timestamptz not null default now()
);
create index ingest_event_user_created_idx on ingest_event (user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- v_training_timeline — the "is it working" rollup. A query, not a table.
-- One row per session-exercise with best-set estimated 1RM (Epley: w * (1 + reps/30)),
-- plus that day's body-comp and recovery context for fusion in the Today card.
-- ---------------------------------------------------------------------------
create view v_training_timeline
with (security_invoker = true) as
select
  ts.id            as session_id,
  ts.user_id,
  ts.date,
  ts.status,
  ts.source,
  ts.duration_min,
  ts.avg_hr,
  ts.calories,
  ee.id            as exercise_entry_id,
  ee.exercise_name,
  ee.order_index,
  best.top_set_load,
  best.top_set_reps,
  best.est_1rm,
  bm.weight_kg,
  bm.body_fat_pct,
  bm.lean_mass_kg,
  rd.readiness,
  rd.hrv,
  rd.sleep_score
from training_session ts
left join exercise_entry ee on ee.session_id = ts.id
left join lateral (
  -- best set per exercise by estimated 1RM
  select
    se.load                                as top_set_load,
    se.reps                                as top_set_reps,
    round(se.load * (1 + se.reps / 30.0), 1) as est_1rm
  from set_entry se
  where se.exercise_entry_id = ee.id
    and se.load is not null and se.reps is not null
  order by se.load * (1 + se.reps / 30.0) desc
  limit 1
) best on true
left join body_metric  bm on bm.user_id = ts.user_id and bm.date = ts.date
left join recovery_day rd on rd.user_id = ts.user_id and rd.date = ts.date;

-- ---------------------------------------------------------------------------
-- updated_at trigger for training_session
-- ---------------------------------------------------------------------------
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger training_session_set_updated_at
  before update on training_session
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security — every table scoped to auth.uid().
-- ---------------------------------------------------------------------------
alter table training_session enable row level security;
alter table exercise_entry   enable row level security;
alter table set_entry        enable row level security;
alter table body_metric      enable row level security;
alter table recovery_day     enable row level security;
alter table ingest_event     enable row level security;

create policy own_rows on training_session for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_rows on exercise_entry for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_rows on set_entry for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_rows on body_metric for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_rows on recovery_day for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_rows on ingest_event for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
