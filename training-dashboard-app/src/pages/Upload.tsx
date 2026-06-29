import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { ScreenshotReview } from "@/components/ScreenshotReview";
import type { ParsedExercise } from "@/types/db";

type Stage = "pick" | "parsing" | "review" | "saving" | "done";

// Screenshot → parse (Edge Function) → review/confirm → save as `actual`.
// Re-confirming an existing session overwrites its child rows server-side
// (single transaction) — the review UI never appends duplicates.
export function Upload() {
  const qc = useQueryClient();
  const [stage, setStage] = useState<Stage>("pick");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [draft, setDraft] = useState<ParsedExercise[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setStage("parsing");
    try {
      const b64 = await fileToBase64(file);
      const { data, error } = await supabase.functions.invoke("parse-screenshot", {
        body: { image_base64: b64, media_type: file.type },
      });
      if (error) throw error;
      setDraft((data as { exercises: ParsedExercise[] }).exercises);
      setStage("review");
    } catch (e) {
      setError(String(e));
      setStage("pick");
    }
  }

  async function handleConfirm(corrected: ParsedExercise[]) {
    setStage("saving");
    try {
      // Atomic overwrite via the save_ladder_session RPC (single transaction).
      const { error } = await supabase.rpc("save_ladder_session", {
        p_date: date,
        p_status: "actual",
        p_source: "ladder_screenshot",
        p_exercises: corrected,
      });
      if (error) throw error;
      await qc.invalidateQueries();
      setStage("done");
    } catch (e) {
      setError(String(e));
      setStage("review");
    }
  }

  return (
    <div className="max-w-2xl space-y-4">
      <div className="panel p-4">
        <div className="stat-label mb-2">Log a Ladder session</div>
        <p className="text-sm text-muted mb-3">
          Screenshot the Ladder summary, then upload it. The parser drafts the sets; you
          confirm before it's saved. (Scaffolding — retired when Ladder is dropped.)
        </p>
        <label className="text-xs text-faint block mb-3">
          Session date{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-panel-2 border border-line rounded px-2 py-1 text-ink ml-1"
          />
        </label>

        {stage === "pick" && (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="text-sm text-muted"
          />
        )}
        {stage === "parsing" && <div className="text-sm text-accent">Parsing screenshot…</div>}
        {stage === "saving" && <div className="text-sm text-accent">Saving…</div>}
        {stage === "done" && (
          <div className="text-sm text-actual">
            Saved. <button className="underline" onClick={() => setStage("pick")}>Log another</button>
          </div>
        )}
        {error && <div className="text-sm text-danger mt-2">{error}</div>}
      </div>

      {stage === "review" && (
        <ScreenshotReview
          draft={draft}
          onConfirm={handleConfirm}
          onCancel={() => setStage("pick")}
        />
      )}
    </div>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
