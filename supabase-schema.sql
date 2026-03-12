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

-- 團體報名資料表
CREATE TABLE IF NOT EXISTS group_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_slug TEXT NOT NULL,
  group_title TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  note TEXT,
  availability_slots TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 短連結映射表（/r/[shortCode]）
CREATE TABLE IF NOT EXISTS url_shortcuts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  short_code TEXT NOT NULL UNIQUE,
  long_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- 心理測驗答案欄位映射（每題 001/002/...）
CREATE TABLE IF NOT EXISTS psych_test_answer_columns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id TEXT NOT NULL,
  participant_code TEXT NOT NULL,
  answer_map JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin allowlist（後台讀取權限）
CREATE TABLE IF NOT EXISTS admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 啟用行級安全
ALTER TABLE public.lecture_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.psych_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.url_shortcuts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.psych_test_answer_columns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

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

-- 新策略：公開只允許新增（insert），後台 admin 才能讀取（select）
DROP POLICY IF EXISTS "Allow public insert lecture registrations" ON public.lecture_registrations;
DROP POLICY IF EXISTS "Allow public insert research registrations" ON public.research_registrations;
DROP POLICY IF EXISTS "Allow public insert psych test results" ON public.psych_test_results;
DROP POLICY IF EXISTS "Allow public insert psych answer columns" ON public.psych_test_answer_columns;
DROP POLICY IF EXISTS "Allow public insert newsletter subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public insert group registrations" ON public.group_registrations;

DROP POLICY IF EXISTS "Allow admin select lecture registrations" ON public.lecture_registrations;
DROP POLICY IF EXISTS "Allow admin select research registrations" ON public.research_registrations;
DROP POLICY IF EXISTS "Allow admin select psych test results" ON public.psych_test_results;
DROP POLICY IF EXISTS "Allow admin select psych answer columns" ON public.psych_test_answer_columns;
DROP POLICY IF EXISTS "Allow admin select newsletter subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow admin select group registrations" ON public.group_registrations;
DROP POLICY IF EXISTS "Authenticated can read own admin row" ON public.admin_users;

DROP POLICY IF EXISTS "Allow public select" ON public.url_shortcuts;
DROP POLICY IF EXISTS "Allow public insert" ON public.url_shortcuts;
DROP POLICY IF EXISTS "Allow public update" ON public.url_shortcuts;
DROP POLICY IF EXISTS "Allow admin select url shortcuts" ON public.url_shortcuts;
DROP POLICY IF EXISTS "Allow admin insert url shortcuts" ON public.url_shortcuts;
DROP POLICY IF EXISTS "Allow admin update url shortcuts" ON public.url_shortcuts;

-- Public INSERT policies
CREATE POLICY "Allow public insert lecture registrations" ON public.lecture_registrations
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public insert research registrations" ON public.research_registrations
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public insert psych test results" ON public.psych_test_results
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public insert psych answer columns" ON public.psych_test_answer_columns
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public insert newsletter subscribers" ON public.newsletter_subscribers
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public insert group registrations" ON public.group_registrations
  FOR INSERT TO anon WITH CHECK (true);

-- Public SELECT for short links (redirect)
CREATE POLICY "Allow public select" ON public.url_shortcuts
  FOR SELECT TO anon USING (true);

-- Admin checks
CREATE POLICY "Authenticated can read own admin row" ON public.admin_users
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Allow admin select lecture registrations" ON public.lecture_registrations
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));

CREATE POLICY "Allow admin select research registrations" ON public.research_registrations
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));

CREATE POLICY "Allow admin select psych test results" ON public.psych_test_results
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));

CREATE POLICY "Allow admin select psych answer columns" ON public.psych_test_answer_columns
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));

CREATE POLICY "Allow admin select newsletter subscribers" ON public.newsletter_subscribers
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));

CREATE POLICY "Allow admin select group registrations" ON public.group_registrations
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));

CREATE POLICY "Allow admin select url shortcuts" ON public.url_shortcuts
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));

CREATE POLICY "Allow admin insert url shortcuts" ON public.url_shortcuts
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));

CREATE POLICY "Allow admin update url shortcuts" ON public.url_shortcuts
  FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));

-- 建立索引以加速查詢
CREATE INDEX IF NOT EXISTS idx_lecture_registrations_user_email ON public.lecture_registrations (user_email);
CREATE INDEX IF NOT EXISTS idx_research_registrations_user_email ON public.research_registrations (user_email);
CREATE INDEX IF NOT EXISTS idx_psych_test_results_user_email ON public.psych_test_results (user_email);

CREATE INDEX IF NOT EXISTS idx_lecture_registrations_created ON public.lecture_registrations (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_research_registrations_created ON public.research_registrations (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_psych_test_results_created ON public.psych_test_results (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_created ON public.newsletter_subscribers (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_group_registrations_group_slug ON public.group_registrations (group_slug);
CREATE INDEX IF NOT EXISTS idx_group_registrations_email ON public.group_registrations (user_email);
CREATE INDEX IF NOT EXISTS idx_group_registrations_created ON public.group_registrations (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_url_shortcuts_code ON public.url_shortcuts (short_code);

CREATE INDEX IF NOT EXISTS idx_psych_answer_columns_test_id ON public.psych_test_answer_columns (test_id);
CREATE INDEX IF NOT EXISTS idx_psych_answer_columns_participant ON public.psych_test_answer_columns (participant_code);

-- answers 為陣列，建立 GIN 索引
CREATE INDEX IF NOT EXISTS idx_psych_test_results_answers_gin ON public.psych_test_results USING GIN (answers);
