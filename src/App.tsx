import { useEffect, useState } from 'react';
import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { Homepage } from './components/Homepage';
import { SectionPage, type SectionPageName } from './components/SectionPage';

const sectionPages: SectionPageName[] = ['ecosystem', 'programs', 'events', 'community', 'opportunities'];

function readPage(): SectionPageName | null {
  const value = window.location.hash.replace('#', '');
  return sectionPages.includes(value as SectionPageName) ? value as SectionPageName : null;
}

function App() {
  const [page, setPage] = useState<SectionPageName | null>(readPage);

  useEffect(() => {
    const handleRoute = () => {
      setPage(readPage());
      requestAnimationFrame(() => {
        if (window.location.hash === '#join') document.getElementById('join')?.scrollIntoView();
        else window.scrollTo({ top: 0, behavior: 'auto' });
      });
    };
    window.addEventListener('hashchange', handleRoute);
    return () => window.removeEventListener('hashchange', handleRoute);
  }, []);
  return (
    <div className="site-shell">
      <Header />
      <main id="top">
        {page ? <SectionPage page={page} /> : <Homepage />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
