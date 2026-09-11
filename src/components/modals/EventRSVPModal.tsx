import React, { useState } from 'react';
import { CalendarDays, CheckCircle2 } from 'lucide-react';
import { MockDataService } from '../../services/mockDataService';
import { EventItem } from '../../types';
import { Modal } from '../common/Modal';

interface EventRSVPModalProps {
  event: EventItem | null;
  onClose: () => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const EventRSVPModal: React.FC<EventRSVPModalProps> = ({
  event,
  onClose,
  onShowToast,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (!event) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setSubmitting(true);
    await MockDataService.rsvpEvent(event.id);
    setSubmitting(false);
    setConfirmed(true);
    onShowToast(`RSVP Confirmed for ${event.title}!`, 'success');
  };

  return (
    <Modal
      isOpen={!!event}
      onClose={onClose}
      title={confirmed ? 'RSVP Confirmed!' : `RSVP: ${event.title}`}
      subtitle={event.date + ' • ' + event.location}
    >
      {confirmed ? (
        <div className="rsvp-success-box">
          <CheckCircle2 size={44} className="success-icon" />
          <h3>Spot Reserved!</h3>
          <p>
            We have sent calendar invites and live stream passes for <strong>{event.title}</strong> to{' '}
            <strong>{email}</strong>.
          </p>
          <button
            type="button"
            className="button button-yellow"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      ) : (
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="event-summary-pill">
            <CalendarDays size={16} /> {event.date} ({event.time})
          </div>

          <div className="form-group">
            <label htmlFor="rsvp-name">Full Name *</label>
            <input
              id="rsvp-name"
              type="text"
              required
              placeholder="e.g. Aarav Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="rsvp-email">Email Address *</label>
            <input
              id="rsvp-email"
              type="email"
              required
              placeholder="your.email@gentricks.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="rsvp-college">College / Organization</label>
            <input
              id="rsvp-college"
              type="text"
              placeholder="e.g. IIT Bombay / BITS Pilani"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="button button-yellow modal-submit-btn"
            disabled={submitting}
          >
            {submitting ? 'Confirming...' : 'Confirm RSVP'}
          </button>
        </form>
      )}
    </Modal>
  );
};
