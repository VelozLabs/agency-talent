import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { TimelineRow } from "@/types/db";

interface Props {
  rows: TimelineRow[];
  liftSessionCount: number;
}

// Estimated-1RM progression per lift. Cold-start: lift data is empty for weeks,
// so instead of a blank chart we show "collecting — N sessions logged" with a CTA.
export function ProgressionChart({ rows, liftSessionCount }: Props) {
  const lifts = rows.filter((r) => r.exercise_name && r.est_1rm != null);

  if (lifts.length === 0) {
    return (
      <div className="panel p-4">
        <div className="stat-label mb-2">Lift progression</div>
        <div className="text-sm text-muted">
          Collecting — <span className="text-ink tabular-nums">{liftSessionCount}</span>{" "}
          session{liftSessionCount === 1 ? "" : "s"} logged.
        </div>
        <div className="mt-2 text-xs text-faint">
          Progression charts fill in as Ladder screenshots accumulate. Upload a session
          summary to add the first data point.
        </div>
      </div>
    );
  }

  // Pick the most-logged exercise to chart first.
  const byName = new Map<string, { date: string; value: number }[]>();
  for (const r of lifts) {
    const arr = byName.get(r.exercise_name!) ?? [];
    arr.push({ date: r.date, value: r.est_1rm! });
    byName.set(r.exercise_name!, arr);
  }
  const [name, series] = [...byName.entries()].sort((a, b) => b[1].length - a[1].length)[0];

  return (
    <div className="panel p-3">
      <div className="stat-label mb-2">
        Lift progression · <span className="text-ink">{name}</span> (est 1RM)
      </div>
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={series} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <XAxis dataKey="date" tick={{ fill: "#5a6677", fontSize: 10 }} />
          <YAxis tick={{ fill: "#5a6677", fontSize: 10 }} width={32} domain={["auto", "auto"]} />
          <Tooltip
            contentStyle={{ background: "#161b27", border: "1px solid #222a39", fontSize: 12 }}
            labelStyle={{ color: "#8b97a8" }}
          />
          <Line type="monotone" dataKey="value" stroke="#4ade80" dot={{ r: 2 }} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
