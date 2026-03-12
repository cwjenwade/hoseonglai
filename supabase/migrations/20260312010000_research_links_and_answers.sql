-- Ensure short link table exists (for /r/[shortCode])
CREATE TABLE IF NOT EXISTS url_shortcuts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  short_code TEXT NOT NULL UNIQUE,
  long_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_url_shortcuts_code ON url_shortcuts(short_code);

ALTER TABLE url_shortcuts ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'url_shortcuts' AND policyname = 'Allow public insert'
  ) THEN
    -- Writes should NOT be public. url_shortcuts is used for redirects,
    -- so we keep it publicly readable only.
    -- (Writes should be performed via service role or admin-only policies.)
    NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'url_shortcuts' AND policyname = 'Allow public update'
  ) THEN
    -- Writes should NOT be public.
    NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'url_shortcuts' AND policyname = 'Allow public select'
  ) THEN
    CREATE POLICY "Allow public select" ON url_shortcuts
      FOR SELECT TO anon USING (true);
  END IF;
END $$;

-- If older versions of this migration were applied, ensure public write policies are removed.
DROP POLICY IF EXISTS "Allow public insert" ON url_shortcuts;
DROP POLICY IF EXISTS "Allow public update" ON url_shortcuts;

-- Numbered answer columns storage by project & participant code
CREATE TABLE IF NOT EXISTS psych_test_answer_columns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  test_id TEXT NOT NULL,
  participant_code TEXT NOT NULL,
  answer_map JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_psych_answer_columns_test_id
  ON psych_test_answer_columns(test_id);

CREATE INDEX IF NOT EXISTS idx_psych_answer_columns_participant
  ON psych_test_answer_columns(participant_code);

ALTER TABLE psych_test_answer_columns ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'psych_test_answer_columns' AND policyname = 'Allow public insert'
  ) THEN
    CREATE POLICY "Allow public insert" ON psych_test_answer_columns
      FOR INSERT TO anon WITH CHECK (true);
  END IF;
END $$;
