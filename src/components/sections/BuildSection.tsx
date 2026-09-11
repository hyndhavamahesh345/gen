import React from 'react';
import { ArrowUpRight, Cpu, Layers, Terminal } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';

const PROGRAMS = [
  {
    code: 'MOD // 01',
    title: 'Frontier Tech Workshops',
    category: 'Learn & Master',
    desc: 'Intensive 2-day live technical workshops on Agentic AI, PyTorch, Systems Programming, and Web3 Protocols.',
  },
  {
    code: 'MOD // 02',
    title: 'Builder Community & Guilds',
    category: 'Connect & Network',
    desc: 'Join specialized domain guilds for AI engineers, full-stack builders, hardware geeks, and UI designers.',
  },
  {
    code: 'MOD // 03',
    title: 'Speaker Teardown Sessions',
    category: 'Knowledge Exchange',
    desc: 'Architectural teardowns and interactive Q&A sessions with senior engineers, AI architects, and tech leads.',
  },
  {
    code: 'MOD // 04',
    title: 'LaunchPad Incubator',
    category: 'Zero to Founder',
    desc: 'A structured 5-stage incubator guiding student teams from idea validation to prototype, MVP, and user launch.',
  },
  {
    code: 'MOD // 05',
    title: 'Internships & Fellowships',
    category: 'Career Acceleration',
    desc: 'Direct hiring pipelines connecting vetted Gentricks builders with fast-growing startups and innovation labs.',
  },
  {
    code: 'MOD // 06',
    title: 'Open Source Bounties',
    category: 'Earn & Contribute',
    desc: 'Paid open-source micro-bounties and technical challenges funded by partner protocols and sponsors.',
  },
];

const TRACKS = [
  {
    icon: Cpu,
    title: 'Agentic AI & Autonomy',
    desc: 'Multi-agent orchestration, function calling, tool use, PyTorch & LangChain.',
  },
  {
    icon: Terminal,
    title: 'Systems & Kernel Engineering',
    desc: 'Rust, WebAssembly runtime compilation, low-level memory safety, and C++.',
  },
  {
    icon: Layers,
    title: 'Cloud Native & Edge Infrastructure',
    desc: 'PostgreSQL, CRDT sync engines, Docker containers, Next.js 15, and WebSockets.',
  },
];

export const BuildSection: React.FC = () => {
  return (
    <section id="build" className="build-section section-pad">
      <div className="content-width">
        <SectionHeader
          kicker="02 / Technology &amp; Innovation"
          title={
            <>
              Master frontier tech.
              <br />
              <em>Ship production code.</em>
            </>
          }
          subtitle="Gentricks equips student developers with hands-on technical curriculum, open-source bounties, and peer code reviews to build real-world software."
        />

        <div className="program-grid">
          {PROGRAMS.map((prog) => (
            <div className="program-card" key={prog.code}>
              <div className="card-top">
                <span>{prog.code}</span>
              </div>
              <span className="module-badge">{prog.category}</span>
              <h3>{prog.title}</h3>
              <p>{prog.desc}</p>
              <ArrowUpRight size={18} className="card-arrow" />
            </div>
          ))}
        </div>

        <div className="tech-tracks-box">
          <h3>Frontier Stack Pathways</h3>
          <div className="tech-tracks-grid">
            {TRACKS.map((trk) => {
              const Icon = trk.icon;
              return (
                <div className="track-pill-card" key={trk.title}>
                  <Icon size={24} className="track-icon" />
                  <div>
                    <strong>{trk.title}</strong>
                    <span>{trk.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
