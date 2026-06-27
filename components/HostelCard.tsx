import { Star } from "lucide-react";
import { colleges, formatINR } from "@/data/stages";
import type { Hostel } from "@/lib/types";

export function HostelCard({ hostel }: { hostel: Hostel }) {
  const college = colleges.find((item) => item.id === hostel.collegeId);

  return (
    <article className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-ink">{college?.name}</h3>
          <p className="text-sm font-semibold capitalize text-ink/55">{hostel.type} hostel</p>
        </div>
        <span className="flex items-center gap-1 rounded bg-saffron/15 px-2 py-1 text-sm font-bold">
          <Star size={15} fill="currentColor" /> {hostel.rating}
        </span>
      </div>
      <p className="mt-4 text-lg font-black text-leaf">{formatINR(hostel.feesPerYear)}/year</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {hostel.amenities.map((amenity) => (
          <span key={amenity} className="rounded bg-ink/5 px-2 py-1 text-xs font-semibold text-ink/75">
            {amenity}
          </span>
        ))}
      </div>
    </article>
  );
}
