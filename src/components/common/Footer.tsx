import { ArrowUpRight, Mail } from 'lucide-react';

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/gentricks__/', icon: 'instagram' },
  { label: 'YouTube', href: 'https://www.youtube.com/@GenTricks-01', icon: 'youtube' },
  { label: 'Reddit', href: 'https://www.reddit.com/r/GenTricks/', icon: 'reddit' },
  { label: 'X', href: 'https://x.com/GenTricks__', icon: 'x' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/gentricks/', icon: 'linkedin' },
] as const;

export function Footer() {
  return (
    <footer className="footer">
      <div className="site-container footer-grid">
        <div className="footer-brand">
          <a href="#top" aria-label="GENTRICKS home">
            <span className="footer-lockup">
              <img src="/gentricks-logo.svg" alt="" className="footer-logo" />
              <span>GENTRICKS</span>
            </span>
          </a>
          <p>Where the Next Generation Connects, Creates, and Leads.</p>
          <address className="footer-contact">
            <a href="mailto:collab@gentricks.in"><Mail size={15} aria-hidden="true" /><span>Collab:</span> collab@gentricks.in</a>
            <a href="mailto:support@gentricks.in"><Mail size={15} aria-hidden="true" /><span>Support:</span> support@gentricks.in</a>
          </address>
        </div>

        <div className="footer-actions">
          <a href="#join" className="text-link">
            Join GENTRICKS <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <div className="footer-socials" aria-label="GENTRICKS social channels">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="social-link"
                aria-label={social.label}
                title={social.label}
              >
                <SocialIcon type={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <span>© GENTRICKS. All rights reserved.</span>
        <span>Built for the next generation across India.</span>
      </div>
    </footer>
  );
}

function SocialIcon({ type }: { type: typeof socialLinks[number]['icon'] }) {
  if (type === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.25" cy="6.75" r=".75" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === 'youtube') {
    return (
      <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="3" />
        <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === 'reddit') {
    return <span className="social-reddit" aria-hidden="true">r/</span>;
  }

  if (type === 'x') {
    return <span className="social-x" aria-hidden="true">𝕏</span>;
  }

  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="currentColor" d="M20.45 3H3.55A.55.55 0 0 0 3 3.55v16.9c0 .3.25.55.55.55h16.9c.3 0 .55-.25.55-.55V3.55a.55.55 0 0 0-.55-.55ZM8.34 18.33H5.67V9.75h2.67v8.58ZM7 8.57a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1Zm11.34 9.76h-2.66v-4.17c0-1-.02-2.28-1.39-2.28-1.39 0-1.6 1.08-1.6 2.2v4.25h-2.66V9.75h2.56v1.17h.04c.35-.68 1.23-1.4 2.53-1.4 2.7 0 3.2 1.78 3.2 4.1v4.71Z"/>
    </svg>
  );
}
