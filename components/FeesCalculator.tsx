"use client";

import { Calculator } from "lucide-react";
import { useMemo, useState } from "react";
import { colleges, courses, fees, formatINR } from "@/data/stages";

export function FeesCalculator() {
  const [feeId, setFeeId] = useState(fees[0]?.id ?? "");
  const selectedFee = fees.find((fee) => fee.id === feeId) ?? fees[0];
  const college = colleges.find((item) => item.id === selectedFee.collegeId);
  const course = courses.find((item) => item.id === selectedFee.courseId);
  const total = useMemo(
    () => selectedFee.tuitionFee + selectedFee.miscFee + selectedFee.hostelFee,
    [selectedFee]
  );

  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
      <div className="flex items-center gap-2">
        <Calculator size={20} />
        <h2 className="text-xl font-black text-ink">Fees Breakdown</h2>
      </div>
      <label className="mt-5 block text-sm font-bold text-ink/75" htmlFor="fee-option">
        College and course
      </label>
      <select
        id="fee-option"
        className="mt-2 w-full rounded border border-ink/15 bg-paper px-3 py-3 text-sm font-semibold text-ink outline-none focus:border-leaf"
        value={feeId}
        onChange={(event) => setFeeId(event.target.value)}
      >
        {fees.map((fee) => {
          const optionCollege = colleges.find((item) => item.id === fee.collegeId);
          const optionCourse = courses.find((item) => item.id === fee.courseId);
          return (
            <option key={fee.id} value={fee.id}>
              {optionCollege?.name} - {optionCourse?.name}
            </option>
          );
        })}
      </select>
      <div className="mt-5 grid gap-3 text-sm">
        <Row label="Tuition" value={formatINR(selectedFee.tuitionFee)} />
        <Row label="Hostel" value={formatINR(selectedFee.hostelFee)} />
        <Row label="Misc" value={formatINR(selectedFee.miscFee)} />
      </div>
      <div className="mt-5 rounded bg-ink p-4 text-white">
        <p className="text-xs font-bold uppercase text-white/65">{selectedFee.academicYear}</p>
        <p className="mt-1 text-2xl font-black">{formatINR(total)}</p>
        <p className="mt-1 text-sm text-white/75">
          Estimated annual total for {course?.name} at {college?.name}.
        </p>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded bg-ink/5 px-3 py-2">
      <span className="font-semibold text-ink/65">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
