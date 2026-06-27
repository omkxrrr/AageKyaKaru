"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useMemo, useState } from "react";

const questions = [
  {
    label: "Current stage",
    options: ["10th pass", "12th Science", "Diploma", "Degree"]
  },
  {
    label: "Priority",
    options: ["Low fees", "Best placements", "Safe city", "Quick job"]
  },
  {
    label: "Interest",
    options: ["Technology", "Business", "Design", "Not sure"]
  }
];

const routeMap: Record<string, string> = {
  "10th pass": "/after-10th",
  "12th Science": "/after-12th",
  Diploma: "/after-diploma",
  Degree: "/after-degree"
};

export default function QuizPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const destination = useMemo(() => routeMap[answers["Current stage"]] ?? "/colleges", [answers]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold uppercase text-leaf">Path selector</p>
      <h1 className="mt-2 text-4xl font-black text-ink">Quick Guidance Quiz</h1>
      <div className="mt-8 grid gap-5">
        {questions.map((question) => (
          <section key={question.label} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
            <h2 className="text-lg font-black text-ink">{question.label}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {question.options.map((option) => {
                const selected = answers[question.label] === option;
                return (
                  <button
                    key={option}
                    type="button"
                    className={`flex items-center justify-between rounded border px-4 py-3 text-left font-bold transition ${
                      selected
                        ? "border-leaf bg-leaf/10 text-ink"
                        : "border-ink/10 bg-paper text-ink/70 hover:border-leaf/50"
                    }`}
                    onClick={() => setAnswers((current) => ({ ...current, [question.label]: option }))}
                  >
                    {option}
                    {selected ? <Check size={18} /> : null}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      <Link
        href={destination}
        className="mt-8 inline-flex items-center gap-2 rounded bg-ink px-5 py-3 font-black text-white transition hover:bg-leaf"
      >
        See recommendation <ArrowRight size={18} />
      </Link>
    </main>
  );
}
