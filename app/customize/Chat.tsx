"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

export function Chat({
  projectId,
  onTurnFinished,
}: {
  projectId: string;
  onTurnFinished: () => void | Promise<void>;
}) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { projectId },
    }),
    onFinish: () => {
      void onTurnFinished();
    },
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || status === "streaming" || status === "submitted") return;
    const text = input;
    setInput("");
    await sendMessage({ text });
  }

  return (
    <section className="flex h-full flex-col border-r border-gray-200">
      <div className="border-b border-gray-200 bg-gray-50 px-5 py-3">
        <h2 className="text-sm font-semibold text-bf-charcoal">
          Customize with the agent
        </h2>
        <p className="mt-0.5 text-xs text-gray-500">
          Try: &ldquo;Swap the poem in Lesson 2 for something about resilience&rdquo; ·
          &ldquo;Compress Lesson 6 to 30 minutes&rdquo; · &ldquo;Rewrite the
          Lesson 3 Do Now to mention basketball&rdquo;
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
      >
        {messages.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
            Start by telling the agent what you&apos;d like to change about the
            Words Unlocked unit.
          </div>
        )}
        {messages.map((m) => (
          <MessageRow key={m.id} message={m} />
        ))}
        {(status === "streaming" || status === "submitted") &&
          messages[messages.length - 1]?.role !== "assistant" && (
            <div className="text-sm text-gray-400">Agent is thinking…</div>
          )}
        {error && (
          <div className="rounded-md border border-bf-pink/40 bg-bf-pink/10 p-3 text-sm text-bf-pink">
            Something went wrong: {String(error.message ?? error)}
          </div>
        )}
      </div>

      <form
        onSubmit={onSubmit}
        className="flex items-end gap-2 border-t border-gray-200 bg-white p-4"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void onSubmit(e);
            }
          }}
          placeholder="Tell the agent what to change…"
          rows={2}
          className="flex-1 resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bf-blue"
        />
        <button
          type="submit"
          disabled={!input.trim() || status === "streaming" || status === "submitted"}
          className="rounded-md bg-bf-blue px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </section>
  );
}

function MessageRow({ message }: { message: { id: string; role: string; parts?: Array<{ type: string; text?: string }> } }) {
  const isUser = message.role === "user";
  const text =
    message.parts
      ?.filter((p) => p.type === "text")
      .map((p) => p.text ?? "")
      .join("\n\n") ?? "";

  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div
        className={
          isUser
            ? "max-w-[85%] rounded-2xl bg-bf-blue px-4 py-2 text-sm whitespace-pre-wrap text-white"
            : "max-w-[85%] space-y-2 text-sm text-bf-charcoal"
        }
      >
        {text && (isUser ? (
          <div className="whitespace-pre-wrap">{text}</div>
        ) : (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="my-2 first:mt-0 last:mb-0 leading-relaxed">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="my-2 list-disc space-y-1 pl-5">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="my-2 list-decimal space-y-1 pl-5">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-bf-charcoal">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic">{children}</em>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bf-blue underline hover:opacity-80"
                  >
                    {children}
                  </a>
                ),
                code: ({ children }) => (
                  <code className="rounded bg-gray-100 px-1 py-0.5 text-[0.9em] font-mono">
                    {children}
                  </code>
                ),
                h1: ({ children }) => (
                  <h3 className="mt-3 mb-1 font-semibold text-bf-charcoal">
                    {children}
                  </h3>
                ),
                h2: ({ children }) => (
                  <h3 className="mt-3 mb-1 font-semibold text-bf-charcoal">
                    {children}
                  </h3>
                ),
                h3: ({ children }) => (
                  <h3 className="mt-3 mb-1 font-semibold text-bf-charcoal">
                    {children}
                  </h3>
                ),
              }}
            >
              {text}
            </ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
}
