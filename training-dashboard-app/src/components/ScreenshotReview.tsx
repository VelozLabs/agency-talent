import { useState } from "react";
import type { ParsedExercise } from "@/types/db";

// Human-in-the-loop confirm step: the parse-screenshot function returns a draft;
// the user corrects the table and confirms. The review step IS the accuracy
// guarantee (no confidence scoring / retry layer). A plain confirm — no diffing.
interface Props {
  draft: ParsedExercise[];
  onConfirm: (corrected: ParsedExercise[]) => void;
  onCancel: () => void;
}

export function ScreenshotReview({ draft, onConfirm, onCancel }: Props) {
  const [exercises, setExercises] = useState<ParsedExercise[]>(draft);

  function updateSet(ei: number, si: number, field: "reps" | "load" | "rpe", raw: string) {
    const v = raw === "" ? null : Number(raw);
    setExercises((prev) =>
      prev.map((ex, i) =>
        i !== ei
          ? ex
          : { ...ex, sets: ex.sets.map((s, j) => (j === si ? { ...s, [field]: v } : s)) },
      ),
    );
  }

  function updateName(ei: number, name: string) {
    setExercises((prev) => prev.map((ex, i) => (i === ei ? { ...ex, exercise: name } : ex)));
  }

  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm uppercase tracking-wider text-ink">Review parsed session</h3>
        <span className="text-[11px] text-faint">correct any misreads before saving</span>
      </div>

      <div className="space-y-4">
        {exercises.map((ex, ei) => (
          <div key={ei} className="border border-line rounded p-2">
            <input
              value={ex.exercise}
              onChange={(e) => updateName(ei, e.target.value)}
              className="bg-panel-2 border border-line rounded px-2 py-1 text-sm text-ink w-full mb-2"
            />
            <table className="w-full text-sm">
              <thead>
                <tr className="text-faint text-[11px] uppercase">
                  <th className="text-left font-normal">Set</th>
                  <th className="text-left font-normal">Reps</th>
                  <th className="text-left font-normal">Load</th>
                  <th className="text-left font-normal">RPE</th>
                </tr>
              </thead>
              <tbody>
                {ex.sets.map((s, si) => (
                  <tr key={si}>
                    <td className="py-1 text-faint tabular-nums">{si + 1}</td>
                    {(["reps", "load", "rpe"] as const).map((f) => (
                      <td key={f} className="py-1 pr-2">
                        <input
                          type="number"
                          value={s[f] ?? ""}
                          onChange={(e) => updateSet(ei, si, f, e.target.value)}
                          className="bg-panel-2 border border-line rounded px-2 py-0.5 w-20 text-ink tabular-nums"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onConfirm(exercises)}
          className="bg-actual/20 border border-actual text-actual rounded px-3 py-1 text-sm hover:bg-actual/30"
        >
          Confirm &amp; save
        </button>
        <button
          onClick={onCancel}
          className="border border-line text-muted rounded px-3 py-1 text-sm hover:border-faint"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
