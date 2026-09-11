import {
  MOCK_BUILDERS,
  MOCK_CREATORS,
  MOCK_EVENTS,
  MOCK_MEDIA_EPISODES,
  MOCK_OPPORTUNITIES,
  MOCK_PARTNERS,
  MOCK_PROJECTS,
  MOCK_STARTUPS,
} from '../data/mockData';
import {
  CreatorProfile,
  EventItem,
  IdeaSubmission,
  MediaEpisode,
  NewsletterSubscription,
  Opportunity,
  Partner,
  Profile,
  Project,
  Startup,
} from '../types';

const STORAGE_KEYS = {
  PROJECTS: 'gentricks_projects',
  STARTUPS: 'gentricks_startups',
  IDEAS: 'gentricks_idea_submissions',
  NEWSLETTER: 'gentricks_subscribers',
  RSVPS: 'gentricks_event_rsvps',
};

function getStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export class MockDataService {
  static async getBuilders(): Promise<Profile[]> {
    await new Promise((res) => setTimeout(res, 80));
    return MOCK_BUILDERS;
  }

  static async getCreators(categoryFilter?: string): Promise<CreatorProfile[]> {
    await new Promise((res) => setTimeout(res, 80));
    if (!categoryFilter || categoryFilter === 'All') return MOCK_CREATORS;
    return MOCK_CREATORS.filter((c) => c.category.toLowerCase() === categoryFilter.toLowerCase());
  }

  static async getMediaEpisodes(typeFilter?: string): Promise<MediaEpisode[]> {
    await new Promise((res) => setTimeout(res, 80));
    if (!typeFilter || typeFilter === 'All') return MOCK_MEDIA_EPISODES;
    return MOCK_MEDIA_EPISODES.filter((m) => m.type.toLowerCase() === typeFilter.toLowerCase());
  }

  static async getProjects(categoryFilter?: string): Promise<Project[]> {
    await new Promise((res) => setTimeout(res, 100));
    const customProjects = getStored<Project[]>(STORAGE_KEYS.PROJECTS, []);
    const all = [...customProjects, ...MOCK_PROJECTS];
    if (!categoryFilter || categoryFilter === 'All') return all;
    return all.filter((p) => p.category.toLowerCase() === categoryFilter.toLowerCase());
  }

  static async getStartups(stageFilter?: string): Promise<Startup[]> {
    await new Promise((res) => setTimeout(res, 100));
    const customStartups = getStored<Startup[]>(STORAGE_KEYS.STARTUPS, []);
    const all = [...customStartups, ...MOCK_STARTUPS];
    if (!stageFilter || stageFilter === 'All') return all;
    return all.filter((s) => s.stage.toLowerCase() === stageFilter.toLowerCase());
  }

  static async getOpportunities(typeFilter?: string): Promise<Opportunity[]> {
    await new Promise((res) => setTimeout(res, 80));
    if (!typeFilter || typeFilter === 'All') return MOCK_OPPORTUNITIES;
    return MOCK_OPPORTUNITIES.filter((o) => o.type.toLowerCase() === typeFilter.toLowerCase());
  }

  static async getEvents(typeFilter?: string): Promise<EventItem[]> {
    await new Promise((res) => setTimeout(res, 80));
    const rsvps = getStored<Record<string, number>>(STORAGE_KEYS.RSVPS, {});
    const events = MOCK_EVENTS.map((evt) => ({
      ...evt,
      rsvpCount: evt.rsvpCount + (rsvps[evt.id] || 0),
    }));
    if (!typeFilter || typeFilter === 'All') return events;
    return events.filter((e) => e.type.toLowerCase() === typeFilter.toLowerCase());
  }

  static async getPartners(): Promise<Partner[]> {
    await new Promise((res) => setTimeout(res, 60));
    return MOCK_PARTNERS;
  }

  static async submitIdea(payload: Omit<IdeaSubmission, 'id' | 'submittedAt'>): Promise<IdeaSubmission> {
    await new Promise((res) => setTimeout(res, 300));
    const newSubmission: IdeaSubmission = {
      ...payload,
      id: 'idea_' + Date.now(),
      submittedAt: new Date().toISOString(),
    };
    const current = getStored<IdeaSubmission[]>(STORAGE_KEYS.IDEAS, []);
    setStored(STORAGE_KEYS.IDEAS, [newSubmission, ...current]);
    return newSubmission;
  }

  static async subscribeNewsletter(email: string, interests?: string[]): Promise<boolean> {
    await new Promise((res) => setTimeout(res, 200));
    const current = getStored<NewsletterSubscription[]>(STORAGE_KEYS.NEWSLETTER, []);
    if (!current.some((sub) => sub.email.toLowerCase() === email.toLowerCase())) {
      current.push({ email, subscribedAt: new Date().toISOString(), interests });
      setStored(STORAGE_KEYS.NEWSLETTER, current);
    }
    return true;
  }

  static async rsvpEvent(eventId: string): Promise<boolean> {
    await new Promise((res) => setTimeout(res, 150));
    const rsvps = getStored<Record<string, number>>(STORAGE_KEYS.RSVPS, {});
    rsvps[eventId] = (rsvps[eventId] || 0) + 1;
    setStored(STORAGE_KEYS.RSVPS, rsvps);
    return true;
  }

  static async upvoteProject(projectId: string): Promise<number> {
    await new Promise((res) => setTimeout(res, 100));
    const projects = await this.getProjects();
    const target = projects.find((p) => p.id === projectId);
    if (target) {
      target.upvotes += 1;
      setStored(STORAGE_KEYS.PROJECTS, projects);
      return target.upvotes;
    }
    return 0;
  }
}
