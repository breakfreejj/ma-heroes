"use client";

import { useEffect, useState } from "react";
import { Chat } from "./Chat";
import { Preview } from "./Preview";
import type { Curriculum } from "@/lib/schema";

type Snapshot = {
  id: string;
  content: unknown;
  message: string | null;
};

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

  async function refreshSnapshot() {
    const res = await fetch(`/api/snapshot?projectId=${projectId}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = (await res.json()) as { snapshot: Snapshot | null };
      setSnapshot(data.snapshot);
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
    <div className="flex h-screen flex-col bg-white">
      <header className="flex items-center justify-between gap-4 border-b border-gray-200 bg-bf-blue px-6 py-3 text-white">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl tracking-wide">BreakFree</span>
          <span className="text-bf-yellow">/</span>
          <span className="text-sm opacity-90">{projectTitle}</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={onDownload}
            disabled={!hasEdits || downloading}
            className="rounded-md bg-bf-yellow px-3 py-1.5 font-medium text-bf-blue hover:opacity-90 disabled:opacity-40"
          >
            {downloading ? "Building bundle…" : "Download bundle"}
          </button>
          <span className="opacity-80">{userEmail}</span>
          <a
            href="/auth/signout"
            className="text-bf-yellow hover:underline"
          >
            Sign out
          </a>
        </div>
      </header>
      {downloadError && (
        <div className="border-b border-bf-pink/40 bg-bf-pink/10 px-6 py-2 text-sm text-bf-pink">
          Download failed: {downloadError}
        </div>
      )}
      <div className="grid flex-1 grid-cols-1 overflow-hidden md:grid-cols-2">
        <Chat projectId={projectId} onTurnFinished={refreshSnapshot} />
        <Preview curriculum={curriculum} />
      </div>
    </div>
  );
}
