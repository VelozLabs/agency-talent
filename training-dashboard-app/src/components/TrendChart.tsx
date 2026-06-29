import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
  title: string;
  data: { date: string; value: number | null }[];
  color?: string;
  unit?: string;
}

// Generic trend sparkline for body-comp / recovery series (populated from backfill).
export function TrendChart({ title, data, color = "#5eb1ff", unit }: Props) {
  const points = data.filter((d) => d.value != null);
  return (
    <div className="panel p-3">
      <div className="stat-label mb-2">
        {title}
        {unit ? <span className="text-faint"> ({unit})</span> : null}
      </div>
      {points.length === 0 ? (
        <div className="h-24 flex items-center text-xs text-faint">no data yet</div>
      ) : (
        <ResponsiveContainer width="100%" height={96}>
          <LineChart data={points} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <XAxis dataKey="date" hide />
            <YAxis tick={{ fill: "#5a6677", fontSize: 10 }} width={32} domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{ background: "#161b27", border: "1px solid #222a39", fontSize: 12 }}
              labelStyle={{ color: "#8b97a8" }}
            />
            <Line type="monotone" dataKey="value" stroke={color} dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
