import React, { useEffect, useState } from 'react';
import { ArrowUpRight, AtSign, Code2, Mail, Network, Share2 } from 'lucide-react';
import { MockDataService } from '../../services/mockDataService';
import { Profile } from '../../types';
import { SectionHeader } from '../common/SectionHeader';

interface CommunityProps {
  onOpenJoinModal: () => void;
}

export const CommunitySection: React.FC<CommunityProps> = ({ onOpenJoinModal }) => {
  const [builders, setBuilders] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MockDataService.getBuilders().then((data) => {
      setBuilders(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="community" className="community-section section-pad">
      <div className="content-width">
        <SectionHeader
          kicker="12 / Builder Community"
          title={
            <>
              Connect with <em>Student Innovators.</em>
            </>
          }
          subtitle="Meet the student developers, designers, AI researchers, and founders building open projects across campus chapters."
          action={
            <button
              type="button"
              className="button button-yellow"
              onClick={onOpenJoinModal}
            >
              Join Guild <ArrowUpRight size={17} />
            </button>
          }
        />

        <div className="community-connect-bar">
          <div className="connect-info">
            <h4>Official Gentricks Channels</h4>
            <p>Connect directly with our community managers, chapter hosts, and builder guilds.</p>
          </div>

          <div className="social-links-row">
            <a
              href="https://www.instagram.com/gentricks__/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
            >
              <AtSign size={20} />
              <span>@gentricks__</span>
            </a>

            <a
              href="https://www.linkedin.com/in/gentricks-7b7a77426/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
            >
              <Share2 size={20} />
              <span>LinkedIn</span>
            </a>

            <a href="mailto:support@gentricks.in" className="social-card">
              <Mail size={20} />
              <span>support@gentricks.in</span>
            </a>

            <a href="mailto:collab@gentricks.in" className="social-card">
              <Network size={20} />
              <span>collab@gentricks.in</span>
            </a>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">Loading Builder Directory...</div>
        ) : (
          <div className="builders-grid" style={{ marginTop: '40px' }}>
            {builders.map((b) => (
              <div className="builder-card" key={b.id}>
                <div className="builder-card-top">
                  <img src={b.avatar} alt={b.name} className="builder-avatar" />
                  <div>
                    <h3>{b.name}</h3>
                    <span className="builder-role">{b.role}</span>
                  </div>
                </div>

                <div className="builder-college">{b.collegeOrCompany}</div>

                <div className="builder-skills">
                  {b.skills.map((skill) => (
                    <span className="skill-tag" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>

                {b.featuredProject && (
                  <div className="builder-proj">
                    <strong>Project:</strong> {b.featuredProject}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
