import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlowingShadow from './GlowingShadow';
import './ProjectDrawer.css';

export default function ProjectDrawer({ project, isOpen, onClose }) {
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
