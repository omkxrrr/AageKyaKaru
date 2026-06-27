import { CityCard } from "@/components/CityCard";
import { cities } from "@/data/stages";

export default function CitiesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold uppercase text-leaf">Maharashtra MVP</p>
      <h1 className="mt-2 text-4xl font-black text-ink">City Comparison Base</h1>
      <p className="mt-3 max-w-2xl text-ink/70">
        Compare study cities by living cost, hostel cost, safety, job market, and language comfort.
      </p>
      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        {cities.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </section>
    </main>
  );
}
