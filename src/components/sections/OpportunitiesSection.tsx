import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Briefcase, Calendar, MapPin, Tag } from 'lucide-react';
import { MockDataService } from '../../services/mockDataService';
import { Opportunity } from '../../types';
import { SectionHeader } from '../common/SectionHeader';

interface OpportunitiesProps {
  onOpenJoinModal: () => void;
}

const TYPES = ['All', 'Fellowship', 'Internship', 'Hackathon'];

export const OpportunitiesSection: React.FC<OpportunitiesProps> = ({ onOpenJoinModal }) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedType, setSelectedType] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    MockDataService.getOpportunities(selectedType).then((data) => {
      setOpportunities(data);
      setLoading(false);
    });
  }, [selectedType]);

  return (
    <section id="opportunities" className="opportunities-section section-pad">
      <div className="content-width">
        <SectionHeader
          kicker="07 / Opportunities Hub"
          title={
            <>
              Internships, Fellowships &amp; <em>Grants.</em>
            </>
          }
          subtitle="A curated ecosystem board connecting vetted student builders with internships, hiring pipelines, hackathons, and technical grants."
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
          <div className="loading-state">Loading Opportunities...</div>
        ) : (
          <div className="opportunities-grid">
            {opportunities.map((opp) => (
              <div className="opportunity-card" key={opp.id}>
                <div className="opp-header">
                  <span className="opp-type-badge">{opp.type}</span>
                  <span className="opp-reward">{opp.stipendOrReward}</span>
                </div>

                <h3>{opp.title}</h3>

                <div className="opp-meta">
                  <span>
                    <Briefcase size={14} /> {opp.organization}
                  </span>
                  <span>
                    <MapPin size={14} /> {opp.location}
                  </span>
                  <span>
                    <Calendar size={14} /> Deadline: {opp.deadline}
                  </span>
                </div>

                <div className="opp-tags">
                  {opp.tags.map((tag) => (
                    <span className="opp-tag" key={tag}>
                      <Tag size={10} /> {tag}
                    </span>
                  ))}
                </div>

                <div className="opp-card-footer">
                  <button
                    type="button"
                    className="button button-yellow"
                    onClick={onOpenJoinModal}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Apply Now <ArrowUpRight size={15} />
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
