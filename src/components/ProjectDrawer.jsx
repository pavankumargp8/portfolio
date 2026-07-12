import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlowingShadow from './GlowingShadow';
import './ProjectDrawer.css';

const DoubleBarChart = ({ metric }) => (
  <div className="metric-chart-container">
    <div className="bar-chart-row" style={{ marginBottom: '16px' }}>
      <div className="bar-chart-label" style={{ fontSize: '11px', color: 'var(--color-felt-gray)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{metric.label1}</div>
      <div className="bar-chart-track" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--color-ash-mist)', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${metric.val1}%` }} 
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ height: '100%', backgroundColor: 'var(--color-accent)', borderRadius: '4px' }}
          />
        </div>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-accent)', minWidth: '40px', textAlign: 'right' }}>{metric.val1}{metric.suffix}</span>
      </div>
    </div>
    <div className="bar-chart-row">
      <div className="bar-chart-label" style={{ fontSize: '11px', color: 'var(--color-felt-gray)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{metric.label2}</div>
      <div className="bar-chart-track" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--color-ash-mist)', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${metric.val2}%` }} 
            transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
            style={{ height: '100%', backgroundColor: 'var(--color-accent-secondary)', borderRadius: '4px' }}
          />
        </div>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-accent-secondary)', minWidth: '40px', textAlign: 'right' }}>{metric.val2}{metric.suffix}</span>
      </div>
    </div>
  </div>
);

const RadialChart = ({ metric }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (metric.val / 100) * circumference;

  return (
    <div className="metric-chart-container radial" style={{ display: 'flex', alignItems: 'center', gap: '24px', backgroundColor: 'rgba(30, 41, 59, 0.15)', padding: '20px', border: '1px solid var(--color-ash-mist)', borderRadius: '0px' }}>
      <div className="radial-svg-wrap" style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0 }}>
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
          <circle cx="50" cy="50" r={radius} stroke="var(--color-ash-mist)" strokeWidth="6" fill="transparent" />
          <motion.circle 
            cx="50" 
            cy="50" 
            r={radius} 
            stroke="var(--color-accent-secondary)" 
            strokeWidth="6" 
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            strokeLinecap="round"
          />
        </svg>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, color: 'var(--color-obsidian)', fontFamily: 'var(--font-roobert)' }}>
          {metric.val}{metric.suffix}
        </div>
      </div>
      <div className="radial-info">
        <h5 style={{ margin: '0 0 6px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-obsidian)', fontFamily: 'var(--font-roobert)' }}>{metric.label}</h5>
        <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-felt-gray)', lineHeight: '1.4' }}>{metric.description}</p>
      </div>
    </div>
  );
};

const LineChart = ({ metric }) => (
  <div className="metric-chart-container" style={{ paddingBottom: '10px' }}>
    <div style={{ position: 'relative', height: '130px', marginTop: '8px', borderLeft: '1px solid var(--color-ash-mist)', borderBottom: '1px solid var(--color-ash-mist)', paddingLeft: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Grid lines */}
      <div style={{ position: 'absolute', right: 0, left: '12px', borderTop: '1px dashed rgba(148, 163, 184, 0.15)', height: '0', top: '10%' }} />
      <div style={{ position: 'absolute', right: 0, left: '12px', borderTop: '1px dashed rgba(148, 163, 184, 0.15)', height: '0', top: '50%' }} />
      
      {/* SVG Path */}
      <svg width="100%" height="100%" viewBox="0 0 300 120" preserveAspectRatio="none" style={{ overflow: 'visible', position: 'absolute', top: 0, left: '12px', right: 0 }}>
        {/* Animated Line */}
        <motion.path
          d={`M 10 ${120 - metric.y1 * 0.9} L 250 ${120 - metric.y2 * 0.9}`}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
        {/* Points */}
        <motion.circle cx="10" cy={120 - metric.y1 * 0.9} r="5" fill="var(--color-accent-secondary)" />
        <motion.circle cx="250" cy={120 - metric.y2 * 0.9} r="5" fill="var(--color-accent-secondary)" />
      </svg>
    </div>

    {/* X Labels */}
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', paddingLeft: '12px', fontSize: '11px', color: 'var(--color-felt-gray)', fontFamily: 'var(--font-roobert)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
      <span>{metric.x1}: <strong>{metric.y1} {metric.labelY}</strong></span>
      <span>{metric.x2}: <strong>{metric.y2} {metric.labelY}</strong></span>
    </div>
  </div>
);

const CaseStudyMetric = ({ metric }) => {
  if (metric.type === 'double-bar') return <DoubleBarChart metric={metric} />;
  if (metric.type === 'radial') return <RadialChart metric={metric} />;
  if (metric.type === 'line') return <LineChart metric={metric} />;
  return null;
};

export default function ProjectDrawer({ project, isOpen, onClose }) {
  const drawerRef = useRef(null);

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key to close the drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Trap focus inside the drawer while it is open
  useEffect(() => {
    if (!isOpen) return;

    // Timeout allows DOM content inside AnimatePresence to mount fully
    const timer = setTimeout(() => {
      const focusableElements = drawerRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex="0"]'
      );

      if (focusableElements && focusableElements.length > 0) {
        // Focus the first element (the close button) initially
        focusableElements[0].focus();

        const handleTab = (e) => {
          if (e.key !== 'Tab') return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        };

        window.addEventListener('keydown', handleTab);
        return () => {
          window.removeEventListener('keydown', handleTab);
        };
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!project) return null;

  const caseStudy = project.caseStudy || {
    problem: 'No case study problem details configured yet.',
    solution: 'No case study solution details configured yet.',
    features: [],
    flow: []
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            className="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sliding Drawer Container */}
          <motion.aside
            ref={drawerRef}
            className="project-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header / Close Panel */}
            <div className="drawer-header">
              <button className="drawer-close-btn" onClick={onClose} aria-label="Close details panel">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <span className="drawer-meta-label">Case Study</span>
            </div>

            {/* Content Body */}
            <div className="drawer-content">
              {/* Title & Metadata */}
              <header className="drawer-content-header">
                <span className="drawer-status-tag">{project.status}</span>
                <h2 className="drawer-title">{project.name}</h2>
                <p className="drawer-tech-label">{project.technologies}</p>
              </header>

              <hr className="drawer-divider" />

              {/* The Challenge */}
              <section className="drawer-section">
                <h4 className="drawer-section-title">The Challenge</h4>
                <p className="drawer-text">{caseStudy.problem}</p>
              </section>

              {/* The Solution */}
              <section className="drawer-section">
                <h4 className="drawer-section-title">The Solution</h4>
                <p className="drawer-text">{caseStudy.solution}</p>
              </section>

              {/* Quantified Outcome Visualization Chart */}
              {caseStudy.metric && (
                <section className="drawer-section">
                  <h4 className="drawer-section-title">Quantified Impact</h4>
                  <CaseStudyMetric metric={caseStudy.metric} />
                </section>
              )}

              {/* Features List */}
              {caseStudy.features && caseStudy.features.length > 0 && (
                <section className="drawer-section">
                  <h4 className="drawer-section-title">Key Capabilities</h4>
                  <ul className="drawer-features-list">
                    {caseStudy.features.map((feature, idx) => (
                      <li key={idx} className="drawer-feature-item">
                        <span className="drawer-feature-bullet">✦</span>
                        <span className="drawer-text">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Architecture Diagram */}
              {caseStudy.flow && caseStudy.flow.length > 0 && (
                <section className="drawer-section">
                  <h4 className="drawer-section-title">System Architecture Flow</h4>
                  <div className="drawer-flow-diagram">
                    {caseStudy.flow.map((node, idx) => (
                      <React.Fragment key={idx}>
                        <div className="drawer-flow-node">
                          <span className="flow-node-text">{node.step}</span>
                        </div>
                        {node.direction === 'down' && (
                          <div className="drawer-flow-arrow">
                            <svg width="14" height="24" viewBox="0 0 14 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M7 2v20M2 17l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </section>
              )}

              {/* GitHub Button */}
              {project.githubLink && (
                <footer className="drawer-footer">
                  <GlowingShadow style={{ width: '100%', height: '48px' }}>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="drawer-github-link"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      Inspect Source Code
                    </a>
                  </GlowingShadow>
                </footer>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
