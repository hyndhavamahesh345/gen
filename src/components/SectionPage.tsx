import { ArrowRight, ArrowUpRight, BookOpen, BrainCircuit, Briefcase, Code2, Flag, GraduationCap, Layers3, Lightbulb, Network, Palette, Rocket, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { ecosystemData, ecosystemPeople, programAreas } from '../data/ecosystem';
import { EcosystemVisual } from './EcosystemVisual';

export type SectionPageName = 'ecosystem' | 'programs' | 'events' | 'community' | 'opportunities';

const programIcons = [BrainCircuit, BookOpen, Lightbulb, Sparkles, Briefcase, Rocket];
const eventFormats = ['Technology Events', 'AI Events', 'Hackathons', 'Startup Events', 'Workshops', 'Community Meetups', 'Creator Experiences', 'Summits'];
const opportunityTypes = ['Jobs', 'Internships', 'Projects', 'Hackathons', 'Competitions', 'Fellowships', 'Collaborations', 'Startup opportunities'];

function PageHero({ label, title, copy }: { label: string; title: string; copy: string }) {
  return <section className="page-hero"><div className="site-container"><p className="eyebrow hero-eyebrow"><span aria-hidden="true" /> {label}</p><h1>{title}</h1><p>{copy}</p></div></section>;
}

function SectionLead({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="section-lead"><p className="eyebrow"><span aria-hidden="true" /> {eyebrow}</p><h2>{title}</h2>{copy && <p className="section-copy">{copy}</p>}</div>;
}

export function SectionPage({ page }: { page: SectionPageName }) {
  if (page === 'ecosystem') return <EcosystemPage />;
  if (page === 'programs') return <ProgramsPage />;
  if (page === 'events') return <EventsPage />;
  if (page === 'community') return <CommunityPage />;
  if (page === 'opportunities') return <OpportunitiesPage />;
  return <EcosystemPage />;
}

function EcosystemPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeName, activeDescription] = ecosystemPeople[activeIndex];

  return <><PageHero label="The GENTRICKS ecosystem" title="One Ecosystem. Many Paths." copy="There is no single way to participate. Find people, ideas, and directions that make sense for you." /><section className="ecosystem section-space"><div className="site-container ecosystem-layout"><div className="people-list">{ecosystemPeople.map(([name, description], index) => <button className={'person-row person-' + index + (index === activeIndex ? ' is-active' : '')} key={name} type="button" onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onClick={() => setActiveIndex(index)}><span className="person-number">0{index + 1}</span><span className="person-copy"><strong>{name}</strong><small>{description}</small></span><ArrowUpRight size={18} aria-hidden="true" /></button>)}</div><div className="ecosystem-feature"><EcosystemVisual kind={activeName} /><p className="ecosystem-feature-copy">{activeDescription}</p></div></div></section></>;
}

function ProgramsPage() {
  return <><PageHero label="What we do" title="Make room for what is next." copy="Focused experiences at the intersection of technology, learning, community, and impact." /><section className="programs section-space"><div className="site-container"><div className="program-grid">{programAreas.map(([title, description], index) => { const Icon = programIcons[index]; return <article className={'program-card program-card-' + index} key={title}><Icon size={28} aria-hidden="true" /><span>0{index + 1}</span><h2>{title}</h2><p>{description}</p><ArrowRight size={19} aria-hidden="true" /></article>; })}</div></div></section></>;
}

function EventsPage() {
  const hasEvents = ecosystemData.events.length > 0;
  return <><PageHero label="Experiences / Events" title="Ideas are better when they happen together." copy="Future GENTRICKS experiences will bring technology, learning, builders, and culture into the same room." /><section className="events section-space"><div className="site-container events-layout"><div className="format-list" aria-label="Future experience categories">{eventFormats.map((format) => <span key={format}>{format}</span>)}</div><div className="empty-state event-state"><div className="empty-state-top"><CalendarIcon /><span>UPCOMING EXPERIENCES</span></div><div className="signal-lines" aria-hidden="true"><i /><i /><i /><i /></div><h2>{hasEvents ? 'New experiences are being prepared.' : 'Something is being built.'}</h2><p>Join GENTRICKS to be close to what comes next.</p><a href="#join" className="text-link">Join GENTRICKS <ArrowUpRight size={17} aria-hidden="true" /></a></div></div></section></>;
}

function CommunityPage() {
  return <><PageHero label="Community" title="Find Your Community." copy="Connect with builders, creators, innovators, entrepreneurs, and people shaping what comes next." /><section className="community section-space"><div className="site-container community-layout"><div className="community-copy"><SectionLead eyebrow="Starting with people" title="Build with people who care." copy="GENTRICKS begins in Andhra Pradesh, close to the people and ideas we can serve well." /><a href="#join" className="button button-dark">Build With GENTRICKS <ArrowUpRight size={17} aria-hidden="true" /></a></div><div className="growth-map" aria-label="GENTRICKS is beginning in Andhra Pradesh"><p>Our starting point</p><div className="starting-point"><div className="starting-point-mark" aria-hidden="true">AP</div><div className="starting-point-copy"><span>Beginning here</span><strong>Andhra Pradesh</strong><p>Starting close to the people and ideas we can serve well.</p></div></div><small>Built through real people, real participation, and shared momentum.</small></div></div></section></>;
}

function OpportunitiesPage() {
  const hasOpportunities = ecosystemData.opportunities.length > 0;
  return <><PageHero label="Opportunities" title="The right opportunity can change your direction." copy="This space is designed to connect people with ways to contribute, learn, collaborate, and move forward." /><section className="opportunities section-space"><div className="site-container opportunities-layout"><div className="opportunities-board"><div className="board-label"><Layers3 size={17} aria-hidden="true" /> Opportunity board</div><div className="opportunity-types">{opportunityTypes.map((type, index) => <span key={type}>0{index + 1} / {type}</span>)}</div><div className="board-empty"><p>{hasOpportunities ? 'New opportunities are being organized.' : 'Opportunity listings will appear here when published.'}</p><a href="#join" className="text-link">Join GENTRICKS <ArrowUpRight size={17} aria-hidden="true" /></a></div></div></div></section></>;
}

function CalendarIcon() { return <span className="calendar-glyph" aria-hidden="true"><i /><i /></span>; }
