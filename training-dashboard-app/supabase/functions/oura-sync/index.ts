// oura-sync — pull Oura Cloud API v2 into recovery_day.
//   * Personal access token (no OAuth dance for a single user).
//   * mode: "backfill" with start/end for day-1 history; "incremental" for the last ~14 days.
//   * Idempotent: upsert on (user_id, date) — re-runs update, never duplicate (Backend Architect).
//   * No cron in v1 — this is invoked by the manual "Sync" button.

import { createClient } from "npm:@supabase/supabase-js@^2";

const OURA = "https://api.ouraring.com/v2/usercollection";

Deno.serve(async (req) => {
  const pat = Deno.env.get("OURA_PAT");
  if (!pat) return json({ error: "OURA_PAT not set" }, 500);

  // RLS-scoped client using the caller's JWT, so user_id resolves to the caller.
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } } },
  );
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth.user?.id;
  if (!userId) return json({ error: "not authenticated" }, 401);

  const body = await req.json().catch(() => ({}));
  const { start, end } = dateRange(body);

  // Oura day-keyed endpoints we care about for recovery_day.
  const [readiness, sleep] = await Promise.all([
    ouraGet(`${OURA}/daily_readiness?start_date=${start}&end_date=${end}`, pat),
    ouraGet(`${OURA}/daily_sleep?start_date=${start}&end_date=${end}`, pat),
  ]);

  // Stash raw payloads (JSON tier) so a parse can be cheaply re-run.
  await supabase.from("ingest_event").insert({
    user_id: userId,
    source: "oura",
    payload: { readiness, sleep },
    status: "received",
  });

  // Merge by date.
  const byDate = new Map<string, Record<string, unknown>>();
  for (const r of readiness.data ?? []) {
    byDate.set(r.day, {
      user_id: userId,
      date: r.day,
      readiness: r.score ?? null,
      hrv: r.contributors?.hrv_balance ?? null,
      resting_hr: r.contributors?.resting_heart_rate ?? null,
      temp_deviation: r.temperature_deviation ?? null,
      source: "oura",
    });
  }
  for (const s of sleep.data ?? []) {
    const row = byDate.get(s.day) ?? { user_id: userId, date: s.day, source: "oura" };
    row.sleep_score = s.score ?? null;
    byDate.set(s.day, row);
  }

  const rows = [...byDate.values()];
  if (rows.length) {
    const { error } = await supabase
      .from("recovery_day")
      .upsert(rows, { onConflict: "user_id,date" });
    if (error) return json({ error: error.message }, 500);
  }

  return json({ synced: rows.length, start, end }, 200);
});

function dateRange(body: { mode?: string; start?: string; end?: string }) {
  const today = new Date();
  const end = body.end ?? today.toISOString().slice(0, 10);
  if (body.mode === "backfill" && body.start) return { start: body.start, end };
  // incremental default: last 14 days.
  const start = body.start ?? new Date(today.getTime() - 14 * 864e5).toISOString().slice(0, 10);
  return { start, end };
}

async function ouraGet(url: string, pat: string) {
  const r = await fetch(url, { headers: { Authorization: `Bearer ${pat}` } });
  if (!r.ok) throw new Error(`Oura ${r.status}: ${await r.text()}`);
  return r.json();
}

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}
