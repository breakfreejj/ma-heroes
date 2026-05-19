"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const supabase = createClient();
    const next =
      new URLSearchParams(window.location.search).get("next") ?? "/customize";
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (err) {
      setError(err.message);
      setStatus("error");
    } else {
      setStatus("sent");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bf-blue px-6 text-white">
      <h1
        className="font-display tracking-wide"
        style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
      >
        BreakFree
      </h1>
      <p className="mt-2 text-bf-yellow">Words Unlocked Customizer</p>

      <form
        onSubmit={onSubmit}
        className="mt-10 w-full max-w-sm rounded-xl bg-white/10 p-6 backdrop-blur"
      >
        <label className="block text-sm font-medium" htmlFor="email">
          Your email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="teacher@school.edu"
          disabled={status === "sending" || status === "sent"}
          className="mt-2 w-full rounded-md bg-white px-3 py-2 text-bf-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-bf-yellow disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="mt-4 w-full rounded-md bg-bf-yellow px-4 py-2 font-medium text-bf-blue hover:opacity-90 disabled:opacity-60"
        >
          {status === "sending"
            ? "Sending magic link…"
            : status === "sent"
              ? "Check your inbox"
              : "Email me a link"}
        </button>
        {status === "sent" && (
          <p className="mt-3 text-sm text-bf-yellow">
            We sent a sign-in link to <strong>{email}</strong>. Open it on this
            device to continue.
          </p>
        )}
        {error && <p className="mt-3 text-sm text-bf-pink">{error}</p>}
      </form>
    </main>
  );
}
