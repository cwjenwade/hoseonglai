-- 講座報名資料表
CREATE TABLE lecture_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lecture_id TEXT NOT NULL,
  lecture_title TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 研究報名資料表
CREATE TABLE research_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  video_url TEXT NOT NULL,
  video_title TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  interest_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 心理測驗結果資料表
CREATE TABLE psych_test_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  test_id TEXT NOT NULL,
  test_title TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  answers INTEGER[] NOT NULL,
  total_score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 電子報訂閱資料表
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 短連結映射表
CREATE TABLE url_shortcuts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  short_code TEXT NOT NULL UNIQUE,
  long_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- 建立索引以加速查詢
CREATE INDEX idx_lecture_registrations_email ON lecture_registrations(user_email);
CREATE INDEX idx_research_registrations_email ON research_registrations(user_email);
CREATE INDEX idx_psych_test_results_email ON psych_test_results(user_email);
CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_lecture_registrations_created ON lecture_registrations(created_at DESC);
CREATE INDEX idx_research_registrations_created ON research_registrations(created_at DESC);
CREATE INDEX idx_psych_test_results_created ON psych_test_results(created_at DESC);
CREATE INDEX idx_newsletter_subscribers_created ON newsletter_subscribers(created_at DESC);
CREATE INDEX idx_url_shortcuts_code ON url_shortcuts(short_code);

-- 啟用 Row Level Security
ALTER TABLE lecture_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE psych_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE url_shortcuts ENABLE ROW LEVEL SECURITY;

-- 建立 Policy 允許 anon 角色新增資料
CREATE POLICY "Allow public insert" ON lecture_registrations
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public insert" ON research_registrations
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public insert" ON psych_test_results
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public insert" ON newsletter_subscribers
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public insert" ON url_shortcuts
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public select" ON url_shortcuts
  FOR SELECT TO anon USING (true);
