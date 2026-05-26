"use client";

import { useState } from "react";
import { Chat } from "./Chat";
import { History } from "./History";
import { Preview } from "./Preview";
import type { Curriculum } from "@/lib/schema";

type Snapshot = {
  id: string;
  content: unknown;
  message: string | null;
};

type MobilePane = "chat" | "preview";

export default function Customizer({
  projectId,
  projectTitle,
  userEmail,
  initialSnapshot,
}: {
  projectId: string;
  projectTitle: string;
  userEmail: string;
  initialSnapshot: Snapshot | null;
}) {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(initialSnapshot);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [mobilePane, setMobilePane] = useState<MobilePane>("chat");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);

  async function refreshSnapshot() {
    const res = await fetch(`/api/snapshot?projectId=${projectId}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = (await res.json()) as { snapshot: Snapshot | null };
      setSnapshot(data.snapshot);
      // When the agent applies a change, auto-switch to preview on mobile
      // so the teacher can see it.
      if (data.snapshot && data.snapshot.id !== snapshot?.id) {
        setMobilePane("preview");
      }
      // Tell the history drawer (if open) to re-fetch.
      setHistoryRefreshKey((k) => k + 1);
    }
  }

  async function onDownload() {
    setDownloading(true);
    setDownloadError(null);
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }
      const { url } = (await res.json()) as { url?: string };
      if (url) window.open(url, "_blank");
      else throw new Error("No download URL returned");
    } catch (err) {
      setDownloadError(err instanceof Error ? err.message : String(err));
    } finally {
      setDownloading(false);
    }
  }

  const curriculum = (snapshot?.content ?? null) as Curriculum | null;
  const hasEdits = snapshot !== null;

  return (
    <div className="flex h-[100dvh] flex-col bg-white">
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-gray-200 bg-bf-blue px-4 py-3 text-white sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="font-display text-2xl tracking-wide">BreakFree</span>
          <span className="text-bf-yellow">/</span>
          <span className="truncate text-sm opacity-90">{projectTitle}</span>
        </div>
        <div className="flex items-center gap-3 text-sm sm:gap-4">
          <button
            onClick={() => setHistoryOpen(true)}
            className="rounded-md border border-white/30 bg-white/10 px-3 py-1.5 font-medium text-white transition hover:bg-white/20"
          >
            History
          </button>
          <button
            onClick={onDownload}
            disabled={!hasEdits || downloading}
            className="rounded-md bg-bf-yellow px-3 py-1.5 font-medium text-bf-blue hover:opacity-90 disabled:opacity-40"
          >
            {downloading ? "Building…" : "Download"}
          </button>
          <span className="hidden truncate opacity-80 lg:inline">
            {userEmail}
          </span>
          <a href="/auth/signout" className="text-bf-yellow hover:underline">
            Sign out
          </a>
        </div>
      </header>

      {downloadError && (
        <div className="border-b border-bf-pink/40 bg-bf-pink/10 px-6 py-2 text-sm text-bf-pink">
          Download failed: {downloadError}
        </div>
      )}

      {/* Mobile tab toggle */}
      <div className="flex shrink-0 border-b border-gray-200 bg-gray-50 text-sm md:hidden">
        <button
          onClick={() => setMobilePane("chat")}
          className={`flex-1 px-4 py-2.5 font-medium transition ${
            mobilePane === "chat"
              ? "border-b-2 border-bf-blue text-bf-blue"
              : "text-gray-500"
          }`}
        >
          Chat
        </button>
        <button
          onClick={() => setMobilePane("preview")}
          className={`flex-1 px-4 py-2.5 font-medium transition ${
            mobilePane === "preview"
              ? "border-b-2 border-bf-blue text-bf-blue"
              : "text-gray-500"
          }`}
        >
          Preview
          {hasEdits && (
            <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-bf-yellow" />
          )}
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <div
          className={`${
            mobilePane === "chat" ? "flex" : "hidden"
          } min-h-0 flex-1 flex-col md:!flex`}
        >
          <Chat projectId={projectId} onTurnFinished={refreshSnapshot} />
        </div>
        <div
          className={`${
            mobilePane === "preview" ? "flex" : "hidden"
          } min-h-0 flex-1 flex-col md:!flex`}
        >
          <Preview curriculum={curriculum} />
        </div>
      </div>

      <History
        projectId={projectId}
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onJumped={refreshSnapshot}
        refreshSignal={historyRefreshKey}
      />
    </div>
  );
}
