import { ArrowUpRight, Code2, Flag, GraduationCap, Network, Palette, Rocket } from 'lucide-react';
import { useState } from 'react';
import { participationPaths } from '../data/ecosystem';
import { submitCommunityMember } from '../services/supabase';

const pathIcons = [Code2, Palette, GraduationCap, Flag, Rocket, Network];

export function Homepage() {
  const [joinForm, setJoinForm] = useState({ full_name: '', email: '', city: '', role: '', interests: '', consent: false });
  const [joinStatus, setJoinStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleJoinSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setJoinStatus('submitting');
    try {
      await submitCommunityMember({ ...joinForm, state: 'Andhra Pradesh' });
      setJoinStatus('success');
    } catch {
      setJoinStatus('error');
    }
  };

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span aria-hidden="true" /> A technology and innovation ecosystem</p>
            <h1 id="hero-title">Where the Next Generation <em>Connects, Creates,</em> and Leads.</h1>
            <p className="hero-description">GENTRICKS is a technology-driven ecosystem for builders, creators, innovators, entrepreneurs, and future leaders.</p>
            <div className="hero-actions">
              <a href="#join" className="button button-primary">Join GENTRICKS <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
            <p className="hero-note">Starting in Andhra Pradesh. Built to grow with people.</p>
          </div>
          <figure className="hero-visual hero-image-visual">
            <img src="https://images.pexels.com/photos/6804068/pexels-photo-6804068.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="A real technology team collaborating around computers in a modern workspace." width="1600" height="1067" fetchPriority="high" />
            <figcaption className="hero-image-caption"><span>01 / GENTRICKS SIGNAL</span><span>People · Ideas · Impact</span></figcaption>
          </figure>
        </div>
        <div className="site-container hero-manifesto" aria-label="GENTRICKS values"><span>People before profiles.</span><span>Ideas into action.</span><span>Ambition with community.</span></div>
      </section>

      <section className="intro section-space" aria-labelledby="intro-title">
        <div className="site-container intro-grid">
          <p className="intro-marker">01 <span>INTRODUCTION</span></p>
          <div><h2 id="intro-title">A place to move from potential to <em>possibility.</em></h2></div>
          <p className="intro-copy">GENTRICKS brings people, technology, and ideas into the same conversation—so the next generation can learn, make, collaborate, and lead with intent.</p>
        </div>
      </section>

      <section className="paths" aria-labelledby="paths-title">
        <div className="site-container">
          <div className="paths-heading"><p className="eyebrow"><span aria-hidden="true" /> Choose your way in</p><h2 id="paths-title">Come as you are. <em>Grow from there.</em></h2></div>
          <div className="paths-grid">{participationPaths.map(([title, description], index) => { const Icon = pathIcons[index]; return <article className="path-card" key={title}><Icon size={26} aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article>; })}</div>
        </div>
      </section>

      <section id="join" className="join-section" aria-labelledby="join-title">
        <div className="site-container join-card">
          <div className="join-card-copy"><p className="eyebrow eyebrow-dark"><span aria-hidden="true" /> The next generation is already in motion</p><h2 id="join-title">Bring your curiosity. <br />Bring your <em>next idea.</em></h2></div>
          {joinStatus === 'success' ? (
            <div className="join-success" role="status"><strong>You’re on the list.</strong><span>We’ll keep you close to what comes next.</span></div>
          ) : (
            <form className="join-form" onSubmit={handleJoinSubmit}>
              <div className="join-form-grid">
                <label><span>Full name</span><input required value={joinForm.full_name} onChange={(event) => setJoinForm({ ...joinForm, full_name: event.target.value })} /></label>
                <label><span>Email</span><input required type="email" value={joinForm.email} onChange={(event) => setJoinForm({ ...joinForm, email: event.target.value })} /></label>
                <label><span>City</span><input required value={joinForm.city} onChange={(event) => setJoinForm({ ...joinForm, city: event.target.value })} /></label>
                <label><span>I am a</span><select required value={joinForm.role} onChange={(event) => setJoinForm({ ...joinForm, role: event.target.value })}><option value="">Choose one</option><option>Student</option><option>Builder</option><option>Creator</option><option>Founder</option><option>Professional</option><option>Community</option></select></label>
              </div>
              <label className="join-interest"><span>Interested in</span><select required value={joinForm.interests} onChange={(event) => setJoinForm({ ...joinForm, interests: event.target.value })}><option value="">Choose an area</option><option>Events and workshops</option><option>Hackathons and projects</option><option>Community</option><option>Opportunities</option><option>Startup ecosystem</option></select></label>
              <label className="join-consent"><input required type="checkbox" checked={joinForm.consent} onChange={(event) => setJoinForm({ ...joinForm, consent: event.target.checked })} /><span>I agree to receive relevant GENTRICKS updates.</span></label>
              <button type="submit" className="button button-dark" disabled={joinStatus === 'submitting'}>{joinStatus === 'submitting' ? 'Saving…' : 'Join GENTRICKS'} <ArrowUpRight size={18} aria-hidden="true" /></button>
              {joinStatus === 'error' && <small className="join-error">We couldn’t save your response yet. Please try again.</small>}
            </form>
          )}
        </div>
      </section>
    </>
  );
}
