import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Briefcase, Code, User, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassDock from './GlassDock';

function SiteLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === '/';
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Trigger route transition loading bar animation
    setIsTransitioning(true);
    setProgress(30);

    const t1 = setTimeout(() => setProgress(70), 100);
    const t2 = setTimeout(() => {
      setProgress(100);
      const t3 = setTimeout(() => {
        setIsTransitioning(false);
        setProgress(0);
      }, 200);
      return () => clearTimeout(t3);
    }, 350);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location.pathname]);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const consent = localStorage.getItem('monopo-saigon-consent');
    if (!consent) {
      const timer = setTimeout(() => setShowCookieBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptConsent = () => {
    localStorage.setItem('monopo-saigon-consent', 'true');
    setShowCookieBanner(false);
  };

  const dockItems = [
    { title: 'Home', icon: Home, onClick: () => navigate('/') },
    { title: 'Work', icon: Briefcase, onClick: () => navigate('/home') },
    { title: 'Projects', icon: Code, onClick: () => navigate('/projects') },
    { title: 'About', icon: User, onClick: () => navigate('/about') },
    { title: 'Contact', icon: Mail, onClick: () => navigate('/contact') }
  ];

  return (
    <div className="app-shell">
      {/* Route Change Progress Indicator */}
      {isTransitioning && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            height: '3px', 
            backgroundColor: 'var(--color-accent)', 
            width: `${progress}%`, 
            zIndex: 100000, 
            transition: 'width 0.25s ease-out, opacity 0.2s ease-out',
            opacity: progress === 100 ? 0 : 1
          }} 
        />
      )}
      <div className="app-frame">
        {/* Navigation Bar - Brand Only */}
        <header className={`site-header ${isLandingPage ? 'landing-header-ref' : ''}`}>
          <div className="header-container">
            <Link className="site-brand" to="/">
              pavan kumar
            </Link>
          </div>
        </header>

        <main className={isLandingPage ? 'landing-route-shell' : 'content-shell route-shell'}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%', minHeight: '100%' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Floating Bottom-Right Navigation Dock */}
        <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 9999 }}>
          <GlassDock items={dockItems} />
        </div>

        {/* Footer - not displayed on Landing page */}
        {!isLandingPage ? (
          <footer className="site-footer" style={{ paddingBottom: '100px' }}>
            <div className="footer-grid">
              <div className="footer-col">
                <span className="footer-col-label">CREDITS</span>
                <p className="footer-copy">Built for Pavan Kumar’s portfolio in React. Inspired by Monopo Saigon.</p>
              </div>
              <div className="footer-col">
                <span className="footer-col-label">STUDIO</span>
                <p className="footer-copy">PESITM campus<br />Shivamogga, Karnataka<br />India</p>
              </div>
              <div className="footer-col">
                <span className="footer-col-label">CONNECT</span>
                <p className="footer-copy">
                  <a href="mailto:pavankumargp88@gmail.com" className="footer-link">pavankumargp88@gmail.com</a>
                  <br />
                  <a href="https://github.com/pavankumargp8" target="_blank" rel="noopener noreferrer" className="footer-link">github.com/pavankumargp8</a>
                  <br />
                  <a href="https://linkedin.com/in/pavan-kumar" target="_blank" rel="noopener noreferrer" className="footer-link">linkedin.com/in/pavan-kumar</a>
                </p>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© {new Date().getFullYear()} Pavan Kumar. All rights reserved.</span>
            </div>
          </footer>
        ) : null}

        {/* Cookie Consent Banner */}
        {showCookieBanner && (
          <div className="cookie-banner" role="status">
            <div className="cookie-banner-content">
              <span className="cookie-banner-text">
                This site uses cookies to deliver a monochrome editorial experience and analyze interactions.
              </span>
              <button
                type="button"
                className="filled-neutral-pill"
                onClick={handleAcceptConsent}
              >
                Accept
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Scroll-to-Top Button (balanced with GlassDock on right) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={scrollToTop}
            className="scroll-to-top-btn"
            aria-label="Scroll back to top of page"
            style={{
              position: 'fixed',
              bottom: '32px',
              left: '32px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--surface-card)',
              border: '1px solid var(--color-ash-mist)',
              color: 'var(--color-obsidian)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 9999,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              outline: 'none'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SiteLayout;