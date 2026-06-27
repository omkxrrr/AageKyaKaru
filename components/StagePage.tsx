import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { careerPaths, colleges, courses, entranceExams, stages } from "@/data/stages";
import type { StageSlug } from "@/lib/types";
import { CollegeCard } from "./CollegeCard";

export function StagePage({ slug }: { slug: StageSlug }) {
  const stage = stages.find((item) => item.slug === slug);

  if (!stage) {
    return null;
  }

  const stageCourses = courses.filter((course) => course.stageId === stage.id);
  const paths = careerPaths.filter((path) => path.stageId === stage.id);
  const matchingColleges = colleges.filter((college) =>
    (Array.isArray(college.courseIds) ? college.courseIds : []).some((courseId) =>
      stageCourses.some((course) => course.id === courseId)
    )
  );
  const relevantExamIds = new Set(stageCourses.map((course) => course.id));
  const exams = entranceExams.filter((exam) =>
    exam.applicableCourses.some((courseId) => relevantExamIds.has(courseId))
  );

  return (
    <main>
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-saffron">{stage.name}</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
              {stage.primaryQuestion}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">{stage.description}</p>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/8 p-5">
            <p className="text-sm font-bold uppercase text-white/55">Recommended next actions</p>
            <div className="mt-4 grid gap-3">
              {["Explore paths", "Shortlist courses", "Compare fees and city"].map((item) => (
                <span key={item} className="flex items-center gap-2 text-sm font-semibold">
                  <CheckCircle2 size={17} className="text-saffron" /> {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-2xl font-black text-ink">Path Preview</h2>
            <div className="mt-4 grid gap-4">
              {paths.map((path) => (
                <article key={path.id} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
                  <h3 className="text-lg font-black">{path.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/70">{path.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {path.tags.map((tag) => (
                      <span key={tag} className="rounded bg-leaf/10 px-2 py-1 text-xs font-bold text-ink">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-ink">Courses</h2>
            <div className="mt-4 grid gap-4">
              {stageCourses.map((course) => (
                <article key={course.id} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
                  <p className="text-xs font-bold uppercase text-leaf">{course.category}</p>
                  <h3 className="mt-1 text-lg font-black">{course.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-ink/60">{course.duration}</p>
                  <p className="mt-2 text-sm leading-6 text-ink/70">{course.eligibilityText}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
        {exams.length ? (
          <section className="mt-10">
            <h2 className="text-2xl font-black text-ink">Entrance Exams</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {exams.map((exam) => (
                <article key={exam.id} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
                  <h3 className="text-lg font-black">{exam.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/70">{exam.examPatternText}</p>
                  <a
                    href={exam.officialLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-leaf"
                  >
                    Official site <ArrowRight size={15} />
                  </a>
                </article>
              ))}
            </div>
          </section>
        ) : null}
        {matchingColleges.length ? (
          <section className="mt-10">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black text-ink">Matching Colleges</h2>
              <Link href="/colleges" className="text-sm font-bold text-leaf">
                View all
              </Link>
            </div>
            <div className="mt-4 grid gap-5 lg:grid-cols-3">
              {matchingColleges.slice(0, 3).map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}
