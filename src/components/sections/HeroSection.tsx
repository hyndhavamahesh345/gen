import React from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Code2, Lightbulb, Rocket, Sparkles, Users } from 'lucide-react';

interface HeroSectionProps {
  onOpenSubmitIdea: () => void;
  onOpenJoinModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenSubmitIdea,
  onOpenJoinModal,
}) => {
  return (
    <section className="hero section-pad">
      <div className="hero-grid" />
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />

      <div className="hero-content">
        <div className="eyebrow">
          <span className="eyebrow-dot" /> Student Technology &amp; Startup Ecosystem
        </div>

        <h1>
          Where <span>Builders</span> Become <span>Founders.</span>
        </h1>

        <p className="hero-copy">
          Gentricks is a student-driven technology, builder, and startup ecosystem. Learn raw skills, build ambitious products, connect with top collaborators, and launch real startups.
        </p>

        <div className="hero-actions">
          <button
            type="button"
            className="button button-yellow"
            onClick={onOpenJoinModal}
          >
            Join Ecosystem <ArrowUpRight size={17} />
          </button>

          <button
            type="button"
            className="button button-ghost"
            onClick={onOpenSubmitIdea}
          >
            <Lightbulb size={17} /> Submit an Idea
          </button>

          <a className="button button-ghost" href="#mission">
            Our Philosophy <ArrowRight size={17} />
          </a>
        </div>

        <div className="hero-proof">
          <div className="proof-dots">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <p>
            <strong>2,800+ Student Builders</strong>
            <br />
            learning, building &amp; launching together
          </p>
        </div>
      </div>

      <div className="hero-art" aria-hidden="true">
        <div className="art-ring ring-one" />
        <div className="art-ring ring-two" />
        <div className="art-ring ring-three" />

        <div className="art-center">
          <img src="/Gentricks_Logo.jpg" alt="GENTRICKS" />
          <span>
            LEARN
            <br />
            BUILD
            <br />
            CONNECT
            <br />
            LAUNCH
          </span>
        </div>

        <div className="orbit-label label-top">
          <Sparkles size={14} /> 1. Learn Skills
        </div>
        <div className="orbit-label label-right">
          <Code2 size={14} /> 2. Build Products
        </div>
        <div className="orbit-label label-bottom">
          <Users size={14} /> 3. Connect Teams
        </div>
        <div className="orbit-label label-left">
          <Rocket size={14} /> 4. Launch Startups
        </div>
      </div>

      <a className="scroll-cue" href="#mission">
        <ArrowDownRight size={18} /> Scroll to Explore Ecosystem
      </a>
    </section>
  );
};
