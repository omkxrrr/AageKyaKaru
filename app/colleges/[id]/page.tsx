import { notFound } from "next/navigation";
import { CityCard } from "@/components/CityCard";
import { FeesCalculator } from "@/components/FeesCalculator";
import { HostelCard } from "@/components/HostelCard";
import { cities, colleges, courses, fees, formatINR, hostels } from "@/data/stages";

export default function CollegeDetailPage({ params }: { params: { id: string } }) {
  const college = colleges.find((item) => item.id === params.id);

  if (!college) {
    notFound();
  }

  const city = cities.find((item) => item.id === college.cityId);
  const courseIds = Array.isArray(college.courseIds) ? college.courseIds : [];
  const collegeCourses = courseIds
    .map((courseId) => courses.find((course) => course.id === courseId))
    .filter(Boolean);
  const collegeFees = fees.filter((fee) => fee.collegeId === college.id);
  const collegeHostels = hostels.filter((hostel) => hostel.collegeId === college.id);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <section className="rounded-lg bg-ink p-8 text-white">
        <p className="text-sm font-bold uppercase text-saffron">Rank #{college.ranking}</p>
        <h1 className="mt-3 text-4xl font-black">{college.name}</h1>
        <p className="mt-3 text-white/70">
          {college.type.toUpperCase()} college in {city?.name}, established in {college.establishedYear}.
        </p>
      </section>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <section>
          <h2 className="text-2xl font-black text-ink">Courses and Fees</h2>
          <div className="mt-5 grid gap-4">
            {collegeCourses.map((course) => {
              const fee = collegeFees.find((item) => item.courseId === course?.id);
              return (
                <article key={course?.id} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
                  <h3 className="text-lg font-black">{course?.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/70">{course?.eligibilityText}</p>
                  {fee ? (
                    <p className="mt-4 font-black text-leaf">
                      {formatINR(fee.tuitionFee + fee.miscFee + fee.hostelFee)} estimated annual total
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
          <h2 className="mt-10 text-2xl font-black text-ink">Hostels</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {collegeHostels.map((hostel) => (
              <HostelCard key={hostel.id} hostel={hostel} />
            ))}
          </div>
        </section>
        <aside className="grid gap-6">
          {city ? <CityCard city={city} /> : null}
          <FeesCalculator />
        </aside>
      </div>
    </main>
  );
}
