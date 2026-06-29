import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anon) {
  // Fail loud in dev rather than silently no-op against an undefined backend.
  console.warn(
    "[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY missing — copy .env.example to .env",
  );
}

export const supabase = createClient(url ?? "", anon ?? "");
