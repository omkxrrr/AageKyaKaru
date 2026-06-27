import { BriefcaseBusiness, Home, Languages, ShieldCheck } from "lucide-react";
import { formatINR } from "@/data/stages";
import type { City } from "@/lib/types";

export function CityCard({ city }: { city: City }) {
  return (
    <article className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <h3 className="text-xl font-black text-ink">{city.name}</h3>
      <p className="text-sm font-semibold text-ink/55">{city.state}</p>
      <div className="mt-5 grid gap-3 text-sm text-ink/75">
        <span className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <Home size={16} /> Living index
          </span>
          <strong>{city.costOfLivingIndex}/100</strong>
        </span>
        <span className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} /> Safety
          </span>
          <strong>{city.safetyScore}/100</strong>
        </span>
        <span className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <BriefcaseBusiness size={16} /> Jobs
          </span>
          <strong>{city.jobMarketScore}/100</strong>
        </span>
        <span className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <Languages size={16} /> Language
          </span>
          <strong className="text-right">{city.language}</strong>
        </span>
      </div>
      <p className="mt-5 rounded bg-leaf/10 px-3 py-2 text-sm font-bold text-ink">
        Avg hostel: {formatINR(city.avgHostelCost)}/year
      </p>
    </article>
  );
}
