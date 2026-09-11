import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Ecosystem', href: '#ecosystem' },
  { label: 'Programs', href: '#programs' },
  { label: 'Events', href: '#events' },
  { label: 'Community', href: '#community' },
  { label: 'Opportunities', href: '#opportunities' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState(() => window.location.hash || '#top');

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const updateActiveHash = () => setActiveHash(window.location.hash || '#top');
    window.addEventListener('hashchange', updateActiveHash);
    return () => window.removeEventListener('hashchange', updateActiveHash);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={'site-header' + (isScrolled ? ' is-scrolled' : '')}>
      <div className="site-container header-inner">
        <a href="#top" className="brand" aria-label="GENTRICKS home" onClick={closeMenu}>
          <img src="/Gentricks_Logo.jpg" alt="" className="brand-logo" />
          <span className="brand-name">GENTRICKS</span>
        </a>

        <nav id="main-navigation" className={'main-nav' + (isOpen ? ' is-open' : '')} aria-label="Main navigation">
          <div className="nav-links-list">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu} aria-current={activeHash === item.href ? 'page' : undefined}>
                {item.label}
              </a>
            ))}
          </div>
          <a href="#join" className="nav-join mobile-nav-join" onClick={closeMenu}>
            Join GENTRICKS <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>

        <a href="#join" className="nav-join desktop-nav-join" onClick={closeMenu}>
          Join GENTRICKS <ArrowUpRight size={15} aria-hidden="true" />
        </a>

        <button className="menu-toggle" type="button" aria-label={isOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={isOpen} aria-controls="main-navigation" onClick={() => setIsOpen((open) => !open)}>
          {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
