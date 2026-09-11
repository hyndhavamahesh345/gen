import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { MockDataService } from '../../services/mockDataService';
import { MediaEpisode } from '../../types';
import { SectionHeader } from '../common/SectionHeader';

const TYPES = ['All', 'Podcast', 'YouTube Video'];

export const MediaContentSection: React.FC = () => {
  const [episodes, setEpisodes] = useState<MediaEpisode[]>([]);
  const [selectedType, setSelectedType] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    MockDataService.getMediaEpisodes(selectedType).then((data) => {
      setEpisodes(data);
      setLoading(false);
    });
  }, [selectedType]);

  return (
    <section id="media" className="media-section section-pad">
      <div className="content-width">
        <SectionHeader
          kicker="10 / Media &amp; Content Hub"
          title={
            <>
              Gentricks <em>Podcast &amp; Media.</em>
            </>
          }
          subtitle="In-depth founder stories, technical architecture teardowns, student builder interviews, and ecosystem event coverage."
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
          <div className="loading-state">Loading Media Episodes...</div>
        ) : (
          <div className="media-grid">
            {episodes.map((ep) => (
              <div className="media-card" key={ep.id}>
                <div className="media-thumb-wrap">
                  <img src={ep.thumbnailUrl} alt={ep.title} className="media-thumb" />
                  <span className="media-duration">{ep.duration}</span>
                  <a
                    href={ep.videoOrAudioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="play-overlay-btn"
                    aria-label={`Play ${ep.title}`}
                  >
                    <Play size={20} fill="#080808" />
                  </a>
                </div>

                <div className="media-card-body">
                  <div className="media-type-bar">
                    <span className="media-type-badge">{ep.type}</span>
                    <span className="media-date">{ep.publishedDate}</span>
                  </div>

                  <h3>{ep.title}</h3>
                  <p className="media-summary">{ep.summary}</p>

                  <div className="media-guest-box">
                    <strong>Featured Guest:</strong> {ep.guestName} ({ep.guestRole})
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
