import React, { useState } from 'react';
import { Rocket } from 'lucide-react';
import { MockDataService } from '../../services/mockDataService';
import { Modal } from '../common/Modal';

interface IdeaSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const IdeaSubmissionModal: React.FC<IdeaSubmissionModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'AI / Machine Learning',
    problemStatement: '',
    proposedSolution: '',
    targetAudience: '',
    teamMembers: '',
    contactEmail: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.contactEmail) return;
    setSubmitting(true);
    await MockDataService.submitIdea(formData);
    setSubmitting(false);
    onShowToast('Pitch / Idea submitted to LaunchPad!', 'success');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Submit an Idea / Startup Pitch"
      subtitle="Pitch your startup concept to the Gentricks LaunchPad team for technical review and incubator access."
    >
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="m-title">Title / Name *</label>
          <input
            id="m-title"
            type="text"
            required
            placeholder="e.g. NeuralDraft AI"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="m-cat">Category</label>
          <select
            id="m-cat"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="AI / Machine Learning">AI / Machine Learning</option>
            <option value="SaaS & Cloud Native">SaaS &amp; Cloud Native</option>
            <option value="Web3 & Crypto">Web3 &amp; Crypto</option>
            <option value="Hardware & IoT">Hardware &amp; IoT</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="m-prob">Problem &amp; Solution *</label>
          <textarea
            id="m-prob"
            rows={3}
            required
            placeholder="Briefly describe the problem you solve and your core tech stack."
            value={formData.proposedSolution}
            onChange={(e) => setFormData({ ...formData, proposedSolution: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="m-email">Contact Email *</label>
          <input
            id="m-email"
            type="email"
            required
            placeholder="your.email@gentricks.in"
            value={formData.contactEmail}
            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="button button-yellow modal-submit-btn"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Pitch'} <Rocket size={16} />
        </button>
      </form>
    </Modal>
  );
};
