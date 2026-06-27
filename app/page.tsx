import Link from "next/link";
import { ArrowRight, GraduationCap, IndianRupee, Map, School } from "lucide-react";
import { CityCard } from "@/components/CityCard";
import { CollegeCard } from "@/components/CollegeCard";
import { FeesCalculator } from "@/components/FeesCalculator";
import { cities, colleges, stages } from "@/data/stages";

const modules = [
  { icon: GraduationCap, label: "Stage guidance", href: "/after-12th" },
  { icon: School, label: "College directory", href: "/colleges" },
  { icon: Map, label: "City comparison", href: "/compare" },
  { icon: IndianRupee, label: "Fees calculator", href: "/compare" }
];

export default function HomePage() {
  return (
    <main>
      <section className="hero-banner relative min-h-[680px] overflow-hidden text-white">
        <div className="hero-vignette absolute inset-0" />
        <div className="relative mx-auto flex min-h-[680px] max-w-7xl flex-col justify-end px-4 pb-12 pt-20 sm:px-6 lg:pb-16">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-white/25 bg-white/12 px-4 py-2 text-sm font-bold uppercase text-saffron shadow-soft backdrop-blur-md">
              Har student ka next step, clear
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white drop-shadow-2xl sm:text-6xl">
              Aage kya karu? Courses, colleges, cities aur fees ek jagah.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82 drop-shadow">
              Maharashtra-focused MVP for students after 10th, 12th, diploma, or degree.
              Compare options without scattered tabs and guesswork.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 rounded bg-saffron px-5 py-3 font-black text-ink shadow-soft transition hover:-translate-y-0.5 hover:bg-white"
              >
                Start quiz <ArrowRight size={18} />
              </Link>
              <Link
                href="/colleges"
                className="liquid-button inline-flex items-center gap-2 rounded px-5 py-3 font-black text-white transition hover:-translate-y-0.5"
              >
                Browse colleges
              </Link>
            </div>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="liquid-card rounded-lg p-5 transition hover:-translate-y-1"
              >
                <item.icon size={24} className="text-saffron" />
                <p className="mt-4 font-black">{item.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h2 className="text-2xl font-black text-ink">Choose Your Stage</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {stages.map((stage) => (
            <Link
              key={stage.id}
              href={`/${stage.slug}`}
              className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-leaf/40"
            >
              <p className="text-sm font-bold text-leaf">{stage.name}</p>
              <h3 className="mt-2 text-lg font-black">{stage.primaryQuestion}</h3>
            </Link>
          ))}
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div>
            <h2 className="text-2xl font-black text-ink">Featured Colleges</h2>
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              {colleges.slice(0, 2).map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          </div>
          <FeesCalculator />
        </div>
        <section className="mt-10">
          <h2 className="text-2xl font-black text-ink">City Snapshot</h2>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {cities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
