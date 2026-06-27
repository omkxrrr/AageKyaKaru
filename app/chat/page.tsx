"use client";

import { Bot, Loader2, Send, Sparkles, UserRound } from "lucide-react";
import { FormEvent, useMemo, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starters = [
  "What are the best CS options after 12th Science?",
  "Compare Pune and Mumbai for higher education",
  "How should I choose direct second-year admission after diploma?",
  "How can I shortlist engineering colleges on a low budget?"
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi, I am AageKyaKaru AI. Tell me your current stage, marks, budget, preferred city, and interests. I will suggest clear next steps."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  const sendMessage = async (content: string) => {
    const trimmed = content.trim();

    if (!trimmed || isLoading) {
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages })
      });
      const data = await response.json();

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: response.ok ? data.message : data.error ?? "AI service is unavailable."
        }
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "A network issue occurred. Check the dev server and API key."
        }
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <main className="min-h-screen bg-ink text-white">
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[360px_1fr]">
        <aside className="rounded-lg border border-white/12 bg-white/8 p-5 backdrop-blur">
          <div className="flex h-12 w-12 items-center justify-center rounded bg-saffron text-ink">
            <Sparkles size={24} />
          </div>
          <h1 className="mt-5 text-3xl font-black">AI Guidance Chat</h1>
          <p className="mt-3 text-sm leading-6 text-white/70">
            Smart guidance for streams, courses, colleges, cities, fees, hostels, entrance exams, and career decisions.
          </p>
          <div className="mt-6 grid gap-3">
            {starters.map((starter) => (
              <button
                key={starter}
                type="button"
                className="rounded border border-white/12 bg-white/8 px-3 py-3 text-left text-sm font-semibold text-white/82 transition hover:border-saffron/70 hover:bg-white/14"
                onClick={() => void sendMessage(starter)}
              >
                {starter}
              </button>
            ))}
          </div>
        </aside>

        <section className="flex min-h-[720px] flex-col overflow-hidden rounded-lg border border-white/12 bg-paper text-ink shadow-soft">
          <div className="border-b border-ink/10 bg-white px-5 py-4">
            <p className="text-sm font-bold uppercase text-leaf">Student assistant</p>
            <h2 className="text-xl font-black">Ask anything about your next step</h2>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" ? (
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded bg-leaf text-white">
                    <Bot size={18} />
                  </span>
                ) : null}
                <div
                  className={`max-w-[760px] whitespace-pre-wrap rounded-lg px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "bg-ink text-white"
                      : "border border-ink/10 bg-white text-ink shadow-soft"
                  }`}
                >
                  {message.content}
                </div>
                {message.role === "user" ? (
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded bg-saffron text-ink">
                    <UserRound size={18} />
                  </span>
                ) : null}
              </div>
            ))}
            {isLoading ? (
              <div className="flex items-center gap-3 text-sm font-bold text-ink/60">
                <Loader2 size={18} className="animate-spin" />
                Thinking...
              </div>
            ) : null}
          </div>

          <form onSubmit={onSubmit} className="border-t border-ink/10 bg-white p-4">
            <div className="flex gap-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="min-w-0 flex-1 rounded border border-ink/15 bg-paper px-4 py-3 text-sm font-semibold outline-none focus:border-leaf"
                placeholder="Example: I scored 78% in 12th and want CS colleges in Pune..."
              />
              <button
                type="submit"
                disabled={!canSend}
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded bg-ink text-white transition hover:bg-leaf disabled:cursor-not-allowed disabled:opacity-45"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </section>
      </section>
    </main>
  );
}
