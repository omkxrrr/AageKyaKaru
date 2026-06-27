import type {
  CareerPath,
  City,
  College,
  Course,
  EntranceExam,
  FeeStructure,
  Hostel,
  Stage
} from "@/lib/types";
import { maharashtraCities, maharashtraColleges } from "./maharashtra-colleges";

export const stages: Stage[] = [
  {
    id: "stage-10th",
    slug: "after-10th",
    name: "After 10th",
    shortName: "10th",
    description: "Streams, diploma options, and early career direction for students after SSC.",
    primaryQuestion: "Science, Commerce, Arts ya Diploma?"
  },
  {
    id: "stage-12th",
    slug: "after-12th",
    name: "After 12th",
    shortName: "12th",
    description: "Degree paths, entrance exams, colleges, and cost planning after HSC.",
    primaryQuestion: "Course, college aur entrance exam ka best combo?"
  },
  {
    id: "stage-diploma",
    slug: "after-diploma",
    name: "After Diploma",
    shortName: "Diploma",
    description: "Lateral entry, direct jobs, and bridge decisions for diploma students.",
    primaryQuestion: "Direct second year degree ya job?"
  },
  {
    id: "stage-degree",
    slug: "after-degree",
    name: "After Degree",
    shortName: "Degree",
    description: "Higher studies, competitive exams, and job-readiness after graduation.",
    primaryQuestion: "Higher studies, exam prep ya placement?"
  }
];

export const careerPaths: CareerPath[] = [
  {
    id: "path-science",
    stageId: "stage-10th",
    title: "Science stream",
    description: "Engineering, medicine, pure science, architecture, data, and research tracks.",
    tags: ["PCM", "PCB", "Entrance exams"]
  },
  {
    id: "path-diploma",
    stageId: "stage-10th",
    title: "Diploma after 10th",
    description: "Skill-focused technical route with lateral entry into engineering later.",
    tags: ["Polytechnic", "Practical", "Lateral entry"]
  },
  {
    id: "path-engineering",
    stageId: "stage-12th",
    title: "Engineering degree",
    description: "B.E. or B.Tech across CS, IT, mechanical, civil, electronics, and allied branches.",
    tags: ["MHT CET", "JEE", "4 years"]
  },
  {
    id: "path-lateral",
    stageId: "stage-diploma",
    title: "Lateral entry degree",
    description: "Direct second-year admission for eligible diploma students in matching branches.",
    tags: ["DSE", "Direct second year", "Branch match"]
  },
  {
    id: "path-mba",
    stageId: "stage-degree",
    title: "MBA and management",
    description: "Management route through CAT, CET, CMAT, or college-level admissions.",
    tags: ["CAT", "MBA CET", "Placements"]
  }
];

export const courses: Course[] = [
  {
    id: "course-diploma-cs",
    name: "Diploma in Computer Engineering",
    duration: "3 years",
    eligibilityText: "10th pass with Mathematics and Science.",
    stageId: "stage-10th",
    category: "Diploma"
  },
  {
    id: "course-btech-cs",
    name: "B.Tech / B.E. Computer Engineering",
    duration: "4 years",
    eligibilityText: "12th Science PCM with entrance score, or diploma for lateral entry.",
    stageId: "stage-12th",
    category: "Engineering"
  },
  {
    id: "course-bcom",
    name: "B.Com",
    duration: "3 years",
    eligibilityText: "12th Commerce or equivalent stream as accepted by the college.",
    stageId: "stage-12th",
    category: "Commerce"
  },
  {
    id: "course-mba",
    name: "MBA",
    duration: "2 years",
    eligibilityText: "Bachelor degree with valid entrance score where required.",
    stageId: "stage-degree",
    category: "Management"
  }
];

export const cities: City[] = maharashtraCities;

export const colleges: College[] = maharashtraColleges;

const feeOverrides: FeeStructure[] = [
  {
    id: "fee-coep-cs",
    collegeId: "college-coep",
    courseId: "course-btech-cs",
    tuitionFee: 135000,
    miscFee: 18000,
    hostelFee: 82000,
    academicYear: "2026-27"
  },
  {
    id: "fee-vjti-cs",
    collegeId: "college-vjti",
    courseId: "course-btech-cs",
    tuitionFee: 85000,
    miscFee: 16000,
    hostelFee: 118000,
    academicYear: "2026-27"
  },
  {
    id: "fee-pict-cs",
    collegeId: "college-pict",
    courseId: "course-btech-cs",
    tuitionFee: 105000,
    miscFee: 22000,
    hostelFee: 95000,
    academicYear: "2026-27"
  },
  {
    id: "fee-gpn-cs",
    collegeId: "college-gpn",
    courseId: "course-diploma-cs",
    tuitionFee: 12000,
    miscFee: 6000,
    hostelFee: 52000,
    academicYear: "2026-27"
  }
];

const feeOverridesByCollege = new Map(feeOverrides.map((fee) => [fee.collegeId, fee]));

const getCity = (cityId: string) => cities.find((city) => city.id === cityId);

const estimateTuitionFee = (college: College) => {
  const courseId = college.courseIds[0] ?? "course-btech-cs";
  const city = getCity(college.cityId);
  const cityPremium = city ? Math.round(city.costOfLivingIndex * 650) : 40000;

  if (courseId === "course-diploma-cs") {
    return college.type === "govt" ? 12000 + cityPremium * 0.08 : 42000 + cityPremium * 0.18;
  }

  if (courseId === "course-mba") {
    return college.type === "govt" ? 125000 + cityPremium * 0.55 : 285000 + cityPremium * 1.2;
  }

  return college.type === "govt" ? 72000 + cityPremium * 0.5 : 98000 + cityPremium * 0.85;
};

export const fees: FeeStructure[] = colleges.map((college) => {
  const override = feeOverridesByCollege.get(college.id);

  if (override) {
    return override;
  }

  const courseId = college.courseIds[0] ?? "course-btech-cs";
  const city = getCity(college.cityId);
  const tuitionFee = Math.round(estimateTuitionFee(college) / 1000) * 1000;
  const miscFee = courseId === "course-mba" ? 28000 : courseId === "course-diploma-cs" ? 7000 : 18000;
  const hostelFee = city?.avgHostelCost ?? 65000;

  return {
    id: `fee-${college.id.replace("college-", "")}-${courseId.replace("course-", "")}`,
    collegeId: college.id,
    courseId,
    tuitionFee,
    miscFee,
    hostelFee,
    academicYear: "2026-27"
  };
});

const hostelOverrides: Hostel[] = [
  {
    id: "hostel-coep",
    collegeId: "college-coep",
    type: "boys",
    feesPerYear: 82000,
    amenities: ["Mess", "Wi-Fi", "Study room", "Security"],
    rating: 4.2
  },
  {
    id: "hostel-vjti",
    collegeId: "college-vjti",
    type: "girls",
    feesPerYear: 118000,
    amenities: ["Mess", "Laundry", "Security"],
    rating: 4.0
  },
  {
    id: "hostel-pict",
    collegeId: "college-pict",
    type: "co-ed",
    feesPerYear: 95000,
    amenities: ["Mess", "Wi-Fi", "Transport"],
    rating: 3.9
  }
];

const hostelOverridesByCollege = new Map(hostelOverrides.map((hostel) => [hostel.collegeId, hostel]));

export const hostels: Hostel[] = colleges.map((college, index) => {
  const override = hostelOverridesByCollege.get(college.id);

  if (override) {
    return override;
  }

  const city = getCity(college.cityId);
  const hostelTypes: Hostel["type"][] = ["boys", "girls", "co-ed"];

  return {
    id: `hostel-${college.id.replace("college-", "")}`,
    collegeId: college.id,
    type: hostelTypes[index % hostelTypes.length],
    feesPerYear: city?.avgHostelCost ?? 65000,
    amenities: ["Mess", "Wi-Fi", "Security", "Study room"],
    rating: Number((3.7 + (index % 9) * 0.1).toFixed(1))
  };
});

export const entranceExams: EntranceExam[] = [
  {
    id: "exam-mht-cet",
    name: "MHT CET",
    applicableCourses: ["course-btech-cs"],
    eligibilityText: "12th Science PCM candidates and Maharashtra state candidates as per CET Cell rules.",
    examPatternText: "PCM-based objective test used for engineering admissions in Maharashtra.",
    officialLink: "https://cetcell.mahacet.org/"
  },
  {
    id: "exam-jee-main",
    name: "JEE Main",
    applicableCourses: ["course-btech-cs"],
    eligibilityText: "12th Science PCM candidates meeting NTA eligibility rules.",
    examPatternText: "National-level objective test for engineering admission routes.",
    officialLink: "https://jeemain.nta.ac.in/"
  }
];

export const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
