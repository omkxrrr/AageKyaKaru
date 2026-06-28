import Link from "next/link";
import { ArrowRight, Bell, Bot, Sparkles } from "lucide-react";

const upcomingFeatures = [
  "Personalized course and college recommendations",
  "Budget-aware city and hostel guidance",
  "Entrance exam and career path planning",
  "Saved chat history for student decisions"
];

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-ink text-white">
      <section className="mx-auto grid min-h-[calc(100vh-82px)] max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_420px] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-bold uppercase text-saffron backdrop-blur">
            <Sparkles size={16} /> Coming soon
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight sm:text-7xl">
            AI Guidance Chat is getting ready.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
            AageKyaKaru AI will soon help students choose the right course, college,
            city, budget, hostel, entrance exam plan, and career path with personalized guidance.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 rounded bg-saffron px-5 py-3 font-black text-ink transition hover:-translate-y-0.5 hover:bg-white"
            >
              Try guidance quiz <ArrowRight size={18} />
            </Link>
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/8 px-5 py-3 font-black text-white transition hover:-translate-y-0.5 hover:bg-white/14"
            >
              Browse colleges
            </Link>
          </div>
        </div>

        <aside className="rounded-lg border border-white/14 bg-white/8 p-6 shadow-soft backdrop-blur">
          <div className="flex h-14 w-14 items-center justify-center rounded bg-saffron text-ink">
            <Bot size={28} />
          </div>
          <h2 className="mt-5 text-2xl font-black">What is coming?</h2>
          <div className="mt-5 grid gap-3">
            {upcomingFeatures.map((feature) => (
              <div key={feature} className="rounded border border-white/12 bg-white/8 px-4 py-3 text-sm font-semibold text-white/82">
                {feature}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded bg-white/10 p-4 text-sm leading-6 text-white/72">
            <span className="mb-2 flex items-center gap-2 font-black text-white">
              <Bell size={16} className="text-saffron" /> Stay tuned
            </span>
            The rest of the platform is live while the AI assistant is being prepared.
          </div>
        </aside>
      </section>
    </main>
  );
}
