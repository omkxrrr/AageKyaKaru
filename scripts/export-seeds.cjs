const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const root = path.join(__dirname, "..");
const sourcePath = path.join(root, "data", "maharashtra-colleges.ts");
const source = fs
  .readFileSync(sourcePath, "utf8")
  .replace(/^import type .+;\r?\n/, "");

const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020
  }
}).outputText;

const moduleState = { exports: {} };
const runner = new Function("exports", "module", compiled);
runner(moduleState.exports, moduleState);

const cities = moduleState.exports.maharashtraCities.map((city) => ({
  id: city.id,
  name: city.name,
  state: city.state,
  cost_of_living_index: city.costOfLivingIndex,
  safety_score: city.safetyScore,
  avg_hostel_cost: city.avgHostelCost,
  job_market_score: city.jobMarketScore,
  language: city.language
}));

const colleges = moduleState.exports.maharashtraColleges.map((college) => ({
  id: college.id,
  name: college.name,
  city_id: college.cityId,
  type: college.type,
  ranking: college.ranking,
  website_url: college.websiteUrl,
  established_year: college.establishedYear,
  course_ids: college.courseIds
}));

const feeOverrides = [
  {
    id: "fee-coep-cs",
    college_id: "college-coep",
    course_id: "course-btech-cs",
    tuition_fee: 135000,
    misc_fee: 18000,
    hostel_fee: 82000,
    academic_year: "2026-27"
  },
  {
    id: "fee-vjti-cs",
    college_id: "college-vjti",
    course_id: "course-btech-cs",
    tuition_fee: 85000,
    misc_fee: 16000,
    hostel_fee: 118000,
    academic_year: "2026-27"
  },
  {
    id: "fee-pict-cs",
    college_id: "college-pict",
    course_id: "course-btech-cs",
    tuition_fee: 105000,
    misc_fee: 22000,
    hostel_fee: 95000,
    academic_year: "2026-27"
  },
  {
    id: "fee-gpn-cs",
    college_id: "college-gpn",
    course_id: "course-diploma-cs",
    tuition_fee: 12000,
    misc_fee: 6000,
    hostel_fee: 52000,
    academic_year: "2026-27"
  }
];

const cityById = new Map(cities.map((city) => [city.id, city]));
const feeOverrideByCollege = new Map(feeOverrides.map((fee) => [fee.college_id, fee]));

const estimateTuitionFee = (college) => {
  const courseId = college.course_ids[0] || "course-btech-cs";
  const city = cityById.get(college.city_id);
  const cityPremium = city ? Math.round(city.cost_of_living_index * 650) : 40000;

  if (courseId === "course-diploma-cs") {
    return college.type === "govt" ? 12000 + cityPremium * 0.08 : 42000 + cityPremium * 0.18;
  }

  if (courseId === "course-mba") {
    return college.type === "govt" ? 125000 + cityPremium * 0.55 : 285000 + cityPremium * 1.2;
  }

  return college.type === "govt" ? 72000 + cityPremium * 0.5 : 98000 + cityPremium * 0.85;
};

const fees = colleges.map((college) => {
  const override = feeOverrideByCollege.get(college.id);

  if (override) {
    return {
      ...override,
      total_fee: override.tuition_fee + override.misc_fee + override.hostel_fee
    };
  }

  const courseId = college.course_ids[0] || "course-btech-cs";
  const city = cityById.get(college.city_id);
  const tuitionFee = Math.round(estimateTuitionFee(college) / 1000) * 1000;
  const miscFee = courseId === "course-mba" ? 28000 : courseId === "course-diploma-cs" ? 7000 : 18000;
  const hostelFee = city?.avg_hostel_cost || 65000;

  return {
    id: `fee-${college.id.replace("college-", "")}-${courseId.replace("course-", "")}`,
    college_id: college.id,
    course_id: courseId,
    tuition_fee: tuitionFee,
    misc_fee: miscFee,
    hostel_fee: hostelFee,
    total_fee: tuitionFee + miscFee + hostelFee,
    academic_year: "2026-27"
  };
});

const hostelOverrides = [
  {
    id: "hostel-coep",
    college_id: "college-coep",
    type: "boys",
    fees_per_year: 82000,
    amenities: ["Mess", "Wi-Fi", "Study room", "Security"],
    rating: 4.2
  },
  {
    id: "hostel-vjti",
    college_id: "college-vjti",
    type: "girls",
    fees_per_year: 118000,
    amenities: ["Mess", "Laundry", "Security"],
    rating: 4
  },
  {
    id: "hostel-pict",
    college_id: "college-pict",
    type: "co-ed",
    fees_per_year: 95000,
    amenities: ["Mess", "Wi-Fi", "Transport"],
    rating: 3.9
  }
];

const hostelOverrideByCollege = new Map(hostelOverrides.map((hostel) => [hostel.college_id, hostel]));
const hostelTypes = ["boys", "girls", "co-ed"];

const hostels = colleges.map((college, index) => {
  const override = hostelOverrideByCollege.get(college.id);

  if (override) {
    return override;
  }

  const city = cityById.get(college.city_id);

  return {
    id: `hostel-${college.id.replace("college-", "")}`,
    college_id: college.id,
    type: hostelTypes[index % hostelTypes.length],
    fees_per_year: city?.avg_hostel_cost || 65000,
    amenities: ["Mess", "Wi-Fi", "Security", "Study room"],
    rating: Number((3.7 + (index % 9) * 0.1).toFixed(1))
  };
});

fs.writeFileSync(path.join(root, "data", "seed-cities.json"), `${JSON.stringify(cities, null, 2)}\n`);
fs.writeFileSync(path.join(root, "data", "seed-colleges.json"), `${JSON.stringify(colleges, null, 2)}\n`);
fs.writeFileSync(path.join(root, "data", "seed-fees.json"), `${JSON.stringify(fees, null, 2)}\n`);
fs.writeFileSync(path.join(root, "data", "seed-hostels.json"), `${JSON.stringify(hostels, null, 2)}\n`);

console.log(
  `Exported ${cities.length} cities, ${colleges.length} colleges, ${fees.length} fees, and ${hostels.length} hostels.`
);
