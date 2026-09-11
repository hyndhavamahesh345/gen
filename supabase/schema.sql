-- GENTRICKS DIGITAL ECOSYSTEM — PRODUCTION DATABASE SCHEMA
-- PostgreSQL / Supabase Compatible Migration File

-- 1. Profiles Table (Student Builders, Mentors, Founders)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL,
  avatar_url TEXT,
  college_or_company TEXT,
  skills TEXT[] DEFAULT '{}',
  github_url TEXT,
  linkedin_url TEXT,
  featured_project TEXT,
  bio TEXT
);

-- 2. Projects Table (Student Build Showcase)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('AI', 'Web3', 'SaaS', 'Mobile', 'Hardware', 'Open Source')),
  tech_stack TEXT[] DEFAULT '{}',
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  demo_url TEXT,
  github_url TEXT,
  upvotes INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN DEFAULT false
);

-- 3. Startups Table (LaunchPad Incubator Startups)
CREATE TABLE IF NOT EXISTS public.startups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  logo_emoji TEXT DEFAULT '🚀',
  one_liner TEXT NOT NULL,
  description TEXT NOT NULL,
  stage TEXT NOT NULL CHECK (stage IN ('Idea', 'Validation', 'Prototype', 'MVP', 'Launch')),
  industry TEXT NOT NULL,
  founders TEXT[] DEFAULT '{}',
  seeking TEXT[] DEFAULT '{}',
  website_url TEXT,
  pitch_deck_url TEXT,
  is_featured BOOLEAN DEFAULT false
);

-- 4. Opportunities Table (Internships, Bounties, Hackathons)
CREATE TABLE IF NOT EXISTS public.opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Internship', 'Bounty', 'Fellowship', 'Hackathon', 'Collaboration')),
  organization TEXT NOT NULL,
  location TEXT NOT NULL,
  stipend_or_reward TEXT NOT NULL,
  deadline TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  apply_url TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false
);

-- 5. Events Table (Workshops, Speaker Sessions, Pitch Nights, Summits)
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Workshop', 'Speaker Session', 'Hackathon', 'Pitch Night', 'Networking', 'Summit')),
  event_date TEXT NOT NULL,
  event_time TEXT NOT NULL,
  location TEXT NOT NULL,
  speaker_or_host TEXT,
  description TEXT NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 100,
  rsvp_count INTEGER NOT NULL DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false
);

-- 6. Creator Profiles Table
CREATE TABLE IF NOT EXISTS public.creator_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  handle TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('YouTuber', 'UI/UX Designer', 'Filmmaker', 'Musician', 'Podcaster', 'Writer')),
  avatar_url TEXT NOT NULL,
  bio TEXT NOT NULL,
  portfolio_url TEXT,
  social_url TEXT,
  featured_work TEXT NOT NULL,
  followers_or_reach TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false
);

-- 7. Media Episodes Table (Gentricks Podcast & YouTube Teardowns)
CREATE TABLE IF NOT EXISTS public.media_episodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Podcast', 'YouTube Video', 'Founder Story', 'Builder Teardown')),
  duration TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  video_or_audio_url TEXT NOT NULL,
  guest_name TEXT NOT NULL,
  guest_role TEXT NOT NULL,
  summary TEXT NOT NULL,
  published_date TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false
);

-- 8. Idea Submissions Table (LaunchPad Entry Form)
CREATE TABLE IF NOT EXISTS public.idea_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  proposed_solution TEXT NOT NULL,
  target_audience TEXT NOT NULL,
  team_members TEXT,
  contact_email TEXT NOT NULL,
  review_status TEXT DEFAULT 'Pending' CHECK (review_status IN ('Pending', 'Under Review', 'Accepted', 'Rejected'))
);

-- 9. Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  email TEXT UNIQUE NOT NULL,
  interests TEXT[] DEFAULT '{}'
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_startups_stage ON public.startups(stage);
CREATE INDEX IF NOT EXISTS idx_opportunities_type ON public.opportunities(type);
CREATE INDEX IF NOT EXISTS idx_events_type ON public.events(type);
CREATE INDEX IF NOT EXISTS idx_creators_category ON public.creator_profiles(category);
CREATE INDEX IF NOT EXISTS idx_media_type ON public.media_episodes(type);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_episodes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public read access for projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read access for startups" ON public.startups FOR SELECT USING (true);
CREATE POLICY "Public read access for opportunities" ON public.opportunities FOR SELECT USING (true);
CREATE POLICY "Public read access for events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public read access for creator_profiles" ON public.creator_profiles FOR SELECT USING (true);
CREATE POLICY "Public read access for media_episodes" ON public.media_episodes FOR SELECT USING (true);
