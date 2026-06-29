import type { TimelineRow } from "@/types/db";

// The spine. One time axis: past `actual` solid, future `planned` ghosted.
// Selecting a session drills into the Today card (handled by the parent).
interface Props {
  rows: TimelineRow[];
  selectedId: string | null;
  onSelect: (sessionId: string) => void;
}

function groupBySession(rows: TimelineRow[]) {
  const map = new Map<string, { row: TimelineRow; exercises: number }>();
  for (const r of rows) {
    const cur = map.get(r.session_id);
    if (!cur) map.set(r.session_id, { row: r, exercises: r.exercise_entry_id ? 1 : 0 });
    else if (r.exercise_entry_id) cur.exercises += 1;
  }
  return [...map.values()].sort((a, b) => a.row.date.localeCompare(b.row.date));
}

export function Timeline({ rows, selectedId, onSelect }: Props) {
  const sessions = groupBySession(rows);
  const today = new Date().toISOString().slice(0, 10);

  if (sessions.length === 0) {
    return (
      <div className="panel p-6 text-muted text-sm">
        No sessions yet. Sync Oura / Apple Health, or upload a Ladder screenshot to begin.
      </div>
    );
  }

  return (
    <div className="panel p-3 overflow-x-auto">
      <div className="flex gap-2 min-w-max">
        {sessions.map(({ row, exercises }) => {
          const future = row.date > today;
          const selected = row.session_id === selectedId;
          return (
            <button
              key={row.session_id}
              onClick={() => onSelect(row.session_id)}
              className={[
                "w-32 shrink-0 text-left rounded border px-3 py-2 transition-colors",
                selected ? "border-accent bg-panel-2" : "border-line hover:border-faint",
                future ? "opacity-60" : "",
              ].join(" ")}
            >
              <div className="stat-label">{row.date}</div>
              <div
                className={[
                  "mt-1 h-1 w-full rounded",
                  future ? "bg-planned" : "bg-actual",
                ].join(" ")}
              />
              <div className="mt-2 text-xs text-ink truncate">
                {exercises > 0 ? `${exercises} exercise${exercises > 1 ? "s" : ""}` : "envelope only"}
              </div>
              {row.readiness != null && (
                <div className="text-[11px] text-muted">readiness {row.readiness}</div>
              )}
              <div className="text-[10px] text-faint uppercase mt-1">
                {future ? "planned" : row.status}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
