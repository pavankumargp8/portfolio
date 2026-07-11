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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
    </div>
  );
}

export default SiteLayout;