export interface CommunityRecord {
  id: string;
  name: string;
  focus?: string;
}

export interface EventRecord {
  id: string;
  title: string;
  startsAt: string;
  format: 'in-person' | 'online' | 'hybrid';
  communityId?: string;
}

export interface OpportunityRecord {
  id: string;
  title: string;
  type: 'job' | 'internship' | 'project' | 'hackathon' | 'competition' | 'fellowship' | 'collaboration';
  organization?: string;
  communityId?: string;
}

/**
 * Empty by design: content can arrive from a CMS or database without the site
 * presenting unverified communities, events, or opportunities as real.
 */
export const ecosystemData: {
  communities: CommunityRecord[];
  events: EventRecord[];
  opportunities: OpportunityRecord[];
} = {
  communities: [],
  events: [],
  opportunities: [],
};

export const ecosystemPeople = [
  ['Builders', 'Turn curiosity into things that work.'],
  ['Creators', 'Shape stories people want to share.'],
  ['Students', 'Find practical ways to grow.'],
  ['Innovators', 'Explore what comes next.'],
  ['Entrepreneurs', 'Move ideas toward momentum.'],
  ['Professionals', 'Give and gain perspective.'],
  ['Communities', 'Bring ambitious people together.'],
] as const;

export const programAreas = [
  ['AI & Emerging Technology', 'Explore the ideas changing how we build.'],
  ['Workshops & Learning', 'Build useful skills through practical learning.'],
  ['Hackathons & Innovation', 'Meet challenges with ideas, teams, and action.'],
  ['Events & Experiences', 'Make room for conversations that move things forward.'],
  ['Career & Opportunities', 'Find ways to contribute and grow.'],
  ['Startup & Founder Ecosystem', 'Connect early ideas with an ecosystem around them.'],
] as const;

export const participationPaths = [
  ['Build', 'For developers and makers.'],
  ['Create', 'For creators and storytellers.'],
  ['Learn', 'For students and curious minds.'],
  ['Lead', 'For community builders and future leaders.'],
  ['Start', 'For entrepreneurs and founders.'],
  ['Connect', 'For professionals and organizations.'],
] as const;
