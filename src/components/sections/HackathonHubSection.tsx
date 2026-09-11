import React from 'react';
import { ArrowUpRight, Calendar, Sparkles, Trophy, Users } from 'lucide-react';
import { MOCK_HACKATHONS } from '../../data/mockData';
import { SectionHeader } from '../common/SectionHeader';

interface HackathonSectionProps {
  onOpenJoinModal: () => void;
}

export const HackathonHubSection: React.FC<HackathonSectionProps> = ({ onOpenJoinModal }) => {
  return (
    <section id="hackathons" className="hackathons-section section-pad">
      <div className="content-width">
        <SectionHeader
          kicker="05 / Hackathons &amp; Bounties"
          title={
            <>
              Build, Compete &amp; <em>Win Bounties.</em>
            </>
          }
          subtitle="Join Gentricks hackathons, open-source sprints, and technical bounty challenges to build projects and earn grants."
          action={
            <button
              type="button"
              className="button button-yellow"
              onClick={onOpenJoinModal}
            >
              <Sparkles size={16} /> Enter Next Hackathon <ArrowUpRight size={17} />
            </button>
          }
        />

        <div className="hackathons-grid">
          {MOCK_HACKATHONS.map((hk) => (
            <div className="hackathon-card" key={hk.id}>
              <div className="hackathon-card-top">
                <span className={`status-badge ${hk.status === 'LIVE NOW' ? 'is-live' : ''}`}>
                  {hk.status}
                </span>
                <span className="prize-badge">
                  <Trophy size={14} /> {hk.prizePool}
                </span>
              </div>

              <h3>{hk.title}</h3>
              <p className="hackathon-desc">{hk.description}</p>

              <div className="hackathon-meta">
                <span>
                  <Calendar size={14} /> {hk.startDate}
                </span>
                <span>
                  <Users size={14} /> {hk.participantsCount} Registered Builders
                </span>
              </div>

              <div className="hackathon-tags">
                {hk.tags.map((tag) => (
                  <span className="h-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="hackathon-card-footer">
                <span className="organizer-name">By {hk.organizer}</span>
                <button
                  type="button"
                  className="register-btn"
                  onClick={onOpenJoinModal}
                >
                  Register Now <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
