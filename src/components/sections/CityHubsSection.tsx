import React from 'react';
import { ArrowUpRight, MapPin, Users } from 'lucide-react';
import { MOCK_CITY_HUBS } from '../../data/mockData';
import { SectionHeader } from '../common/SectionHeader';

interface CityHubsProps {
  onOpenJoinModal: () => void;
}

export const CityHubsSection: React.FC<CityHubsProps> = ({ onOpenJoinModal }) => {
  return (
    <section id="city-hubs" className="city-hubs-section section-pad">
      <div className="content-width">
        <SectionHeader
          kicker="06 / City Guilds &amp; Meetups"
          title={
            <>
              Connect with Regional <em>Builder Guilds.</em>
            </>
          }
          subtitle="Gentricks operates active student developer nodes across major technology hubs, holding in-person meetups, hackathons, and founder sessions."
        />

        <div className="city-hubs-grid">
          {MOCK_CITY_HUBS.map((hub) => (
            <div className="city-hub-card" key={hub.id}>
              <div className="hub-header">
                <MapPin size={22} className="hub-pin-icon" />
                <div>
                  <h3>{hub.city}</h3>
                  <span className="hub-members">
                    <Users size={13} /> {hub.membersCount}
                  </span>
                </div>
              </div>

              <div className="hub-lead-box">
                <strong>Chapter Lead:</strong> {hub.leadName} ({hub.leadRole})
              </div>

              <div className="hub-footer">
                <span className="events-count">{hub.eventsCount} Guild Events</span>
                <button
                  type="button"
                  className="join-hub-btn"
                  onClick={onOpenJoinModal}
                >
                  Join Guild <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
