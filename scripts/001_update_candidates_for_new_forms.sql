-- Update candidates table to match new form structure
ALTER TABLE candidates
ADD COLUMN IF NOT EXISTS full_name text,
ADD COLUMN IF NOT EXISTS whatsapp_number text,
ADD COLUMN IF NOT EXISTS ghana_card_front_url text,
ADD COLUMN IF NOT EXISTS ghana_card_back_url text,
ADD COLUMN IF NOT EXISTS special_needs_experience boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS cooking_skills text[],
ADD COLUMN IF NOT EXISTS housekeeping_tasks text[],
ADD COLUMN IF NOT EXISTS preferred_role text,
ADD COLUMN IF NOT EXISTS domestic_skills text[];

-- Update existing admin_users table to add username and code columns
-- Check if username column exists, if not add it
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='admin_users' AND column_name='username') THEN
    ALTER TABLE admin_users ADD COLUMN username text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='admin_users' AND column_name='code') THEN
    ALTER TABLE admin_users ADD COLUMN code text;
  END IF;
END $$;

-- Drop existing policy if it exists, then create new one
DROP POLICY IF EXISTS "Allow authentication" ON admin_users;
CREATE POLICY "Allow authentication" ON admin_users
  FOR SELECT
  USING (true);

-- Adding email values to satisfy NOT NULL constraint
-- Upsert the two static admin users with their codes and emails
-- First delete any existing records if they exist
DELETE FROM admin_users WHERE username IN ('gps-user1', 'gps-user2');

-- Insert the two static admin users with their codes and emails
INSERT INTO admin_users (username, code, email) VALUES 
  ('gps-user1', '667832', 'admin1@goldenprimesteward.com'),
  ('gps-user2', '409654', 'admin2@goldenprimesteward.com');
