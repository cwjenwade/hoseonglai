CREATE TABLE IF NOT EXISTS group_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_slug TEXT NOT NULL,
  group_title TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  note TEXT,
  availability_slots TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_group_registrations_group_slug
  ON group_registrations(group_slug);

CREATE INDEX IF NOT EXISTS idx_group_registrations_email
  ON group_registrations(user_email);

CREATE INDEX IF NOT EXISTS idx_group_registrations_created
  ON group_registrations(created_at DESC);

ALTER TABLE group_registrations ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'group_registrations'
      AND policyname = 'Allow public insert group registrations'
  ) THEN
    CREATE POLICY "Allow public insert group registrations" ON group_registrations
      FOR INSERT TO anon WITH CHECK (true);
  END IF;
END $$;
