// Mirrors supabase/migrations/0001_init.sql. Hand-maintained for v1; swap for
// `supabase gen types typescript` once the schema settles.

export type SessionStatus = "planned" | "actual" | "both";
export type DataSource = "ladder_screenshot" | "apple_health" | "oura" | "manual";

export interface TrainingSession {
  id: string;
  user_id: string;
  date: string; // YYYY-MM-DD
  status: SessionStatus;
  source: DataSource;
  duration_min: number | null;
  avg_hr: number | null;
  calories: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExerciseEntry {
  id: string;
  user_id: string;
  session_id: string;
  exercise_name: string;
  order_index: number;
}

export interface SetEntry {
  id: string;
  user_id: string;
  exercise_entry_id: string;
  set_number: number;
  reps: number | null;
  load: number | null;
  rpe: number | null;
}

export interface BodyMetric {
  id: string;
  user_id: string;
  date: string;
  weight_kg: number | null;
  body_fat_pct: number | null;
  lean_mass_kg: number | null;
  source: DataSource;
}

export interface RecoveryDay {
  id: string;
  user_id: string;
  date: string;
  readiness: number | null;
  hrv: number | null;
  sleep_score: number | null;
  resting_hr: number | null;
  temp_deviation: number | null;
  total_sleep_min: number | null;
  source: DataSource;
}

// One row of v_training_timeline (the "is it working" rollup).
export interface TimelineRow {
  session_id: string;
  user_id: string;
  date: string;
  status: SessionStatus;
  source: DataSource;
  duration_min: number | null;
  avg_hr: number | null;
  calories: number | null;
  exercise_entry_id: string | null;
  exercise_name: string | null;
  order_index: number | null;
  top_set_load: number | null;
  top_set_reps: number | null;
  est_1rm: number | null;
  weight_kg: number | null;
  body_fat_pct: number | null;
  lean_mass_kg: number | null;
  readiness: number | null;
  hrv: number | null;
  sleep_score: number | null;
}

// Shape the parse-screenshot Edge Function returns / the review UI edits.
export interface ParsedExercise {
  exercise: string;
  sets: { reps: number | null; load: number | null; rpe: number | null }[];
}
