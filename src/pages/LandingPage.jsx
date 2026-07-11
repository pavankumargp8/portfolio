import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FloatingLines from '../components/FloatingLines';
import SplitText from '../components/SplitText';
import AnimatedThemeToggler from '../components/AnimatedThemeToggler';
import './LandingPage.css';

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
    // Set a tiny timeout to trigger the slide-up/fade-in transitions
    const timer = setTimeout(() => setInView(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const triggerNavigation = () => {
      if (hasNavigated.current) return;
      hasNavigated.current = true;
      navigate('/home');
    };

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
  }, [navigate]);

  return (
    <div className="landing-page">
      {/* Theme Toggler fixed at top-right */}
      <div style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 9999 }}>
        <AnimatedThemeToggler />
      </div>

      {/* 1. WebGL Floating Lines Backdrop (React Bits) */}
      <div className="iridescent-backdrop" style={{ zIndex: 1, pointerEvents: 'auto' }} aria-hidden="true">
        <FloatingLines 
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={11}
          lineDistance={[8, 6, 4]}
          bendRadius={24.5}
          bendStrength={-4}
          interactive={true}
          parallax={true}
          animationSpeed={1.7}
          linesGradient={['#520ad1', '#061cd4', '#14b8a6', '#ffffff']}
          gradientStart="#520ad1"
          gradientMid="#061cd4"
          gradientEnd="#ffffff"
        />
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

        {/* 4. Rotating Scroll Indicator (Typographic ornament, bottom-left) */}
        <div className="rotating-scroll-badge" aria-hidden="true">
          <svg className="scroll-svg" viewBox="0 0 100 100" width="90" height="90">
            <path
              id="textPath"
              d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
              fill="none"
              stroke="none"
            />
            <text fill="#ffffff" fontSize="9.2" fontWeight="400" letterSpacing="1.2">
              <textPath href="#textPath" startOffset="0%">
                SCROLL DOWN · SCROLL DOWN · SCROLL DOWN ·
              </textPath>
            </text>
          </svg>
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