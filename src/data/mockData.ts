import {
  CityHub,
  CreatorProfile,
  EventItem,
  HackathonItem,
  MediaEpisode,
  Opportunity,
  Partner,
  Profile,
  Project,
  Startup,
} from '../types';

/**
 * Legacy section components still import these exports. They deliberately
 * contain no records so that unverified sample people, places, events,
 * opportunities, partners, and statistics can never reach the website.
 */
export const MOCK_CREATORS: CreatorProfile[] = [];
export const MOCK_MEDIA_EPISODES: MediaEpisode[] = [];
export const MOCK_HACKATHONS: HackathonItem[] = [];
export const MOCK_CITY_HUBS: CityHub[] = [];
export const MOCK_BUILDERS: Profile[] = [];
export const MOCK_PROJECTS: Project[] = [];
export const MOCK_STARTUPS: Startup[] = [];
export const MOCK_OPPORTUNITIES: Opportunity[] = [];
export const MOCK_EVENTS: EventItem[] = [];
export const MOCK_PARTNERS: Partner[] = [];
