-- Fix NOT NULL constraints for fields we don't collect in forms
-- Each ALTER COLUMN must be a separate statement

-- Using separate ALTER TABLE statements for each column to avoid syntax errors
ALTER TABLE candidates ALTER COLUMN gender DROP NOT NULL;
ALTER TABLE candidates ALTER COLUMN nationality DROP NOT NULL;
ALTER TABLE candidates ALTER COLUMN ghana_card_number DROP NOT NULL;
ALTER TABLE candidates ALTER COLUMN residential_address DROP NOT NULL;
ALTER TABLE candidates ALTER COLUMN city DROP NOT NULL;
ALTER TABLE candidates ALTER COLUMN region DROP NOT NULL;
ALTER TABLE candidates ALTER COLUMN current_area DROP NOT NULL;
ALTER TABLE candidates ALTER COLUMN age DROP NOT NULL;
ALTER TABLE candidates ALTER COLUMN first_name DROP NOT NULL;
ALTER TABLE candidates ALTER COLUMN last_name DROP NOT NULL;
ALTER TABLE candidates ALTER COLUMN email DROP NOT NULL;
ALTER TABLE candidates ALTER COLUMN position_applied DROP NOT NULL;

-- Set sensible defaults for fields
ALTER TABLE candidates ALTER COLUMN status SET DEFAULT 'pending';
ALTER TABLE candidates ALTER COLUMN created_at SET DEFAULT timezone('utc'::text, now());
ALTER TABLE candidates ALTER COLUMN updated_at SET DEFAULT timezone('utc'::text, now());
ALTER TABLE candidates ALTER COLUMN consent_background_check SET DEFAULT false;
ALTER TABLE candidates ALTER COLUMN consent_medical_screening SET DEFAULT false;
ALTER TABLE candidates ALTER COLUMN consent_employment_terms SET DEFAULT false;
ALTER TABLE candidates ALTER COLUMN special_needs_experience SET DEFAULT false;
ALTER TABLE candidates ALTER COLUMN has_valid_references SET DEFAULT false;
ALTER TABLE candidates ALTER COLUMN has_valid_id SET DEFAULT false;
ALTER TABLE candidates ALTER COLUMN willing_to_background_check SET DEFAULT false;
ALTER TABLE candidates ALTER COLUMN can_communicate_english SET DEFAULT false;
ALTER TABLE candidates ALTER COLUMN can_follow_checklist SET DEFAULT false;
ALTER TABLE candidates ALTER COLUMN can_read_basic_english SET DEFAULT false;
ALTER TABLE candidates ALTER COLUMN worked_six_months_one_household SET DEFAULT false;
ALTER TABLE candidates ALTER COLUMN can_cook_for_children SET DEFAULT false;
ALTER TABLE candidates ALTER COLUMN has_cpr_first_aid SET DEFAULT false;

-- Backfill existing rows with safe defaults
UPDATE candidates SET 
  gender = 'Not Specified' WHERE gender IS NULL;
  
UPDATE candidates SET 
  nationality = 'Ghana' WHERE nationality IS NULL;
  
UPDATE candidates SET 
  status = 'pending' WHERE status IS NULL;
