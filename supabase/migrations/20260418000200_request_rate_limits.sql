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
