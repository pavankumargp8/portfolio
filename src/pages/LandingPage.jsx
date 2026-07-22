import React, { useEffect, useState, useRef, useCallback, lazy, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SplitText from '../components/SplitText';
import AnimatedThemeToggler from '../components/AnimatedThemeToggler';
import ErrorBoundary from '../components/ErrorBoundary';
import UiverseLoader from '../components/Cube';
import './LandingPage.css';

const SideRays = lazy(() => import('../components/SideRays'));

const ChevronDownIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

function LandingPage() {
  const [inView, setInView] = useState(false);
  const navigate = useNavigate();
  const hasNavigated = useRef(false);

  useEffect(() => {
    // Dynamic SEO Title & Description
    document.title = "Pavan Kumar — Portfolio";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Pavan Kumar — Portfolio. A monochrome editorial gallery presenting applied medical AI, database systems, and web projects.');
    }

    const timer = setTimeout(() => setInView(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const triggerNavigation = useCallback(() => {
    if (hasNavigated.current) return;
    hasNavigated.current = true;
    navigate('/home');
  }, [navigate]);

  useEffect(() => {
    // 1. Mouse wheel scroll down check
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        triggerNavigation();
      }
    };

    // 2. Keyboard press down/scroll check
    const handleKeyDown = (e) => {
      const activeKeys = ['ArrowDown', 'PageDown', ' ', 'Enter'];
      if (activeKeys.includes(e.key)) {
        triggerNavigation();
      }
    };

    // 3. Touch gesture swipe up check (scrolls page down)
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!touchStartY || !e.touches || !e.touches[0]) return;
      const currentY = e.touches[0].clientY;
      const diffY = touchStartY - currentY;
      
      // Swipe up threshold is 40px
      if (diffY > 40) {
        triggerNavigation();
      }
    };

    // Bind event listeners
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Clean up
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [triggerNavigation]);

  return (
    <div className="landing-page">
      {/* Theme Toggler fixed at top-right */}
      <div style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 9999 }}>
        <AnimatedThemeToggler />
      </div>

      {/* 1. WebGL SideRays Backdrop */}
      <div className="iridescent-backdrop" style={{ zIndex: 1, pointerEvents: 'auto' }} aria-hidden="true">
        <ErrorBoundary fallback={<div className="canvas-error-fallback" style={{ width: '100%', height: '100%', backgroundColor: 'var(--color-paper)' }} />}>
          <Suspense fallback={<div className="canvas-loading-fallback" style={{ width: '100%', height: '100%', backgroundColor: 'var(--color-paper)' }} />}>
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <SideRays
                speed={2.5}
                rayColor1="#EAB308"
                rayColor2="#96c8ff"
                intensity={2}
                spread={2}
                origin="top-right"
                tilt={0}
                saturation={1.5}
                blend={0.75}
                falloff={1.6}
                opacity={1}
              />
            </div>
          </Suspense>
        </ErrorBoundary>
        <div className="dark-overlay" style={{ pointerEvents: 'none', zIndex: 2 }} />
      </div>

      <main className="landing-main">
        {/* 2. Monumental Display Headline & Profile Pill Container */}
        <div className="landing-hero">
          <SplitText
            text="PAVAN KUMAR"
            className={`landing-display-name ${inView ? 'element-visible' : ''}`}
            delay={80}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="center"
            tag="h1"
          />

          {/* Profile image overlapping/centered in the monumental text */}
          <div className={`landing-profile-wrap ${inView ? 'element-visible' : ''}`}>
            <div className="landing-profile-pill">
              <img
                src="/profile_card.jpg"
                alt="Pavan Kumar Profile Avatar"
                className="landing-profile-img"
                draggable="false"
              />
            </div>
          </div>
        </div>

        {/* 3. Editorial Tagline */}
        <div className={`landing-tagline-block ${inView ? 'element-visible' : ''}`}>
          <p className="landing-tagline">
            Designing human experiences in code.
          </p>
        </div>

        {/* 4. Interactive 3D Gateway Cube (Bottom-left) */}
        <div className="landing-cube-wrapper">
          <UiverseLoader onClick={triggerNavigation} />
        </div>

        {/* 5. Scroll link to Home (Bottom-center) */}
        <Link to="/home" className="landing-scroll-arrow" aria-label="Explore Portfolio">
          <ChevronDownIcon className="scroll-arrow-icon" />
        </Link>
      </main>
    </div>
  );
}

export default LandingPage;