import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Lightbulb } from 'lucide-react';
import { MockDataService } from '../../services/mockDataService';
import { SectionHeader } from '../common/SectionHeader';

interface SubmitIdeaProps {
  onShowToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export const SubmitIdeaSection: React.FC<SubmitIdeaProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'AI',
    problemStatement: '',
    proposedSolution: '',
    targetAudience: '',
    teamMembers: '',
    contactEmail: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.problemStatement || !formData.contactEmail) {
      onShowToast('Please fill out all required fields.', 'error');
      return;
    }

    setSubmitting(true);
    await MockDataService.submitIdea(formData);
    setSubmitting(false);
    setSubmitted(true);
    onShowToast('Idea submitted successfully to LaunchPad!', 'success');
  };

  return (
    <section id="submit-idea" className="submit-idea-section section-pad">
      <div className="content-width">
        <SectionHeader
          kicker="14 / Submit Your Project"
          title={
            <>
              Submit an <em>Idea or Project.</em>
            </>
          }
          subtitle="Pitch your startup concept, software project, or creator project to the Gentricks LaunchPad team for technical review, mentorship, and grant access."
        />

        <div className="submit-idea-card">
          {submitted ? (
            <div className="submit-success-box">
              <CheckCircle2 size={48} className="success-icon" />
              <h3>Submission Received!</h3>
              <p>Our LaunchPad team will review your project and get back to you via <strong>{formData.contactEmail}</strong>.</p>
              <button
                type="button"
                className="button button-yellow"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    title: '',
                    category: 'AI',
                    problemStatement: '',
                    proposedSolution: '',
                    targetAudience: '',
                    teamMembers: '',
                    contactEmail: '',
                  });
                }}
              >
                Submit Another Project
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="idea-form-grid">
              <div className="form-group">
                <label>Project Title *</label>
                <input
                  type="text"
                  placeholder="e.g. NeuralDraft AI"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="AI">AI &amp; Agentic Systems</option>
                  <option value="SaaS">SaaS &amp; Developer Tools</option>
                  <option value="Hardware">Hardware &amp; IoT</option>
                  <option value="Web3">Web3 &amp; Cryptography</option>
                  <option value="Mobile">Mobile Application</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Problem Statement *</label>
                <textarea
                  rows={3}
                  placeholder="What problem are you solving?"
                  value={formData.problemStatement}
                  onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Proposed Solution</label>
                <textarea
                  rows={3}
                  placeholder="How does your software / product solve this problem?"
                  value={formData.proposedSolution}
                  onChange={(e) => setFormData({ ...formData, proposedSolution: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Contact Email *</label>
                <input
                  type="email"
                  placeholder="your.name@student.edu"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Team Members</label>
                <input
                  type="text"
                  placeholder="Names of co-founders or team members"
                  value={formData.teamMembers}
                  onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
                />
              </div>

              <div className="form-submit-row full-width">
                <button
                  type="submit"
                  className="button button-yellow"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Pitch to LaunchPad'} <ArrowUpRight size={17} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
