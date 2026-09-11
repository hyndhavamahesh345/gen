import React, { useEffect, useState } from 'react';
import { ArrowUpRight, CheckCircle2, Lightbulb, Rocket, ShieldCheck, Zap } from 'lucide-react';
import { MockDataService } from '../../services/mockDataService';
import { Startup } from '../../types';
import { SectionHeader } from '../common/SectionHeader';

interface StartupsProps {
  onOpenSubmitIdea: () => void;
}

const STAGES = ['All', 'Idea', 'Validation', 'Prototype', 'MVP', 'Launch'];

const STAGE_PIPELINE = [
  { stage: 'Idea', icon: Lightbulb, label: '01 / Idea Pitch' },
  { stage: 'Validation', icon: ShieldCheck, label: '02 / Market Proof' },
  { stage: 'Prototype', icon: Zap, label: '03 / Tech Alpha' },
  { stage: 'MVP', icon: CheckCircle2, label: '04 / Live Beta' },
  { stage: 'Launch', icon: Rocket, label: '05 / Market Launch' },
];

export const StartupsSection: React.FC<StartupsProps> = ({ onOpenSubmitIdea }) => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [selectedStage, setSelectedStage] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    MockDataService.getStartups(selectedStage).then((data) => {
      setStartups(data);
      setLoading(false);
    });
  }, [selectedStage]);

  return (
    <section id="startups" className="startups-section section-pad launchpad">
      <div className="content-width">
        <SectionHeader
          kicker="03 / Startups &amp; LaunchPad"
          title={
            <>
              From Student Prototype
              <br />
              <em>to Scalable Startup.</em>
            </>
          }
          subtitle="The Gentricks LaunchPad incubator guides student founders through a structured 5-stage pipeline with mentor reviews, technical guidance, and grant support."
          action={
            <button
              type="button"
              className="button button-yellow"
              onClick={onOpenSubmitIdea}
            >
              <Lightbulb size={16} /> Apply to LaunchPad <ArrowUpRight size={17} />
            </button>
          }
        />

        <div className="pipeline-wrapper">
          <div className="pathway-grid">
            {STAGE_PIPELINE.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.stage} className="pathway-card">
                  <span className="pathway-num">{p.label}</span>
                  <div className="pathway-title-row">
                    <Icon size={20} className="pathway-icon" />
                    <h4>{p.stage} Stage</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="type-filters" style={{ marginTop: '40px' }}>
          {STAGES.map((stg) => (
            <button
              key={stg}
              type="button"
              className={`type-filter-btn ${selectedStage === stg ? 'is-active' : ''}`}
              onClick={() => setSelectedStage(stg)}
            >
              {stg}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-state">Loading LaunchPad Startups...</div>
        ) : (
          <div className="startups-grid">
            {startups.map((st) => (
              <div className="startup-card" key={st.id}>
                <div className="startup-card-top">
                  <div className="startup-logo">{st.logo}</div>
                  <span className="stage-pill">{st.stage} Stage</span>
                </div>

                <h3>{st.name}</h3>
                <p className="startup-oneliner">{st.oneLiner}</p>
                <p className="startup-desc">{st.description}</p>

                <div className="founders-list">
                  <strong>Founders:</strong> {st.founders.join(', ')}
                </div>

                <div className="seeking-tags">
                  <span>Seeking:</span>
                  {st.seeking.map((tag) => (
                    <span className="seek-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
