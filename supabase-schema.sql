-- 講座報名資料表
CREATE TABLE IF NOT EXISTS lecture_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lecture_id TEXT NOT NULL,
  lecture_title TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 研究報名資料表
CREATE TABLE IF NOT EXISTS research_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_url TEXT NOT NULL,
  video_title TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  interest_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 心理測驗結果資料表
CREATE TABLE IF NOT EXISTS psych_test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id TEXT NOT NULL,
  test_title TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  answers INTEGER[] NOT NULL,
  total_score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 電子報訂閱資料表
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 啟用行級安全
ALTER TABLE public.lecture_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.psych_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- 刪除所有舊策略
DROP POLICY IF EXISTS "allow_public_insert" ON public.lecture_registrations;
DROP POLICY IF EXISTS "allow_insert" ON public.lecture_registrations;
DROP POLICY IF EXISTS "allow_all" ON public.lecture_registrations;

DROP POLICY IF EXISTS "allow_public_insert" ON public.research_registrations;
DROP POLICY IF EXISTS "allow_insert" ON public.research_registrations;
DROP POLICY IF EXISTS "allow_all" ON public.research_registrations;

DROP POLICY IF EXISTS "allow_public_insert" ON public.psych_test_results;
DROP POLICY IF EXISTS "allow_insert" ON public.psych_test_results;
DROP POLICY IF EXISTS "allow_all" ON public.psych_test_results;

DROP POLICY IF EXISTS "allow_public_insert" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "allow_insert" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "allow_all" ON public.newsletter_subscribers;

-- 建立簡單的策略：允許所有人執行所有操作
CREATE POLICY "allow_all" ON public.lecture_registrations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON public.research_registrations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON public.psych_test_results FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON public.newsletter_subscribers FOR ALL USING (true) WITH CHECK (true);

-- 建立索引以加速查詢
CREATE INDEX IF NOT EXISTS idx_lecture_registrations_user_email ON public.lecture_registrations (user_email);
CREATE INDEX IF NOT EXISTS idx_research_registrations_user_email ON public.research_registrations (user_email);
CREATE INDEX IF NOT EXISTS idx_psych_test_results_user_email ON public.psych_test_results (user_email);

CREATE INDEX IF NOT EXISTS idx_lecture_registrations_created ON public.lecture_registrations (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_research_registrations_created ON public.research_registrations (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_psych_test_results_created ON public.psych_test_results (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_created ON public.newsletter_subscribers (created_at DESC);

-- answers 為陣列，建立 GIN 索引
CREATE INDEX IF NOT EXISTS idx_psych_test_results_answers_gin ON public.psych_test_results USING GIN (answers);
