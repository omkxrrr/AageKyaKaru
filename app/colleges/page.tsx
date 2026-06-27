import { CollegeCard } from "@/components/CollegeCard";
import { HostelCard } from "@/components/HostelCard";
import { cities, colleges, hostels } from "@/data/stages";

export default function CollegesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase text-leaf">Directory</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Colleges</h1>
          <p className="mt-3 max-w-2xl text-ink/70">
            Filter-ready Maharashtra college shortlist with courses, city context, and annual cost estimates.
          </p>
        </div>
        <div className="rounded bg-white px-4 py-3 text-sm font-bold shadow-soft">
          {colleges.length} colleges across {cities.length} cities
        </div>
      </div>
      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        {colleges.map((college) => (
          <CollegeCard key={college.id} college={college} />
        ))}
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-black text-ink">Hostel Snapshot</h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {hostels.map((hostel) => (
            <HostelCard key={hostel.id} hostel={hostel} />
          ))}
        </div>
      </section>
    </main>
  );
}
