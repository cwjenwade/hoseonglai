-- Admin users table + secure RLS policies for public forms + admin-only reads

-- 1) Admin allowlist
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'admin_users'
      AND policyname = 'Authenticated can read own admin row'
  ) THEN
    CREATE POLICY "Authenticated can read own admin row" ON public.admin_users
      FOR SELECT TO authenticated
      USING (user_id = auth.uid());
  END IF;
END $$;

-- 2) Remove dangerously permissive policies (if they were applied)
DROP POLICY IF EXISTS "allow_all" ON public.lecture_registrations;
DROP POLICY IF EXISTS "allow_all" ON public.research_registrations;
DROP POLICY IF EXISTS "allow_all" ON public.psych_test_results;
DROP POLICY IF EXISTS "allow_all" ON public.newsletter_subscribers;

-- 3) Ensure RLS enabled (idempotent)
ALTER TABLE IF EXISTS public.lecture_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.research_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.psych_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.psych_test_answer_columns ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.group_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.url_shortcuts ENABLE ROW LEVEL SECURITY;

-- 4) Public insert policies (forms)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'lecture_registrations' AND policyname = 'Allow public insert lecture registrations'
  ) THEN
    CREATE POLICY "Allow public insert lecture registrations" ON public.lecture_registrations
      FOR INSERT TO anon WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'research_registrations' AND policyname = 'Allow public insert research registrations'
  ) THEN
    CREATE POLICY "Allow public insert research registrations" ON public.research_registrations
      FOR INSERT TO anon WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'psych_test_results' AND policyname = 'Allow public insert psych test results'
  ) THEN
    CREATE POLICY "Allow public insert psych test results" ON public.psych_test_results
      FOR INSERT TO anon WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'psych_test_answer_columns' AND policyname = 'Allow public insert psych answer columns'
  ) THEN
    CREATE POLICY "Allow public insert psych answer columns" ON public.psych_test_answer_columns
      FOR INSERT TO anon WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'newsletter_subscribers' AND policyname = 'Allow public insert newsletter subscribers'
  ) THEN
    CREATE POLICY "Allow public insert newsletter subscribers" ON public.newsletter_subscribers
      FOR INSERT TO anon WITH CHECK (true);
  END IF;

  -- group_registrations policy is created in its own migration; keep it there.
END $$;

-- 5) Admin-only SELECT policies (dashboard + exports)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'lecture_registrations' AND policyname = 'Allow admin select lecture registrations'
  ) THEN
    CREATE POLICY "Allow admin select lecture registrations" ON public.lecture_registrations
      FOR SELECT TO authenticated
      USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'group_registrations' AND policyname = 'Allow admin select group registrations'
  ) THEN
    CREATE POLICY "Allow admin select group registrations" ON public.group_registrations
      FOR SELECT TO authenticated
      USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'research_registrations' AND policyname = 'Allow admin select research registrations'
  ) THEN
    CREATE POLICY "Allow admin select research registrations" ON public.research_registrations
      FOR SELECT TO authenticated
      USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'psych_test_results' AND policyname = 'Allow admin select psych test results'
  ) THEN
    CREATE POLICY "Allow admin select psych test results" ON public.psych_test_results
      FOR SELECT TO authenticated
      USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'psych_test_answer_columns' AND policyname = 'Allow admin select psych answer columns'
  ) THEN
    CREATE POLICY "Allow admin select psych answer columns" ON public.psych_test_answer_columns
      FOR SELECT TO authenticated
      USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'newsletter_subscribers' AND policyname = 'Allow admin select newsletter subscribers'
  ) THEN
    CREATE POLICY "Allow admin select newsletter subscribers" ON public.newsletter_subscribers
      FOR SELECT TO authenticated
      USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));
  END IF;
END $$;

-- 6) url_shortcuts should be publicly readable for redirect, but writes should be admin-only
DO $$
BEGIN
  IF to_regclass('public.url_shortcuts') IS NOT NULL THEN
    DROP POLICY IF EXISTS "Allow public insert" ON public.url_shortcuts;
    DROP POLICY IF EXISTS "Allow public update" ON public.url_shortcuts;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'url_shortcuts' AND policyname = 'Allow public select'
  ) THEN
    CREATE POLICY "Allow public select" ON public.url_shortcuts
      FOR SELECT TO anon USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'url_shortcuts' AND policyname = 'Allow admin insert url shortcuts'
  ) THEN
    CREATE POLICY "Allow admin insert url shortcuts" ON public.url_shortcuts
      FOR INSERT TO authenticated
      WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'url_shortcuts' AND policyname = 'Allow admin update url shortcuts'
  ) THEN
    CREATE POLICY "Allow admin update url shortcuts" ON public.url_shortcuts
      FOR UPDATE TO authenticated
      USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()))
      WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));
  END IF;
END $$;
