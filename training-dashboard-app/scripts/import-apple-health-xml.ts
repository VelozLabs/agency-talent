// One-time backfill of body_metric history from an Apple Health export.xml.
//
//   npm run import:apple-health -- ./export.xml
//
// Apple Health has no cloud API; the ongoing bridge is the apple-health-ingest
// Edge Function (phone relay). This script seeds the historical scale data once.
// Run locally with the service-role key (server-side; never ship it to the client).
//
// Env required: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, APPLE_HEALTH_USER_ID

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const file = process.argv[2];
if (!file) {
  console.error("usage: npm run import:apple-health -- ./export.xml");
  process.exit(1);
}

const url = requireEnv("SUPABASE_URL");
const serviceKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
const userId = requireEnv("APPLE_HEALTH_USER_ID");

const TYPE_FIELD: Record<string, "weight_kg" | "body_fat_pct" | "lean_mass_kg"> = {
  HKQuantityTypeIdentifierBodyMass: "weight_kg",
  HKQuantityTypeIdentifierBodyFatPercentage: "body_fat_pct",
  HKQuantityTypeIdentifierLeanBodyMass: "lean_mass_kg",
};

const xml = readFileSync(file, "utf8");

// One <Record .../> per measurement. Regex scan is fine for a one-time single-user
// import and avoids pulling in a streaming XML dependency.
const recordRe = /<Record\b[^>]*\btype="([^"]+)"[^>]*\bstartDate="([^"]+)"[^>]*\bvalue="([^"]+)"[^>]*\/?>/g;

const byDate = new Map<string, Record<string, unknown>>();
let count = 0;
for (const m of xml.matchAll(recordRe)) {
  const field = TYPE_FIELD[m[1]];
  if (!field) continue;
  const date = m[2].slice(0, 10); // "YYYY-MM-DD HH:MM..." → date
  let value = Number(m[3]);
  if (Number.isNaN(value)) continue;
  if (field === "body_fat_pct" && value <= 1) value = value * 100; // Apple stores as fraction
  const row = byDate.get(date) ?? { user_id: userId, date, source: "apple_health" };
  row[field] = value; // last write per date wins
  byDate.set(date, row);
  count++;
}

const rows = [...byDate.values()];
console.log(`parsed ${count} records → ${rows.length} dated body_metric rows`);

const supabase = createClient(url, serviceKey);
// Chunk to stay well under request limits.
for (let i = 0; i < rows.length; i += 500) {
  const chunk = rows.slice(i, i + 500);
  const { error } = await supabase
    .from("body_metric")
    .upsert(chunk, { onConflict: "user_id,date" });
  if (error) {
    console.error("upsert failed:", error.message);
    process.exit(1);
  }
  console.log(`upserted ${Math.min(i + 500, rows.length)}/${rows.length}`);
}
console.log("done.");

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) {
    console.error(`missing env: ${name}`);
    process.exit(1);
  }
  return v;
}
