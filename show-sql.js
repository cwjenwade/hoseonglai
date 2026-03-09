#!/usr/bin/env node

const sql = `
CREATE TABLE IF NOT EXISTS lecture_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lecture_id TEXT NOT NULL,
  lecture_title TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS research_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  video_url TEXT NOT NULL,
  video_title TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  interest_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS psych_test_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  test_id TEXT NOT NULL,
  test_title TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  answers INTEGER[] NOT NULL,
  total_score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE lecture_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE psych_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert" ON lecture_registrations;
CREATE POLICY "Allow public insert" ON lecture_registrations FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public insert" ON research_registrations;
CREATE POLICY "Allow public insert" ON research_registrations FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public insert" ON psych_test_results;
CREATE POLICY "Allow public insert" ON psych_test_results FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public insert" ON newsletter_subscribers;
CREATE POLICY "Allow public insert" ON newsletter_subscribers FOR INSERT TO anon WITH CHECK (true);
`;

console.log('請複製以下 SQL 到 Supabase SQL Editor 執行：\n');
console.log('='.repeat(80));
console.log(sql);
console.log('='.repeat(80));
console.log('\n步驟：');
console.log('1. 進入 https://app.supabase.com');
console.log('2. 點左邊 SQL Editor');
console.log('3. 新增 Query（New Query）');
console.log('4. 複製上面的 SQL 並粘貼');
console.log('5. 點 Run');
console.log('6. 完成！');
