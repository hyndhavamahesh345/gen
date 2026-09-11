-- Run this once in the Supabase SQL Editor before using the Join form.
CREATE TABLE IF NOT EXISTS public.community_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'Andhra Pradesh',
  role TEXT NOT NULL,
  interests TEXT NOT NULL,
  consent BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS community_members_email_idx ON public.community_members (lower(email));
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit a community membership" ON public.community_members;
CREATE POLICY "Anyone can submit a community membership"
  ON public.community_members
  FOR INSERT
  WITH CHECK (consent = true);
