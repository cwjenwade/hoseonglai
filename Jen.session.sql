-- 允許匿名插入講座報名
alter table lecture_registrations enable row level security;
create policy "anon insert lectures" on lecture_registrations
for insert to public using (true) with check (true);

-- 允許匿名插入研究報名
alter table research_registrations enable row level security;
create policy "anon insert research" on research_registrations
for insert to public using (true) with check (true);

-- 允許匿名插入心理測驗結果
alter table psych_test_results enable row level security;
create policy "anon insert psych" on psych_test_results
for insert to public using (true) with check (true);

-- 允許匿名插入訂閱
alter table newsletter_subscribers enable row level security;
create policy "anon insert newsletter" on newsletter_subscribers
for insert to public using (true) with check (true);
