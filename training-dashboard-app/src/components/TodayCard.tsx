import type { TimelineRow } from "@/types/db";

// Read-only fusion of all three sources for one selected session:
//   lift detail (Ladder) + physiology envelope (Apple Health) + recovery (Oura).
// Degrades gracefully to "no lift data yet" — it is NOT a mini-editor.
interface Props {
  rows: TimelineRow[]; // all rows for the selected session
}

function Stat({ label, value, suffix }: { label: string; value: string | number | null; suffix?: string }) {
  return (
    <div>
      <div className="stat-label">{label}</div>
      <div className="text-lg text-ink tabular-nums">
        {value == null ? <span className="text-faint">—</span> : value}
        {value != null && suffix ? <span className="text-faint text-sm"> {suffix}</span> : null}
      </div>
    </div>
  );
}

export function TodayCard({ rows }: Props) {
  if (rows.length === 0) {
    return <div className="panel p-6 text-muted text-sm">Select a session on the timeline.</div>;
  }
  const head = rows[0];
  const lifts = rows.filter((r) => r.exercise_name);
  const readinessNarrative =
    head.readiness != null && head.duration_min != null
      ? `Trained ${head.duration_min >= 45 ? "hard" : "light"} on a ${head.readiness} readiness day.`
      : null;

  return (
    <div className="panel p-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-ink text-sm uppercase tracking-wider">{head.date}</h2>
        <span className="text-[11px] text-faint uppercase">{head.status} · {head.source}</span>
      </div>

      {readinessNarrative && (
        <p className="mt-2 text-sm text-muted italic">{readinessNarrative}</p>
      )}

      {/* Physiology envelope (Apple Health) + recovery (Oura) */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <Stat label="Duration" value={head.duration_min} suffix="min" />
        <Stat label="Avg HR" value={head.avg_hr} suffix="bpm" />
        <Stat label="Calories" value={head.calories} suffix="kcal" />
        <Stat label="Readiness" value={head.readiness} />
        <Stat label="HRV" value={head.hrv} suffix="ms" />
        <Stat label="Sleep" value={head.sleep_score} />
      </div>

      {/* Lift detail (Ladder) — graceful empty state */}
      <div className="mt-5 border-t border-line pt-3">
        <div className="stat-label mb-2">Lifts</div>
        {lifts.length === 0 ? (
          <div className="text-sm text-faint">
            No lift data yet — upload the Ladder summary screenshot to log this session.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-faint text-[11px] uppercase">
                <th className="text-left font-normal pb-1">Exercise</th>
                <th className="text-right font-normal pb-1">Top set</th>
                <th className="text-right font-normal pb-1">est 1RM</th>
              </tr>
            </thead>
            <tbody>
              {lifts.map((r) => (
                <tr key={r.exercise_entry_id} className="border-t border-line/50">
                  <td className="py-1 text-ink">{r.exercise_name}</td>
                  <td className="py-1 text-right tabular-nums text-muted">
                    {r.top_set_load != null ? `${r.top_set_load} × ${r.top_set_reps}` : "—"}
                  </td>
                  <td className="py-1 text-right tabular-nums text-actual">
                    {r.est_1rm ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
