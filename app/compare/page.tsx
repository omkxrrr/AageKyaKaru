import { FeesCalculator } from "@/components/FeesCalculator";
import { cities, formatINR } from "@/data/stages";

export default function ComparePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold uppercase text-leaf">Decision tools</p>
      <h1 className="mt-2 text-4xl font-black text-ink">Compare Cities and Fees</h1>
      <p className="mt-3 max-w-2xl text-ink/70">
        Side-by-side city signals plus an annual college cost calculator for transparent planning.
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="overflow-hidden rounded-lg border border-ink/10 bg-white shadow-soft">
          <div className="grid grid-cols-5 bg-ink px-4 py-3 text-sm font-black text-white">
            <span>City</span>
            <span>Living</span>
            <span>Safety</span>
            <span>Jobs</span>
            <span>Hostel</span>
          </div>
          {cities.map((city) => (
            <div key={city.id} className="grid grid-cols-5 border-t border-ink/10 px-4 py-4 text-sm">
              <strong>{city.name}</strong>
              <span>{city.costOfLivingIndex}/100</span>
              <span>{city.safetyScore}/100</span>
              <span>{city.jobMarketScore}/100</span>
              <span>{formatINR(city.avgHostelCost)}</span>
            </div>
          ))}
        </section>
        <FeesCalculator />
      </div>
    </main>
  );
}
