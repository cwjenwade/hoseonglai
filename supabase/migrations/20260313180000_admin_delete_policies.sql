-- Allow authenticated admins to delete project-scoped registration data from dashboard

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'lecture_registrations' AND policyname = 'Allow admin delete lecture registrations'
  ) THEN
    CREATE POLICY "Allow admin delete lecture registrations" ON public.lecture_registrations
      FOR DELETE TO authenticated
      USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'group_registrations' AND policyname = 'Allow admin delete group registrations'
  ) THEN
    CREATE POLICY "Allow admin delete group registrations" ON public.group_registrations
      FOR DELETE TO authenticated
      USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'research_registrations' AND policyname = 'Allow admin delete research registrations'
  ) THEN
    CREATE POLICY "Allow admin delete research registrations" ON public.research_registrations
      FOR DELETE TO authenticated
      USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'psych_test_results' AND policyname = 'Allow admin delete psych test results'
  ) THEN
    CREATE POLICY "Allow admin delete psych test results" ON public.psych_test_results
      FOR DELETE TO authenticated
      USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'psych_test_answer_columns' AND policyname = 'Allow admin delete psych answer columns'
  ) THEN
    CREATE POLICY "Allow admin delete psych answer columns" ON public.psych_test_answer_columns
      FOR DELETE TO authenticated
      USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid()));
  END IF;
END $$;
