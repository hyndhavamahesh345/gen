import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ExternalLink, Handshake } from 'lucide-react';
import { MockDataService } from '../../services/mockDataService';
import { Partner } from '../../types';
import { SectionHeader } from '../common/SectionHeader';

export const PartnershipsSection: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MockDataService.getPartners().then((data) => {
      setPartners(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="partners" className="partnerships-section section-pad">
      <div className="content-width">
        <SectionHeader
          kicker="11 / Ecosystem Partnerships"
          title={
            <>
              Collaborate &amp; <em>Partner.</em>
            </>
          }
          subtitle="Gentricks works with university chapters, corporate tech sponsors, and incubators to host hackathons, workshops, and hiring initiatives."
          action={
            <a
              href="mailto:collab@gentricks.in"
              className="button button-yellow"
            >
              <Handshake size={16} /> Partner With Us <ArrowUpRight size={17} />
            </a>
          }
        />

        {loading ? (
          <div className="loading-state">Loading Ecosystem Partners...</div>
        ) : (
          <div className="partners-grid">
            {partners.map((prt) => (
              <div className="partner-card" key={prt.id}>
                <div className="partner-logo-box">{prt.logo}</div>
                <span className="partner-cat-tag">{prt.category}</span>
                <h3>{prt.name}</h3>
                <p>{prt.description}</p>
                <a
                  href={prt.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partner-link"
                >
                  Inquire Collaboration <ExternalLink size={13} />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
