import React from 'react';
import { ArrowUpRight, Award, Compass, ShieldCheck, Zap } from 'lucide-react';
import { SectionHeader } from '../common/SectionHeader';

const VALUES = [
  {
    icon: Zap,
    title: 'Velocity First',
    desc: 'We value shipping working code and prototype MVPs over endless theoretical slide decks.',
  },
  {
    icon: Compass,
    title: 'Open Ecosystem',
    desc: 'Inclusive across university chapters, domain disciplines, student creators, and technical backgrounds.',
  },
  {
    icon: ShieldCheck,
    title: 'Real Problems',
    desc: 'Focus on solving genuine real-world friction in software engineering, AI, hardware, and design.',
  },
  {
    icon: Award,
    title: 'Builder Integrity',
    desc: 'Authentic student talent, open-source collaboration, peer review, and transparent ecosystem support.',
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about-content" className="about-section section-pad">
      <div className="content-width">
        <SectionHeader
          kicker="15 / About Gentricks"
          title={
            <>
              Youth-Driven Technology &amp;
              <br />
              <em>Startup Ecosystem.</em>
            </>
          }
          subtitle="Gentricks is a student-driven technology, builder, creator, and startup ecosystem platform bridging student talent with real-world product creation."
        />

        <div className="about-grid">
          <div className="about-story-card">
            <h3>Our Ecosystem Origin</h3>
            <p>
              Traditional education arms students with theory, but leaves a gap when it comes to hands-on software craft, agentic systems, real product design, and venture building.
            </p>
            <p>
              Gentricks started as a humble student tech community and has evolved into an interconnected ecosystem encompassing skill workshops, open-source bounties, creator guilds, and the LaunchPad incubator.
            </p>
            <div className="about-quote">
              "Where Builders Become Founders is not just our motto — it is our operating philosophy."
            </div>
          </div>

          <div className="about-values-grid">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div className="value-card" key={val.title}>
                  <Icon size={24} className="val-icon" />
                  <h4>{val.title}</h4>
                  <p>{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
