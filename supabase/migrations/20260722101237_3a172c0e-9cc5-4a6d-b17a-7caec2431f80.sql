
CREATE TABLE public.smart_2_interessenten (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.smart_2_interessenten TO anon, authenticated;
GRANT ALL ON public.smart_2_interessenten TO service_role;

ALTER TABLE public.smart_2_interessenten ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can sign up"
  ON public.smart_2_interessenten
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(first_name)) BETWEEN 1 AND 100
    AND length(trim(last_name)) BETWEEN 1 AND 100
    AND length(trim(email)) BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(trim(phone)) BETWEEN 5 AND 30
  );
