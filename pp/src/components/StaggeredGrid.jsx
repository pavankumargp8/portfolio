import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StaggeredGrid.css';

gsap.registerPlugin(ScrollTrigger);

export default function StaggeredGrid({
  images = [],
  bentoItems = [],
  centerText = "CONTACT",
  credits = {
    madeBy: { text: "Pavan Kumar", href: "mailto:pavankumargp88@gmail.com" },
    moreDemos: { text: "Explore Projects", href: "/projects" }
  },
  className = "",
  showFooter = true,
  scroller = null
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const gridFullRef = useRef(null);
  const textRef = useRef(null);
  const [activeBento, setActiveBento] = useState(0);

  const splitText = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block" style={{ willChange: 'transform' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    // Animate Title Text Letters
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll('.char');
      gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          scroller: scroller || undefined,
          start: 'top bottom',
          end: 'center center-=25%',
          scrub: 1,
        }
      })
      .from(chars, {
        ease: 'sine.out',
        yPercent: 300,
        autoAlpha: 0,
        stagger: {
          each: 0.05,
          from: 'center'
        }
      });
    }

    // Animate Bento Cards Slide Up
    const cards = document.querySelectorAll('.bento-item');
    if (cards.length) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: gridFullRef.current || cards[0],
          scroller: scroller || undefined,
          start: 'top bottom',
          once: true
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }
  }, [isLoaded, scroller]);

  return (
    <div className={`staggered-grid-container ${className}`}>
      <section className="staggered-grid-title-section">
        <div ref={textRef} className="staggered-grid-title">
          {splitText(centerText)}
        </div>
      </section>

      <section className="grid-section" style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '3vh' }}>
        <div ref={gridFullRef} className="bento-container" style={{ width: '100%', maxWidth: '850px', height: '240px' }}>
          {bentoItems.map((bentoItem, index) => {
            const isActive = activeBento === index;
            return (
              <div
                key={bentoItem.id}
                className={`bento-item ${isActive ? 'active' : ''}`}
                style={{ width: isActive ? "60%" : "20%" }}
                onMouseEnter={() => setActiveBento(index)}
                onClick={() => setActiveBento(index)}
              >
                <div className="bento-item-border" />
                
                <div className="bento-item-content">
                  {/* Active State View */}
                  <div 
                    className="bento-active-wrapper"
                    style={{ 
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateY(0px)' : 'translateY(16px)',
                      pointerEvents: isActive ? 'auto' : 'none'
                    }}
                  >
                    <div className="bento-img-bg">
                      {bentoItem.image && (
                        <>
                          <img src={bentoItem.image} alt={bentoItem.title} />
                          <div className="bento-text-gradient" />
                        </>
                      )}
                    </div>

                    <a href={bentoItem.href} target="_blank" rel="noopener noreferrer" className="bento-footer">
                      <div className="bento-footer-title">
                        <h3>{bentoItem.title}</h3>
                        <p>{bentoItem.subtitle}</p>
                      </div>
                      <div className="bento-footer-icon">
                        {bentoItem.icon}
                      </div>
                    </a>
                  </div>

                  {/* Inactive State View */}
                  <div 
                    className="bento-inactive-wrapper"
                    style={{ 
                      opacity: isActive ? 0 : 1,
                      transform: isActive ? 'scale(0.9)' : 'scale(1)',
                      pointerEvents: isActive ? 'none' : 'auto'
                    }}
                  >
                    <div className="bento-inactive-icon">
                      {bentoItem.icon}
                    </div>
                    <span className="bento-inactive-label">{bentoItem.title}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {showFooter && (
        <footer className="staggered-grid-footer">
          <a href={credits.madeBy.href}>{credits.madeBy.text}</a>
          <a href={credits.moreDemos.href}>{credits.moreDemos.text}</a>
        </footer>
      )}
    </div>
  );
}
