insert into public.stages (slug, name, description) values
  ('after-10th', 'After 10th', 'Streams, diploma options, and early career direction for students after SSC.'),
  ('after-12th', 'After 12th', 'Degree paths, entrance exams, colleges, and cost planning after HSC.'),
  ('after-diploma', 'After Diploma', 'Lateral entry, direct jobs, and bridge decisions for diploma students.'),
  ('after-degree', 'After Degree', 'Higher studies, competitive exams, and job-readiness after graduation.')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description;

insert into public.cities (name, state, cost_of_living_index, safety_score, avg_hostel_cost, job_market_score) values
  ('Pune', 'Maharashtra', 72, 78, 85000, 86),
  ('Mumbai', 'Maharashtra', 92, 74, 135000, 94),
  ('Nagpur', 'Maharashtra', 58, 76, 65000, 70)
on conflict (name, state) do update set
  cost_of_living_index = excluded.cost_of_living_index,
  safety_score = excluded.safety_score,
  avg_hostel_cost = excluded.avg_hostel_cost,
  job_market_score = excluded.job_market_score;

insert into public.courses (stage_id, name, duration, category, eligibility_text)
select s.id, c.name, c.duration, c.category, c.eligibility_text
from (
  values
    ('after-10th', 'Diploma in Computer Engineering', '3 years', 'Diploma', '10th pass with Mathematics and Science.'),
    ('after-12th', 'B.Tech / B.E. Computer Engineering', '4 years', 'Engineering', '12th Science PCM with entrance score, or diploma for lateral entry.'),
    ('after-12th', 'B.Com', '3 years', 'Commerce', '12th Commerce or equivalent stream as accepted by the college.'),
    ('after-degree', 'MBA', '2 years', 'Management', 'Bachelor degree with valid entrance score where required.')
) as c(stage_slug, name, duration, category, eligibility_text)
join public.stages s on s.slug = c.stage_slug
where not exists (select 1 from public.courses existing where existing.name = c.name);

insert into public.colleges (name, city_id, type, ranking, website_url, established_year)
select c.name, city.id, c.type, c.ranking, c.website_url, c.established_year
from (
  values
    ('COEP Technological University', 'Pune', 'govt', 1, 'https://www.coep.org.in/', 1854),
    ('Veermata Jijabai Technological Institute', 'Mumbai', 'govt', 2, 'https://vjti.ac.in/', 1887),
    ('Pune Institute of Computer Technology', 'Pune', 'private', 3, 'https://pict.edu/', 1983),
    ('Government Polytechnic Nagpur', 'Nagpur', 'govt', 4, 'https://www.gpnagpur.ac.in/', 1914)
) as c(name, city_name, type, ranking, website_url, established_year)
join public.cities city on city.name = c.city_name and city.state = 'Maharashtra'
where not exists (select 1 from public.colleges existing where existing.name = c.name);

insert into public.college_courses (college_id, course_id)
select college.id, course.id
from (
  values
    ('COEP Technological University', 'B.Tech / B.E. Computer Engineering'),
    ('Veermata Jijabai Technological Institute', 'B.Tech / B.E. Computer Engineering'),
    ('Pune Institute of Computer Technology', 'B.Tech / B.E. Computer Engineering'),
    ('Government Polytechnic Nagpur', 'Diploma in Computer Engineering')
) as cc(college_name, course_name)
join public.colleges college on college.name = cc.college_name
join public.courses course on course.name = cc.course_name
on conflict (college_id, course_id) do nothing;

insert into public.fees_structure (college_id, course_id, tuition_fee, misc_fee, hostel_fee, academic_year)
select college.id, course.id, f.tuition_fee, f.misc_fee, f.hostel_fee, '2026-27'
from (
  values
    ('COEP Technological University', 'B.Tech / B.E. Computer Engineering', 135000, 18000, 82000),
    ('Veermata Jijabai Technological Institute', 'B.Tech / B.E. Computer Engineering', 85000, 16000, 118000),
    ('Pune Institute of Computer Technology', 'B.Tech / B.E. Computer Engineering', 105000, 22000, 95000),
    ('Government Polytechnic Nagpur', 'Diploma in Computer Engineering', 12000, 6000, 52000)
) as f(college_name, course_name, tuition_fee, misc_fee, hostel_fee)
join public.colleges college on college.name = f.college_name
join public.courses course on course.name = f.course_name
on conflict (college_id, course_id, academic_year) do update set
  tuition_fee = excluded.tuition_fee,
  misc_fee = excluded.misc_fee,
  hostel_fee = excluded.hostel_fee;

insert into public.hostels (college_id, type, fees_per_year, amenities, rating)
select college.id, h.type, h.fees_per_year, h.amenities, h.rating
from (
  values
    ('COEP Technological University', 'boys', 82000, array['Mess', 'Wi-Fi', 'Study room', 'Security'], 4.2),
    ('Veermata Jijabai Technological Institute', 'girls', 118000, array['Mess', 'Laundry', 'Security'], 4.0),
    ('Pune Institute of Computer Technology', 'co-ed', 95000, array['Mess', 'Wi-Fi', 'Transport'], 3.9)
) as h(college_name, type, fees_per_year, amenities, rating)
join public.colleges college on college.name = h.college_name;

insert into public.entrance_exams (name, applicable_courses, eligibility_text, exam_pattern_text, official_link) values
  ('MHT CET', array['B.Tech / B.E. Computer Engineering'], '12th Science PCM candidates and Maharashtra state candidates as per CET Cell rules.', 'PCM-based objective test used for engineering admissions in Maharashtra.', 'https://cetcell.mahacet.org/'),
  ('JEE Main', array['B.Tech / B.E. Computer Engineering'], '12th Science PCM candidates meeting NTA eligibility rules.', 'National-level objective test for engineering admission routes.', 'https://jeemain.nta.ac.in/')
on conflict (name) do update set
  applicable_courses = excluded.applicable_courses,
  eligibility_text = excluded.eligibility_text,
  exam_pattern_text = excluded.exam_pattern_text,
  official_link = excluded.official_link;
