import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Mail, Sparkles } from 'lucide-react';
import { MockDataService } from '../../services/mockDataService';
import { SectionHeader } from '../common/SectionHeader';

interface JoinProps {
  onShowToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export const JoinSection: React.FC<JoinProps> = ({ onShowToast }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onShowToast('Please enter a valid email address.', 'error');
      return;
    }

    setLoading(true);
    await MockDataService.subscribeNewsletter(email);
    setLoading(false);
    setSubscribed(true);
    onShowToast('Welcome to Gentricks Ecosystem Digest!', 'success');
  };

  return (
    <section id="join" className="join-section section-pad">
      <div className="content-width">
        <SectionHeader
          kicker="13 / Join Gentricks"
          title={
            <>
              Subscribe to the
              <br />
              <em>Gentricks Builder Digest.</em>
            </>
          }
          subtitle="Get weekly updates on student hackathons, open-source bounties, LaunchPad cohort entries, and technical workshops."
        />

        <div className="join-card-box">
          {subscribed ? (
            <div className="subscribe-success">
              <CheckCircle2 size={40} className="success-icon" />
              <h3>You're on the list!</h3>
              <p>Thank you for joining the Gentricks Ecosystem. We will keep you updated on upcoming hackathons and builder opportunities.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="join-form">
              <div className="input-group">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  placeholder="Enter your email address (e.g. builder@student.edu)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="button button-yellow"
                disabled={loading}
              >

                {loading ? 'Subscribing...' : 'Join Builder Digest'} <ArrowUpRight size={17} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
