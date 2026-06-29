import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabase";
import type { BodyMetric, RecoveryDay, TimelineRow } from "@/types/db";

// The Timeline spine: sessions (with rollup context) ordered by date.
export function useTimeline() {
  return useQuery({
    queryKey: ["timeline"],
    queryFn: async (): Promise<TimelineRow[]> => {
      const { data, error } = await supabase
        .from("v_training_timeline")
        .select("*")
        .order("date", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useBodyMetrics() {
  return useQuery({
    queryKey: ["body_metric"],
    queryFn: async (): Promise<BodyMetric[]> => {
      const { data, error } = await supabase
        .from("body_metric")
        .select("*")
        .order("date", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useRecovery() {
  return useQuery({
    queryKey: ["recovery_day"],
    queryFn: async (): Promise<RecoveryDay[]> => {
      const { data, error } = await supabase
        .from("recovery_day")
        .select("*")
        .order("date", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
}

// Count of distinct logged lift sessions — drives the cold-start
// "collecting — N sessions logged" framing instead of a blank chart.
export function useLiftSessionCount(timeline: TimelineRow[] | undefined): number {
  if (!timeline) return 0;
  const withLifts = new Set(
    timeline.filter((r) => r.exercise_entry_id).map((r) => r.session_id),
  );
  return withLifts.size;
}
