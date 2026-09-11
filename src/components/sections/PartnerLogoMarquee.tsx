import React from 'react';

const PILLARS = [
  { name: 'Community', icon: '👥' },
  { name: 'Technology & Innovation', icon: '💻' },
  { name: 'Building & Hackathons', icon: '🏗️' },
  { name: 'Startups & LaunchPad', icon: '🚀' },
  { name: 'Events & Summits', icon: '🎤' },
  { name: 'Creator Ecosystem', icon: '🎨' },
  { name: 'Media & Podcasts', icon: '📢' },
  { name: 'Opportunities Board', icon: '🎯' },
  { name: 'Partnerships & Guilds', icon: '🤝' },
];

export const PartnerLogoMarquee: React.FC = () => {
  return (
    <section className="partner-marquee-section border-b border-border">
      <div className="marquee-label-bar content-width">
        <p>
          Youth-driven Technology, Innovation, Creator, Community, and Startup Ecosystem.
        </p>
      </div>

      <div className="marquee-track-container" aria-hidden="true">
        <div className="marquee-track">
          {PILLARS.concat(PILLARS).map((pillar, idx) => (
            <div className="marquee-item" key={pillar.name + '_' + idx}>
              <span className="marquee-icon">{pillar.icon}</span>
              <span className="marquee-text">{pillar.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
