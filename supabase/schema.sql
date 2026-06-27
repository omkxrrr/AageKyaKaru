create extension if not exists "pgcrypto";

create table if not exists public.stages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.career_paths (
  id uuid primary key default gen_random_uuid(),
  stage_id uuid not null references public.stages(id) on delete cascade,
  title text not null,
  description text not null,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  stage_id uuid references public.stages(id) on delete set null,
  name text not null,
  duration text not null,
  category text not null,
  eligibility_text text not null,
  leads_to_stage_id uuid references public.stages(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.cities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  state text not null,
  cost_of_living_index integer not null check (cost_of_living_index between 0 and 100),
  safety_score integer not null check (safety_score between 0 and 100),
  avg_hostel_cost integer not null check (avg_hostel_cost >= 0),
  job_market_score integer not null check (job_market_score between 0 and 100),
  created_at timestamptz not null default now(),
  unique (name, state)
);

create table if not exists public.colleges (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city_id uuid not null references public.cities(id) on delete restrict,
  type text not null check (type in ('govt', 'private')),
  ranking integer not null check (ranking > 0),
  website_url text,
  established_year integer check (established_year between 1800 and extract(year from now())::integer),
  created_at timestamptz not null default now()
);

create table if not exists public.college_courses (
  id uuid primary key default gen_random_uuid(),
  college_id uuid not null references public.colleges(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (college_id, course_id)
);

create table if not exists public.fees_structure (
  id uuid primary key default gen_random_uuid(),
  college_id uuid not null references public.colleges(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  tuition_fee integer not null check (tuition_fee >= 0),
  misc_fee integer not null check (misc_fee >= 0),
  hostel_fee integer not null default 0 check (hostel_fee >= 0),
  total_fee integer generated always as (tuition_fee + misc_fee + hostel_fee) stored,
  academic_year text not null,
  created_at timestamptz not null default now(),
  unique (college_id, course_id, academic_year)
);

create table if not exists public.hostels (
  id uuid primary key default gen_random_uuid(),
  college_id uuid not null references public.colleges(id) on delete cascade,
  type text not null check (type in ('boys', 'girls', 'co-ed')),
  fees_per_year integer not null check (fees_per_year >= 0),
  amenities text[] not null default '{}',
  rating numeric(2, 1) not null check (rating between 0 and 5),
  created_at timestamptz not null default now()
);

create table if not exists public.entrance_exams (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  applicable_courses text[] not null default '{}',
  eligibility_text text not null,
  exam_pattern_text text not null,
  official_link text,
  created_at timestamptz not null default now()
);

create index if not exists colleges_city_id_idx on public.colleges(city_id);
create index if not exists college_courses_college_id_idx on public.college_courses(college_id);
create index if not exists college_courses_course_id_idx on public.college_courses(course_id);
create index if not exists fees_structure_lookup_idx on public.fees_structure(college_id, course_id);
create index if not exists hostels_college_id_idx on public.hostels(college_id);
