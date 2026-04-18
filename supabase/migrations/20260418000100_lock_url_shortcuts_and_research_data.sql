-- Harden research links and sensitive research data access.

-- url_shortcuts should no longer be directly readable by anon clients.
DROP POLICY IF EXISTS "Allow public select" ON public.url_shortcuts;

-- Research data writes should be performed by server routes, not direct anon clients.
DROP POLICY IF EXISTS "Allow public insert research registrations" ON public.research_registrations;
DROP POLICY IF EXISTS "Allow public insert psych test results" ON public.psych_test_results;
DROP POLICY IF EXISTS "Allow public insert psych answer columns" ON public.psych_test_answer_columns;
DROP POLICY IF EXISTS "Allow public insert" ON public.psych_test_answer_columns;
