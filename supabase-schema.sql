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
  name TEXT,newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_lecture_registrations_created ON lecture_registrations(created_at DESC);
CREATE INDEX idx_research_registrations_created ON research_registrations(created_at DESC);
CREATE INDEX idx_psych_test_results_created ON psych_test_results(created_at DESC);
CREATE INDEX idx_newsletter_subscribers_created ON newsletter_subscriber

-- 建立索引以加速查詢
CREATE INDEX idx_lecture_registrations_email ON lecture_registrations(user_email);
CREATE INDEX idx_research_registrations_email ON research_registrations(user_email);
CREATE INDEX idx_psych_test_results_email ON psych_test_results(user_email);
CREATE INDEX idx_lecture_registrations_created ON lecture_registrations(created_at DESC);
CREATE INDEX idx_research_registrations_created ON research_registrations(created_at DESC);
CREATE INDEX idx_psych_test_results_created ON psych_test_results(created_at DESC);
