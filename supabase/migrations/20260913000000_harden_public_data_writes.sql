-- Keep public form data behind application APIs. Service-role requests bypass
-- RLS, while browsers and anonymous keys can no longer write directly.

CREATE TABLE IF NOT EXISTS public.request_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scope TEXT NOT NULL,
  identifier TEXT NOT NULL,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_request_rate_limits_scope_identifier_window
  ON public.request_rate_limits (scope, identifier, window_start);

CREATE INDEX IF NOT EXISTS idx_request_rate_limits_expires_at
  ON public.request_rate_limits (expires_at);

ALTER TABLE public.request_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.consume_rate_limit(
  p_scope TEXT,
  p_identifier TEXT,
  p_window_start TIMESTAMP WITH TIME ZONE,
  p_expires_at TIMESTAMP WITH TIME ZONE,
  p_max_requests INTEGER
)
RETURNS TABLE (allowed BOOLEAN, remaining INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  next_count INTEGER;
BEGIN
  IF p_max_requests < 1 THEN
    RAISE EXCEPTION 'p_max_requests must be positive';
  END IF;

  INSERT INTO public.request_rate_limits (
    scope, identifier, window_start, count, expires_at, updated_at
  )
  VALUES (
    p_scope, p_identifier, p_window_start, 1, p_expires_at, NOW()
  )
  ON CONFLICT (scope, identifier, window_start) DO UPDATE
    SET count = public.request_rate_limits.count + 1,
        expires_at = EXCLUDED.expires_at,
        updated_at = NOW()
    WHERE public.request_rate_limits.count < p_max_requests
  RETURNING count INTO next_count;

  IF next_count IS NULL THEN
    RETURN QUERY SELECT FALSE, 0;
  ELSE
    RETURN QUERY SELECT TRUE, GREATEST(0, p_max_requests - next_count);
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.consume_rate_limit(TEXT, TEXT, TIMESTAMP WITH TIME ZONE, TIMESTAMP WITH TIME ZONE, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.consume_rate_limit(TEXT, TEXT, TIMESTAMP WITH TIME ZONE, TIMESTAMP WITH TIME ZONE, INTEGER) TO service_role;

DROP POLICY IF EXISTS "allow_public_insert" ON public.lecture_registrations;
DROP POLICY IF EXISTS "allow_insert" ON public.lecture_registrations;
DROP POLICY IF EXISTS "Allow public insert" ON public.lecture_registrations;
DROP POLICY IF EXISTS "Allow public insert lecture registrations" ON public.lecture_registrations;
DROP POLICY IF EXISTS "allow_public_insert" ON public.group_registrations;
DROP POLICY IF EXISTS "allow_insert" ON public.group_registrations;
DROP POLICY IF EXISTS "Allow public insert group registrations" ON public.group_registrations;
DROP POLICY IF EXISTS "allow_public_insert" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "allow_insert" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public insert" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public insert newsletter subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "allow_public_insert" ON public.research_registrations;
DROP POLICY IF EXISTS "allow_insert" ON public.research_registrations;
DROP POLICY IF EXISTS "Allow public insert" ON public.research_registrations;
DROP POLICY IF EXISTS "Allow public insert research registrations" ON public.research_registrations;
DROP POLICY IF EXISTS "allow_public_insert" ON public.psych_test_results;
DROP POLICY IF EXISTS "allow_insert" ON public.psych_test_results;
DROP POLICY IF EXISTS "Allow public insert" ON public.psych_test_results;
DROP POLICY IF EXISTS "Allow public insert psych test results" ON public.psych_test_results;
DROP POLICY IF EXISTS "allow_public_insert" ON public.psych_test_answer_columns;
DROP POLICY IF EXISTS "allow_insert" ON public.psych_test_answer_columns;
DROP POLICY IF EXISTS "Allow public insert" ON public.psych_test_answer_columns;
DROP POLICY IF EXISTS "Allow public insert psych answer columns" ON public.psych_test_answer_columns;
