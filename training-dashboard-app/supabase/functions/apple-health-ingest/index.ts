// apple-health-ingest — receives scheduled JSON POSTs from the Health Auto Export
// phone app (no cloud API exists for Apple Health). Secured by a shared bearer secret,
// not Supabase JWT (the phone app can't mint one) — config.toml sets verify_jwt = false.
//
//   * Body weight + body fat % (smart scale) → body_metric  (upsert on user_id,date)
//   * Workout envelope (duration / avg HR / calories)        → training_session (actual)
//   * Idempotent everywhere; raw payload stashed in ingest_event for cheap re-parse.
//
// Health Auto Export "JSON (Aggregated)" shape is assumed; adjust field paths to match
// your export template. USER_ID is configured as a secret (single user).

import { createClient } from "npm:@supabase/supabase-js@^2";

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("method not allowed", { status: 405 });

  const expected = Deno.env.get("APPLE_HEALTH_TOKEN");
  const got = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!expected || got !== expected) return json({ error: "unauthorized" }, 401);

  const userId = Deno.env.get("APPLE_HEALTH_USER_ID");
  if (!userId) return json({ error: "APPLE_HEALTH_USER_ID not set" }, 500);

  // Service-role client: the phone POST has no user JWT, so we write on the user's
  // behalf with an explicit user_id (single-user tool).
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const payload = await req.json().catch(() => null);
  if (!payload) return json({ error: "invalid JSON" }, 400);

  await supabase.from("ingest_event").insert({
    user_id: userId,
    source: "apple_health",
    payload,
    status: "received",
  });

  const metrics: any[] = payload?.data?.metrics ?? [];
  const workouts: any[] = payload?.data?.workouts ?? [];

  // ---- body_metric (one row per date, merged across metric series) ----
  const body = new Map<string, Record<string, unknown>>();
  const put = (date: string, field: string, value: number) => {
    const row = body.get(date) ?? { user_id: userId, date, source: "apple_health" };
    row[field] = value;
    body.set(date, row);
  };
  for (const m of metrics) {
    const field =
      m.name === "weight_body_mass" ? "weight_kg"
      : m.name === "body_fat_percentage" ? "body_fat_pct"
      : m.name === "lean_body_mass" ? "lean_mass_kg"
      : null;
    if (!field) continue;
    for (const d of m.data ?? []) {
      const date = String(d.date).slice(0, 10);
      if (typeof d.qty === "number") put(date, field, d.qty);
    }
  }
  if (body.size) {
    const { error } = await supabase
      .from("body_metric")
      .upsert([...body.values()], { onConflict: "user_id,date" });
    if (error) return json({ error: error.message }, 500);
  }

  // ---- training_session envelope (actual; source apple_health) ----
  const sessions = workouts.map((w) => ({
    user_id: userId,
    date: String(w.start ?? w.date).slice(0, 10),
    status: "actual",
    source: "apple_health",
    duration_min: w.duration != null ? Math.round(Number(w.duration) / 60) : null,
    avg_hr: w.avgHeartRate?.qty != null ? Math.round(w.avgHeartRate.qty) : null,
    calories: w.activeEnergyBurned?.qty != null ? Math.round(w.activeEnergyBurned.qty) : null,
  }));
  if (sessions.length) {
    const { error } = await supabase
      .from("training_session")
      .upsert(sessions, { onConflict: "user_id,date,source" });
    if (error) return json({ error: error.message }, 500);
  }

  return json({ body_metrics: body.size, sessions: sessions.length }, 200);
});

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}
