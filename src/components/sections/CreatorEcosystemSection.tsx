import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import { MockDataService } from '../../services/mockDataService';
import { CreatorProfile } from '../../types';
import { SectionHeader } from '../common/SectionHeader';

interface CreatorSectionProps {
  onOpenJoinModal: () => void;
}

const CATEGORIES = ['All', 'UI/UX Designer', 'YouTuber', 'Filmmaker', 'Musician'];

export const CreatorEcosystemSection: React.FC<CreatorSectionProps> = ({ onOpenJoinModal }) => {
  const [creators, setCreators] = useState<CreatorProfile[]>([]);
  const [selectedCat, setSelectedCat] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    MockDataService.getCreators(selectedCat).then((data) => {
      setCreators(data);
      setLoading(false);
    });
  }, [selectedCat]);

  return (
    <section id="creators" className="creators-section section-pad">
      <div className="content-width">
        <SectionHeader
          kicker="09 / Creator Ecosystem"
          title={
            <>
              Where Creators &amp; <em>Artists Connect.</em>
            </>
          }
          subtitle="Empowering YouTubers, UI/UX designers, filmmakers, musicians, digital artists, and writers to collaborate with tech builders and founders."
          action={
            <button
              type="button"
              className="button button-yellow"
              onClick={onOpenJoinModal}
            >
              <Sparkles size={16} /> Join Creator Ecosystem <ArrowUpRight size={17} />
            </button>
          }
        />

        <div className="type-filters">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              className={`type-filter-btn ${selectedCat === c ? 'is-active' : ''}`}
              onClick={() => setSelectedCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-state">Loading Creator Ecosystem...</div>
        ) : (
          <div className="creators-grid">
            {creators.map((cr) => (
              <div className="creator-card" key={cr.id}>
                <div className="creator-card-top">
                  <img src={cr.avatar} alt={cr.name} className="creator-avatar" />
                  <span className="creator-cat-pill">{cr.category}</span>
                </div>

                <h3>{cr.name}</h3>
                <span className="creator-handle">{cr.handle}</span>
                <p className="creator-bio">{cr.bio}</p>

                <div className="creator-featured-work">
                  <strong>Featured Work:</strong> {cr.featuredWork}
                </div>

                <div className="creator-card-footer">
                  <span className="creator-reach">{cr.followersOrReach}</span>
                  {cr.portfolioUrl && (
                    <a
                      href={cr.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="creator-portfolio-link"
                    >
                      Portfolio <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
