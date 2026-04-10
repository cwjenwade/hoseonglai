ALTER TABLE group_registrations
  ADD COLUMN IF NOT EXISTS consultation_slots TEXT[] NOT NULL DEFAULT '{}'::text[];
