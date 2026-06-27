import { Building2, ExternalLink, IndianRupee, MapPin } from "lucide-react";
import { cities, courses, fees, formatINR } from "@/data/stages";
import type { College } from "@/lib/types";

export function CollegeCard({ college }: { college: College }) {
  const city = cities.find((item) => item.id === college.cityId);
  const courseIds = Array.isArray(college.courseIds) ? college.courseIds : [];
  const courseList = courseIds
    .map((courseId) => courses.find((course) => course.id === courseId)?.name)
    .filter(Boolean);
  const collegeFees = fees.filter((fee) => fee.collegeId === college.id);
  const lowestTotal = collegeFees.length
    ? Math.min(...collegeFees.map((fee) => fee.tuitionFee + fee.miscFee + fee.hostelFee))
    : null;

  return (
    <article className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-leaf">Rank #{college.ranking}</p>
          <h3 className="mt-1 text-xl font-black text-ink">{college.name}</h3>
        </div>
        <span className="rounded bg-saffron/15 px-2 py-1 text-xs font-bold uppercase text-ink">
          {college.type}
        </span>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-ink/70">
        <span className="flex items-center gap-2">
          <MapPin size={16} /> {city?.name}, {city?.state}
        </span>
        <span className="flex items-center gap-2">
          <Building2 size={16} /> Est. {college.establishedYear}
        </span>
        {lowestTotal ? (
          <span className="flex items-center gap-2">
            <IndianRupee size={16} /> From {formatINR(lowestTotal)} per year
          </span>
        ) : null}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {courseList.map((course) => (
          <span key={course} className="rounded bg-ink/5 px-2 py-1 text-xs font-semibold text-ink/75">
            {course}
          </span>
        ))}
      </div>
      <a
        href={college.websiteUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded bg-ink px-3 py-2 text-sm font-bold text-white transition hover:bg-leaf"
      >
        Website <ExternalLink size={15} />
      </a>
    </article>
  );
}
