import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FlipFadeText from '../components/FlipFadeText';
import { skills } from '../data/portfolioData';
import { motion } from 'motion/react';
import SideRays from '../components/SideRays';

const LOGO_DATA = [
  {
    name: 'Java',
    category: 'Backend Development',
    color: '#f89820',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f89820" strokeWidth="2" strokeLinecap="round">
        <path d="M6 18c0 1.5 2 2.5 6 2.5s6-1 6-2.5M8 15.5c0 1 1.5 1.5 4 1.5s4-.5 4-1.5M10 13c0 .5 1 1 2 1s2-.5 2-1" />
        <path d="M12 11c-2-3 2-5 0-9M15 10c-1-2 1-4 0-7" />
      </svg>
    )
  },
  {
    name: 'C / C++',
    category: 'Systems Programming',
    color: '#a8b9cc',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#a8b9cc" />
        <text x="3" y="16" fontFamily="sans-serif" fontWeight="bold" fontSize="11" fill="#fff">C++</text>
      </svg>
    )
  },
  {
    name: 'JavaScript',
    category: 'Frontend & Logic',
    color: '#f7df1e',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#f7df1e" />
        <text x="5" y="16" fontFamily="sans-serif" fontWeight="bold" fontSize="11" fill="#000">JS</text>
      </svg>
    )
  },
  {
    name: 'Python',
    category: 'AI & Deep Learning',
    color: '#3776ab',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2c-5.52 0-6 4.5-6 5.5V9h6.5v1.5H6.2C4.98 10.5 4 11.48 4 12.7c0 1.22.98 2.3 2.2 2.3H8v-2.25c0-1.24 1.01-2.25 2.25-2.25H16.5v-1.5H12V7.5C12 6.5 11.5 2 6 2h6zm0 20c5.52 0 6-4.5 6-5.5V15H11.5v-1.5h6.3c1.22 0 2.2-.98 2.2-2.2 0-1.22-.98-2.3-2.2-2.3H16v2.25c0 1.24-1.01 2.25-2.25 2.25H7.5v1.5H12v1.5c0 1 0.5 5.5 6 5.5z" fill="#3776ab" />
        <path d="M12 2c-5.52 0-6 4.5-6 5.5V9h6.5v1.5H6.2C4.98 10.5 4 11.48 4 12.7c0 1.22.98 2.3 2.2 2.3H8v-2.25c0-1.24 1.01-2.25 2.25-2.25H16.5v-1.5H12V7.5C12 6.5 11.5 2 6 2h6zm-1.5 2a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm3.5 15.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" fill="#ffe873" />
      </svg>
    )
  },
  {
    name: 'React.js',
    category: 'Interactive Web',
    color: '#61dafb',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#61dafb" strokeWidth="2">
        <circle cx="12" cy="12" r="2" fill="#61dafb" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
      </svg>
    )
  },
  {
    name: 'MySQL',
    category: 'Database Systems',
    color: '#00758f',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00758f" strokeWidth="2" strokeLinecap="round">
        <ellipse cx="12" cy="7" rx="7" ry="3" />
        <path d="M5 7v5c0 1.66 3.13 3 7 3s7-1.34 7-3V7" />
        <path d="M5 12v5c0 1.66 3.13 3 7 3s7-1.34 7-3v-5" />
      </svg>
    )
  },
  {
    name: 'Git',
    category: 'Version Control',
    color: '#f03c2e',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f03c2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 15V9a4 4 0 0 0-4-4H9" />
        <line x1="6" y1="9" x2="6" y2="15" />
      </svg>
    )
  }
];

function HomePage() {
  const navigate = useNavigate();
  const hasNavigated = useRef(false);

  useEffect(() => {
    document.title = "Work | Pavan Kumar";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', "View Pavan Kumar's professional history, skills list, and engineering roadmap.");
    }
  }, []);

  useEffect(() => {
    const triggerNavigationBack = () => {
      if (hasNavigated.current) return;
      hasNavigated.current = true;
      navigate('/');
    };

    const handleWheel = (e) => {
      if (window.scrollY === 0 && e.deltaY < 0) {
        triggerNavigationBack();
      }
    };

    const handleKeyDown = (e) => {
      if (window.scrollY === 0) {
        const activeKeys = ['ArrowUp', 'PageUp'];
        if (activeKeys.includes(e.key)) {
          triggerNavigationBack();
        }
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (window.scrollY === 0) {
        if (!touchStartY || !e.touches || !e.touches[0]) return;
        const currentY = e.touches[0].clientY;
        const diffY = currentY - touchStartY;
        
        if (diffY > 40) {
          triggerNavigationBack();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [navigate]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <>
      {/* Background drifting light rays for premium life/depth */}
      <div 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: -1, 
          opacity: 0.22, 
          pointerEvents: 'none' 
        }}
      >
        <SideRays
          speed={1.2}
          rayColor1="#EAB308"
          rayColor2="#465aff"
          intensity={1.0}
          spread={1.8}
          origin="top-right"
          tilt={0.08}
          saturation={1.2}
          blend={0.5}
          falloff={1.5}
          opacity={0.4}
        />
      </div>

      {/* 1. Portfolio Overview Section */}
      <section className="section-block">
        <div className="section-heading">
          <span className="section-label">Home</span>
          <h2 className="heading-whisper">Portfolio overview</h2>
        </div>

        <div className="home-hero-container">
          <div className="home-hero-left">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              <span className="section-label" style={{ fontSize: '12px', letterSpacing: '0.15em', opacity: 0.8 }}>Hello, I am</span>
              <h1 style={{ 
                fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', 
                fontWeight: 800, 
                textTransform: 'uppercase', 
                lineHeight: '1.05', 
                margin: 0,
                color: 'var(--color-obsidian)'
              }}>
                Pavan Kumar
              </h1>
              <FlipFadeText 
                words={[
                  "Software Engineer",
                  "Deep Learning Dev",
                  "AI Researcher",
                  "DBMS Architect",
                  "Creative Coder"
                ]}
                interval={2500}
                textClassName="gradient-flip-text"
              />
            </div>
            
            <p className="page-intro" style={{ margin: 0, maxWidth: '100%' }}>
              I am a software engineer specializing in applied deep learning, medical image segmentation, and database management systems. I build systems that translate complex mathematical models into clean, high-performance software.
            </p>

            {/* Tech Stack Horizontal Row */}
            <div className="tech-stack-row">
              {/* Java */}
              <div className="tech-icon-card" title="Java" style={{ '--glow-color': '#f89820' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f89820" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 18c0 1.5 2 2.5 6 2.5s6-1 6-2.5M8 15.5c0 1 1.5 1.5 4 1.5s4-.5 4-1.5M10 13c0 .5 1 1 2 1s2-.5 2-1" />
                  <path d="M12 11c-2-3 2-5 0-9M15 10c-1-2 1-4 0-7" />
                </svg>
              </div>
              {/* C */}
              <div className="tech-icon-card" title="C" style={{ '--glow-color': '#a8b9cc' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="4" fill="#a8b9cc" />
                  <text x="7" y="17" fontFamily="sans-serif" fontWeight="bold" fontSize="13" fill="#fff">C</text>
                </svg>
              </div>
              {/* JS */}
              <div className="tech-icon-card" title="JavaScript" style={{ '--glow-color': '#f7df1e' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="4" fill="#f7df1e" />
                  <text x="5" y="16" fontFamily="sans-serif" fontWeight="bold" fontSize="11" fill="#000">JS</text>
                </svg>
              </div>
              {/* Python */}
              <div className="tech-icon-card" title="Python" style={{ '--glow-color': '#3776ab' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2c-5.52 0-6 4.5-6 5.5V9h6.5v1.5H6.2C4.98 10.5 4 11.48 4 12.7c0 1.22.98 2.3 2.2 2.3H8v-2.25c0-1.24 1.01-2.25 2.25-2.25H16.5v-1.5H12V7.5C12 6.5 11.5 2 6 2h6zm0 20c5.52 0 6-4.5 6-5.5V15H11.5v-1.5h6.3c1.22 0 2.2-.98 2.2-2.2 0-1.22-.98-2.3-2.2-2.3H16v2.25c0 1.24-1.01 2.25-2.25 2.25H7.5v1.5H12v1.5c0 1 0.5 5.5 6 5.5z" fill="#3776ab" />
                  <path d="M12 2c-5.52 0-6 4.5-6 5.5V9h6.5v1.5H6.2C4.98 10.5 4 11.48 4 12.7c0 1.22.98 2.3 2.2 2.3H8v-2.25c0-1.24 1.01-2.25 2.25-2.25H16.5v-1.5H12V7.5C12 6.5 11.5 2 6 2h6zm-1.5 2a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm3.5 15.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" fill="#ffe873" />
                </svg>
              </div>
              {/* React */}
              <div className="tech-icon-card" title="React" style={{ '--glow-color': '#61dafb' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#61dafb" strokeWidth="2">
                  <circle cx="12" cy="12" r="2" fill="#61dafb" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
                </svg>
              </div>
              {/* Database */}
              <div className="tech-icon-card" title="Database" style={{ '--glow-color': '#00758f' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00758f" strokeWidth="2" strokeLinecap="round">
                  <ellipse cx="12" cy="7" rx="7" ry="3" />
                  <path d="M5 7v5c0 1.66 3.13 3 7 3s7-1.34 7-3V7" />
                  <path d="M5 12v5c0 1.66 3.13 3 7 3s7-1.34 7-3v-5" />
                </svg>
              </div>
              {/* Git */}
              <div className="tech-icon-card" title="Git" style={{ '--glow-color': '#f03c2e' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f03c2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="18" r="3" />
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <path d="M18 15V9a4 4 0 0 0-4-4H9" />
                  <line x1="6" y1="9" x2="6" y2="15" />
                </svg>
              </div>
            </div>
          </div>

          {/* Endless loop scrolling tech badges to showcase skills in an elegant, interactive marquee */}
          <div className="home-hero-right">
            <div className="vertical-marquee-container">
              <div className="vertical-marquee-track">
                {/* Set 1 */}
                {LOGO_DATA.map((logo) => (
                  <div 
                    key={`set1-${logo.name}`} 
                    className="marquee-badge-card"
                    style={{ '--glow-color': logo.color }}
                  >
                    <div className="marquee-badge-icon-wrap">
                      {logo.icon}
                    </div>
                    <div className="marquee-badge-info">
                      <h4 className="marquee-badge-title">{logo.name}</h4>
                      <p className="marquee-badge-subtitle">{logo.category}</p>
                    </div>
                  </div>
                ))}
                {/* Set 2 (Seamless loop) */}
                {LOGO_DATA.map((logo) => (
                  <div 
                    key={`set2-${logo.name}`} 
                    className="marquee-badge-card"
                    style={{ '--glow-color': logo.color }}
                  >
                    <div className="marquee-badge-icon-wrap">
                      {logo.icon}
                    </div>
                    <div className="marquee-badge-info">
                      <h4 className="marquee-badge-title">{logo.name}</h4>
                      <p className="marquee-badge-subtitle">{logo.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="section-grid">
          <article className="section-card">
            <span className="section-label">Direction</span>
            <h3>Where the work is heading</h3>
            <p>
              Pioneering automated clinical diagnostics and high-accuracy segmentations using attention-gated 3D neural architectures.
            </p>
          </article>

          <article className="section-card">
            <span className="section-label">Location</span>
            <h3>Shahabad, Karnataka</h3>
            <p>Operating from the Karnataka technology hub, designing normalized relational schemas and low-latency database backends.</p>
          </article>

          <article className="section-card">
            <span className="section-label">Active Focus</span>
            <h3>Applied AI & DBMS</h3>
            <p>Developing medical imaging pipelines with PyTorch and MONAI, paired with high-throughput query optimization.</p>
          </article>
        </div>
      </section>

      {/* 2. Technical Capabilities Section */}
      <section className="section-block" style={{ marginTop: 'var(--spacing-28)' }}>
        <div className="section-heading">
          <span className="section-label">Capabilities</span>
          <h2 className="heading-whisper">Technical stack</h2>
        </div>

        <div className="skills-grid-four">
          {/* Languages Card */}
          <motion.article 
            className="section-card skill-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0}
            whileHover={{ y: -6, borderColor: 'var(--color-accent)', boxShadow: '0 15px 30px rgba(99, 102, 241, 0.1)' }}
          >
            <span className="section-label">Languages</span>
            <div className="skill-pill-container">
              {skills.languages.map((skill) => (
                <motion.span 
                  key={skill} 
                  className="skill-pill-tag"
                  whileHover={{ scale: 1.06, y: -2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.article>
          
          {/* Frameworks Card */}
          <motion.article 
            className="section-card skill-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={1}
            whileHover={{ y: -6, borderColor: 'var(--color-accent)', boxShadow: '0 15px 30px rgba(99, 102, 241, 0.1)' }}
          >
            <span className="section-label">Frameworks</span>
            <div className="skill-pill-container">
              {skills.frameworks.map((skill) => (
                <motion.span 
                  key={skill} 
                  className="skill-pill-tag"
                  whileHover={{ scale: 1.06, y: -2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.article>

          {/* Tools Card */}
          <motion.article 
            className="section-card skill-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={2}
            whileHover={{ y: -6, borderColor: 'var(--color-accent)', boxShadow: '0 15px 30px rgba(99, 102, 241, 0.1)' }}
          >
            <span className="section-label">Tools & IDEs</span>
            <div className="skill-pill-container">
              {skills.tools.map((skill) => (
                <motion.span 
                  key={skill} 
                  className="skill-pill-tag"
                  whileHover={{ scale: 1.06, y: -2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.article>

          {/* Core Strengths Card */}
          <motion.article 
            className="section-card skill-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={3}
            whileHover={{ y: -6, borderColor: 'var(--color-accent)', boxShadow: '0 15px 30px rgba(99, 102, 241, 0.1)' }}
          >
            <span className="section-label">Core Strengths</span>
            <div className="skill-pill-container">
              {skills.strengths.map((skill) => (
                <motion.span 
                  key={skill} 
                  className="skill-pill-tag"
                  whileHover={{ scale: 1.06, y: -2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.article>
        </div>
      </section>

      {/* 3. Directory Quick Links */}
      <section className="section-block">
        <div className="section-heading">
          <span className="section-label">Directory</span>
          <h2 className="heading-whisper">Explore the portfolio</h2>
        </div>

        <div className="section-grid">
          <div className="section-card">
            <span className="section-label">Gallery</span>
            <h3>Project Showcases</h3>
            <p>Review the AI segmentation models, database check-in systems, and exam allotment builders.</p>
            <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
              <Link to="/projects" className="ghost-button-light">
                Open Gallery
              </Link>
            </div>
          </div>

          <div className="section-card">
            <span className="section-label">Curriculum</span>
            <h3>About & Background</h3>
            <p>Browse educational milestones, specific technical skills, and academic achievements.</p>
            <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
              <Link to="/about" className="ghost-button-light">
                Read Resume
              </Link>
            </div>
          </div>

          <div className="section-card">
            <span className="section-label">Inquiries</span>
            <h3>Get in Touch</h3>
            <p>Contact channels via Email, LinkedIn, or GitHub for questions and opportunities.</p>
            <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
              <Link to="/contact" className="ghost-button-light">
                Open Details
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;