import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { MockDataService } from '../../services/mockDataService';
import { EventItem } from '../../types';
import { SectionHeader } from '../common/SectionHeader';

interface EventsProps {
  onRSVP: (event: EventItem) => void;
}

const TYPES = ['All', 'Workshop', 'Pitch Night'];

export const EventsSection: React.FC<EventsProps> = ({ onRSVP }) => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedType, setSelectedType] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    MockDataService.getEvents(selectedType).then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, [selectedType]);

  return (
    <section id="events" className="events-section section-pad">
      <div className="content-width">
        <SectionHeader
          kicker="08 / Events Agenda"
          title={
            <>
              Workshops, Teardowns &amp; <em>Pitch Nights.</em>
            </>
          }
          subtitle="Join Gentricks technical workshops, speaker teardowns, demo days, and founder sessions."
        />

        <div className="type-filters">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              className={`type-filter-btn ${selectedType === t ? 'is-active' : ''}`}
              onClick={() => setSelectedType(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-state">Loading Events Agenda...</div>
        ) : (
          <div className="events-grid">
            {events.map((evt) => (
              <div className="event-card" key={evt.id}>
                <div className="event-header">
                  <span className="event-type-badge">{evt.type}</span>
                  <span className="event-rsvp-counter">
                    <Users size={12} /> {evt.rsvpCount} / {evt.capacity} RSVPs
                  </span>
                </div>

                <h3>{evt.title}</h3>

                {evt.speakerOrHost && (
                  <div className="event-speaker">
                    <strong>Speaker:</strong> {evt.speakerOrHost}
                  </div>
                )}

                <p className="event-desc">{evt.description}</p>

                <div className="event-meta">
                  <span>
                    <Calendar size={14} /> {evt.date}
                  </span>
                  <span>
                    <Clock size={14} /> {evt.time}
                  </span>
                  <span>
                    <MapPin size={14} /> {evt.location}
                  </span>
                </div>

                <div className="event-card-footer">
                  <button
                    type="button"
                    className="button button-yellow"
                    onClick={() => onRSVP(evt)}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Reserve Seat <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
