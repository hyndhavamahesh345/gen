export type EcosystemPillar =
  | 'community'
  | 'technology'
  | 'building'
  | 'startups'
  | 'events'
  | 'creators'
  | 'media'
  | 'opportunities'
  | 'partnerships';

export interface Profile {
  id: string;
  name: string;
  role: string;
  avatar: string;
  collegeOrCompany: string;
  skills: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  featuredProject?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'AI' | 'Web3' | 'SaaS' | 'Mobile' | 'Hardware' | 'Open Source';
  techStack: string[];
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  demoUrl?: string;
  githubUrl?: string;
  upvotes: number;
  featured: boolean;
  createdAt: string;
}

export interface Startup {
  id: string;
  name: string;
  logo: string;
  oneLiner: string;
  description: string;
  stage: 'Idea' | 'Validation' | 'Prototype' | 'MVP' | 'Launch';
  industry: string;
  founders: string[];
  seeking: string[];
  websiteUrl?: string;
  pitchDeckUrl?: string;
  featured: boolean;
}

export interface Opportunity {
  id: string;
  title: string;
  type: 'Internship' | 'Bounty' | 'Fellowship' | 'Hackathon' | 'Collaboration';
  organization: string;
  location: string;
  stipendOrReward: string;
  deadline: string;
  tags: string[];
  applyUrl: string;
  featured: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  type: 'Workshop' | 'Speaker Session' | 'Hackathon' | 'Pitch Night' | 'Networking' | 'Summit';
  date: string;
  time: string;
  location: string;
  speakerOrHost?: string;
  description: string;
  capacity: number;
  rsvpCount: number;
  tags: string[];
  featured: boolean;
}

export interface CreatorProfile {
  id: string;
  name: string;
  handle: string;
  category: 'YouTuber' | 'UI/UX Designer' | 'Filmmaker' | 'Musician' | 'Podcaster' | 'Writer';
  avatar: string;
  bio: string;
  portfolioUrl?: string;
  youtubeOrSocialUrl?: string;
  featuredWork: string;
  followersOrReach: string;
  featured: boolean;
}

export interface MediaEpisode {
  id: string;
  title: string;
  type: 'Podcast' | 'YouTube Video' | 'Founder Story' | 'Builder Teardown';
  duration: string;
  thumbnailUrl: string;
  videoOrAudioUrl: string;
  guestName: string;
  guestRole: string;
  summary: string;
  publishedDate: string;
  featured: boolean;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  category: 'University Chapter' | 'Corporate Partner' | 'Tech Sponsor' | 'Venture Network';
  description: string;
  websiteUrl: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorAvatar: string;
  companyName: string;
  companyLogo: string;
  metrics: string;
}

export interface HackathonItem {
  id: string;
  title: string;
  status: 'LIVE NOW' | 'UPCOMING' | 'REGISTRATION OPEN';
  prizePool: string;
  participantsCount: number;
  startDate: string;
  location: string;
  organizer: string;
  tags: string[];
  description: string;
}

export interface CityHub {
  id: string;
  city: string;
  membersCount: string;
  leadName: string;
  leadRole: string;
  eventsCount: number;
  coordinates: { x: number; y: number };
}

export interface IdeaSubmission {
  id: string;
  title: string;
  category: string;
  problemStatement: string;
  proposedSolution: string;
  targetAudience: string;
  teamMembers: string;
  contactEmail: string;
  submittedAt: string;
}

export interface NewsletterSubscription {
  email: string;
  subscribedAt: string;
  interests?: string[];
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}
