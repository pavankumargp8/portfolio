import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TiltedCard from '../components/TiltedCard';
import FlipFadeText from '../components/FlipFadeText';
import { skills } from '../data/portfolioData';
import { motion } from 'motion/react';

function HomePage() {
  const navigate = useNavigate();
  const hasNavigated = useRef(false);

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
              I build software systems that combine clear mathematical logic with minimalist, high-fidelity interfaces. My focus centers on applied deep learning, medical image processing, and database systems.
            </p>
          </div>
          
          <div className="home-hero-right">
            <TiltedCard
              imageSrc="/profile_card.jpg"
              altText="Pavan Kumar - Profile"
              captionText="Pavan Kumar"
              containerHeight="300px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="300px"
              rotateAmplitude={12}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip
              displayOverlayContent
              overlayContent={
                <p className="tilted-card-demo-text">
                  Pavan Kumar
                </p>
              }
            />
          </div>
        </div>

        <div className="section-grid">
          <article className="section-card section-card-large">
            <span className="section-label">Direction</span>
            <h2>Where the work is heading</h2>
            <p>
              I enjoy building systems that combine strong backend architectures with elegant, interactive human interfaces. 
              My current focus is in medical image analysis (image segmentation), NLP-driven contract helpers, and low-latency database-backed systems.
            </p>
          </article>

          <article className="section-card">
            <span className="section-label">Location</span>
            <h3>Shahabad, Karnataka</h3>
            <p>The academic and technical ground that shapes my software engineering journey.</p>
          </article>

          <article className="section-card">
            <span className="section-label">Active Focus</span>
            <h3>Applied AI & DBMS</h3>
            <p>Building high-fidelity models using PyTorch/MONAI, paired with clean, structured schema designs.</p>
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