import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useTimeline } from "@/lib/queries";
import { Timeline } from "@/components/Timeline";
import { TodayCard } from "@/components/TodayCard";

// The Timeline is the persistent home; the Today card is a drill-down from it.
export function Home() {
  const qc = useQueryClient();
  const { data, isLoading, error } = useTimeline();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  const rows = data ?? [];
  // Default selection: latest non-future session.
  const today = new Date().toISOString().slice(0, 10);
  const effectiveId =
    selectedId ??
    [...rows].reverse().find((r) => r.date <= today)?.session_id ??
    rows[0]?.session_id ??
    null;
  const selectedRows = rows.filter((r) => r.session_id === effectiveId);

  async function sync() {
    setSyncing(true);
    try {
      await supabase.functions.invoke("oura-sync", { body: { mode: "incremental" } });
      await qc.invalidateQueries();
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-sm uppercase tracking-widest text-muted">Timeline</h1>
        <button
          onClick={sync}
          disabled={syncing}
          className="text-xs border border-line rounded px-3 py-1 text-muted hover:border-faint disabled:opacity-50"
        >
          {syncing ? "Syncing…" : "Sync Oura"}
        </button>
      </div>

      {isLoading && <div className="text-muted text-sm">Loading timeline…</div>}
      {error && <div className="text-danger text-sm">{String(error)}</div>}

      {!isLoading && !error && (
        <>
          <Timeline rows={rows} selectedId={effectiveId} onSelect={setSelectedId} />
          <TodayCard rows={selectedRows} />
        </>
      )}
    </div>
  );
}
