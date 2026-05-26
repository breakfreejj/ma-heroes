"use client";

import { useEffect, useState } from "react";

type SnapshotRow = {
  id: string;
  parent_id: string | null;
  created_by: "user" | "agent" | "seed";
  message: string | null;
  created_at: string;
};

type HistoryResponse = {
  current_snapshot_id: string | null;
  snapshots: SnapshotRow[];
};

export function History({
  projectId,
  open,
  onClose,
  onJumped,
  refreshSignal,
}: {
  projectId: string;
  open: boolean;
  onClose: () => void;
  onJumped: () => void | Promise<void>;
  /** Bumped by the parent whenever a new snapshot might exist (e.g. after a chat turn). */
  refreshSignal: number;
}) {
  const [data, setData] = useState<HistoryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [jumpingTo, setJumpingTo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`/api/snapshots?projectId=${projectId}`, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json() as Promise<HistoryResponse>;
      })
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message ?? String(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open, projectId, refreshSignal]);

  async function onJump(snapshotId: string) {
    setJumpingTo(snapshotId);
    setError(null);
    try {
      const res = await fetch("/api/snapshot/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, snapshotId }),
      });
      if (!res.ok) throw new Error(await res.text());
      await onJumped();
      setData((prev) =>
        prev ? { ...prev, current_snapshot_id: snapshotId } : prev,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setJumpingTo(null);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close history"
        onClick={onClose}
        className="flex-1 bg-black/30 backdrop-blur-[1px]"
      />
      {/* Drawer */}
      <aside className="flex w-full max-w-md flex-col border-l border-gray-200 bg-white shadow-xl">
        <header className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-5 py-3">
          <div>
            <h2 className="text-sm font-semibold text-bf-charcoal">History</h2>
            <p className="mt-0.5 text-xs text-gray-500">
              Every edit is saved. Jump back to any prior version.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-200 hover:text-bf-charcoal"
            aria-label="Close"
          >
            Close
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-3 py-3">
          {loading && (
            <div className="px-3 py-6 text-center text-sm text-gray-500">
              Loading history…
            </div>
          )}
          {error && (
            <div className="m-2 rounded-md border border-bf-pink/40 bg-bf-pink/10 p-3 text-sm text-bf-pink">
              {error}
            </div>
          )}
          {!loading && data && data.snapshots.length === 0 && (
            <div className="px-3 py-6 text-center text-sm text-gray-500">
              No history yet. Start a conversation with the agent and your
              edits will land here.
            </div>
          )}
          {!loading && data && (
            <ul className="space-y-2">
              {data.snapshots.map((s) => {
                const isCurrent = s.id === data.current_snapshot_id;
                const isSeed = s.created_by === "seed";
                return (
                  <li
                    key={s.id}
                    className={`rounded-md border p-3 transition ${
                      isCurrent
                        ? "border-bf-blue bg-bf-blue/5"
                        : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-xs">
                          <span
                            className={`rounded-full px-2 py-0.5 font-medium ${
                              isSeed
                                ? "bg-bf-green/20 text-bf-charcoal"
                                : s.created_by === "agent"
                                  ? "bg-bf-yellow/20 text-bf-charcoal"
                                  : "bg-gray-100 text-bf-charcoal"
                            }`}
                          >
                            {isSeed
                              ? "Original"
                              : s.created_by === "agent"
                                ? "Agent edit"
                                : "Manual"}
                          </span>
                          {isCurrent && (
                            <span className="rounded-full bg-bf-blue px-2 py-0.5 font-medium text-white">
                              Current
                            </span>
                          )}
                          <span className="text-gray-400">
                            {new Date(s.created_at).toLocaleString()}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm text-bf-charcoal">
                          {s.message ??
                            (isSeed
                              ? "Base Words Unlocked 2026 curriculum"
                              : "(no description)")}
                        </p>
                      </div>
                      <button
                        onClick={() => onJump(s.id)}
                        disabled={isCurrent || jumpingTo !== null}
                        className="shrink-0 rounded-md border border-bf-blue px-3 py-1 text-xs font-medium text-bf-blue transition hover:bg-bf-blue hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-bf-blue"
                      >
                        {jumpingTo === s.id
                          ? "Jumping…"
                          : isCurrent
                            ? "Current"
                            : "Jump here"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <footer className="border-t border-gray-200 bg-gray-50 px-5 py-3 text-xs text-gray-500">
          Jumping back doesn&apos;t delete later edits — they stay in history.
          Any new edit from the point you jump to creates a new branch.
        </footer>
      </aside>
    </div>
  );
}
