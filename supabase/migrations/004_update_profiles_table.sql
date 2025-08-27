-- Add new columns if they don't exist
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS username text,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'offline';

-- Optional: ensure created_at exists
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT now();
