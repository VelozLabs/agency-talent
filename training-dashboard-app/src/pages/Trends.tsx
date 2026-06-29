import { useBodyMetrics, useRecovery, useTimeline, useLiftSessionCount } from "@/lib/queries";
import { TrendChart } from "@/components/TrendChart";
import { ProgressionChart } from "@/components/ProgressionChart";

// "Is it working" — lead with what has history (body comp + recovery, backfilled),
// and frame lift progression as cold-start "collecting" rather than empty.
export function Trends() {
  const body = useBodyMetrics();
  const recovery = useRecovery();
  const timeline = useTimeline();
  const liftCount = useLiftSessionCount(timeline.data);

  const bm = body.data ?? [];
  const rd = recovery.data ?? [];

  return (
    <div className="space-y-4">
      <ProgressionChart rows={timeline.data ?? []} liftSessionCount={liftCount} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TrendChart
          title="Body weight"
          unit="kg"
          color="#5eb1ff"
          data={bm.map((d) => ({ date: d.date, value: d.weight_kg }))}
        />
        <TrendChart
          title="Body fat"
          unit="%"
          color="#f0b429"
          data={bm.map((d) => ({ date: d.date, value: d.body_fat_pct }))}
        />
        <TrendChart
          title="Lean mass"
          unit="kg"
          color="#4ade80"
          data={bm.map((d) => ({ date: d.date, value: d.lean_mass_kg }))}
        />
        <TrendChart
          title="Readiness"
          color="#a78bfa"
          data={rd.map((d) => ({ date: d.date, value: d.readiness }))}
        />
        <TrendChart
          title="HRV"
          unit="ms"
          color="#a78bfa"
          data={rd.map((d) => ({ date: d.date, value: d.hrv }))}
        />
        <TrendChart
          title="Sleep score"
          color="#a78bfa"
          data={rd.map((d) => ({ date: d.date, value: d.sleep_score }))}
        />
      </div>
    </div>
  );
}
