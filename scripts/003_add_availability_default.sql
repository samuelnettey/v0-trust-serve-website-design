-- Add default value for availability column to prevent NOT NULL violations
ALTER TABLE public.candidates 
  ALTER COLUMN availability SET DEFAULT 'full_time';

-- Update any existing NULL values
UPDATE public.candidates 
  SET availability = 'full_time' 
  WHERE availability IS NULL;
