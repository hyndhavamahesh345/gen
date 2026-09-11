import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, Code, Network, Rocket } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';

const PILLARS = [
  {
    id: 'learn',
    number: '01',
    title: 'Learn',
    icon: BookOpen,
    tagline: 'Master frontier tech stack & building blocks',
    description: 'We host intensive workshops, speaker teardowns, and practical hands-on tracks across Agentic AI, Full-Stack Systems, Rust, Cloud Native, and Product Design.',
    highlights: ['Hands-on Workshops', 'Tech Teardowns', 'Frontier Stack Curriculum'],
  },
  {
    id: 'build',
    number: '02',
    title: 'Build',
    icon: Code,
    tagline: 'Turn raw ideas into production-grade projects',
    description: 'Stop building toy apps. We provide peer review, code architecture guidance, dev tooling credits, and open-source bounties to ship real products.',
    highlights: ['Student Project Gallery', 'Open Source Bounties', 'Code Reviews & Audits'],
  },
  {
    id: 'connect',
    number: '03',
    title: 'Connect',
    icon: Network,
    tagline: 'Find your co-founders, teammates & mentors',
    description: 'Join a cross-college network of passionate student developers, UI designers, researchers, and early operators eager to build together.',
    highlights: ['Teammate Matchmaking', 'Mentor Office Hours', 'University Chapters'],
  },
  {
    id: 'launch',
    number: '04',
    title: 'Launch',
    icon: Rocket,
    tagline: 'Scale from student prototype to funded startup',
    description: 'Our LaunchPad incubator gives student founders seed structure, pitch deck coaching, pilot customers, and direct introductions to angel investors.',
    highlights: ['LaunchPad Incubator', 'Demo Day Pitches', 'Angel & VC Network'],
  },
];

export const WhatIsGentricks: React.FC = () => {
  const [activePillar, setActivePillar] = useState(PILLARS[0]);

  return (
    <section id="mission" className="mission section-pad">
      <div className="content-width">
        <SectionHeader
          kicker="01 / Philosophy & Mission"
          title={
            <>
              Students have ideas.
              <br />
              <em>We build the ecosystem</em> around them.
            </>
          }
          subtitle="Talent is everywhere. Structured ecosystem support is not. Gentricks bridges the gap so ambitious student builders can move from zero to founder with confidence."
        />

        <div className="ticker-banner">
          <div className="ticker-item">LEARN</div>
          <span className="ticker-dot">•</span>
          <div className="ticker-item">BUILD</div>
          <span className="ticker-dot">•</span>
          <div className="ticker-item">CONNECT</div>
          <span className="ticker-dot">•</span>
          <div className="ticker-item">LAUNCH</div>
        </div>

        <div className="pillar-matrix">
          <div className="pillar-tabs">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              const isSelected = activePillar.id === pillar.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  className={`pillar-tab-btn ${isSelected ? 'is-active' : ''}`}
                  onClick={() => setActivePillar(pillar)}
                >
                  <div className="pillar-tab-top">
                    <span>{pillar.number}</span>
                    <Icon size={20} />
                  </div>
                  <h3>{pillar.title}</h3>
                  <p className="pillar-tab-sub">{pillar.tagline}</p>
                </button>
              );
            })}
          </div>

          <div className="pillar-detail-card">
            <div className="pillar-detail-header">
              <span className="pillar-badge">{activePillar.number} / CORE PILLAR</span>
              <h2>{activePillar.title}</h2>
              <p className="pillar-tagline">{activePillar.tagline}</p>
            </div>

            <p className="pillar-desc">{activePillar.description}</p>

            <div className="pillar-highlights">
              <h4>Ecosystem Deliverables:</h4>
              <ul>
                {activePillar.highlights.map((item) => (
                  <li key={item}>
                    <ArrowUpRight size={14} className="pillar-check" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
