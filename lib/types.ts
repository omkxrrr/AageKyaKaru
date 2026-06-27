export type StageSlug = "after-10th" | "after-12th" | "after-diploma" | "after-degree";

export type Stage = {
  id: string;
  slug: StageSlug;
  name: string;
  shortName: string;
  description: string;
  primaryQuestion: string;
};

export type CareerPath = {
  id: string;
  stageId: string;
  title: string;
  description: string;
  tags: string[];
};

export type Course = {
  id: string;
  name: string;
  duration: string;
  eligibilityText: string;
  stageId: string;
  category: string;
};

export type City = {
  id: string;
  name: string;
  state: string;
  costOfLivingIndex: number;
  safetyScore: number;
  avgHostelCost: number;
  jobMarketScore: number;
  language: string;
};

export type College = {
  id: string;
  name: string;
  cityId: string;
  type: "govt" | "private";
  ranking: number;
  websiteUrl: string;
  establishedYear: number;
  courseIds: string[];
};

export type FeeStructure = {
  id: string;
  collegeId: string;
  courseId: string;
  tuitionFee: number;
  miscFee: number;
  hostelFee: number;
  academicYear: string;
};

export type Hostel = {
  id: string;
  collegeId: string;
  type: "boys" | "girls" | "co-ed";
  feesPerYear: number;
  amenities: string[];
  rating: number;
};

export type EntranceExam = {
  id: string;
  name: string;
  applicableCourses: string[];
  eligibilityText: string;
  examPatternText: string;
  officialLink: string;
};
