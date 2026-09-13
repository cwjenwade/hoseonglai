-- Policy names may differ between historical deployments. Remove every anon
-- INSERT policy on personal-data tables by role and operation, not by name.
DO $$
DECLARE
  policy_record RECORD;
BEGIN
  FOR policy_record IN
    SELECT tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN (
        'lecture_registrations',
        'group_registrations',
        'newsletter_subscribers',
        'research_registrations',
        'psych_test_results',
        'psych_test_answer_columns'
      )
      AND cmd = 'INSERT'
      AND 'anon'::name = ANY(roles)
  LOOP
    EXECUTE format(
      'DROP POLICY IF EXISTS %I ON public.%I',
      policy_record.policyname,
      policy_record.tablename
    );
  END LOOP;
END;
$$;
