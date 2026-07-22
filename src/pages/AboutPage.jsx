import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Cpu, FileText, Code2, Sliders, Wrench } from 'lucide-react';
import { achievements, education, skills } from '../data/portfolioData';
import SpecularButton from '../components/SpecularButton';
import HobbiesStack from '../components/HobbiesStack';
import TiltedCard from '../components/TiltedCard';
import './AboutPage.css';

// Animation variants for section blocks
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

function AboutPage() {
  useEffect(() => {
    document.title = "About | Pavan Kumar";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', "Learn more about Pavan Kumar's academic history, coding journey, and outdoor hobbies.");
    }
  }, []);

  return (
    <div className="about-container">
      {/* 1. Monumental Centered Hero */}
      <motion.section 
        className="about-hero-header"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <h1 className="about-hero-title">ABOUT ME</h1>
        <div className="about-hero-sub">
          <span className="section-label">GET TO KNOW MORE ABOUT</span>
          <h3 className="about-hero-italic">who i am.</h3>
        </div>
      </motion.section>

      {/* 2. Two-Column Biography Grid */}
      <motion.section 
        className="about-bio-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="about-bio-left">
          <span className="section-label">A LITTLE ABOUT ME</span>
          <h2 className="about-bio-greeting">
            Nice to meet you.<br />
            I'm <span className="about-accent-name">Pavan</span>
          </h2>
          <p className="about-bio-desc">
            I transform complex ideas into high-speed, scalable web products. As an engineering driver developer, I focus on the entire stack—prioritizing clean architecture, seamless performance, and modern solutions that drive real value.
          </p>
          <p className="about-bio-desc">
            Beyond writing code, I understand the product lifecycle—how to build, ship, and scale meaningful products in a fast-paced environment.
          </p>
          <p className="about-bio-desc">
            My philosophy is simple: build things that last. I help startups and businesses bridge the gap between concept and reality with code that performs.
          </p>
          
          {/* Social Links Row */}
          <div className="about-bio-socials">
            <a href="https://linkedin.com/in/pavan-kumar" target="_blank" rel="noopener noreferrer" className="about-social-link" title="LinkedIn">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://github.com/pavankumargp8" target="_blank" rel="noopener noreferrer" className="about-social-link" title="GitHub">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="mailto:pavankumargp88@gmail.com" className="about-social-link" title="Email">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>

          <div style={{ marginTop: '24px' }}>
            <SpecularButton
              href="/PavanKumarCSE.pdf"
              download="PavanKumarCSE.pdf"
              target="_blank"
              rel="noopener noreferrer"
              size="md"
              radius={12}
              style={{ width: '220px' }}
            >
              <FileText className="w-4 h-4" />
              Download CV (PDF)
            </SpecularButton>
          </div>
        </div>

        <div className="about-bio-right">
          <TiltedCard
            imageSrc="/profile_card.jpg"
            altText="Pavan Kumar Portrait"
            captionText="Pavan Kumar"
            containerHeight="380px"
            containerWidth="290px"
            imageHeight="380px"
            imageWidth="290px"
            rotateAmplitude={12}
            scaleOnHover={1.05}
            showMobileWarning={false}
            showTooltip
            displayOverlayContent
            overlayContent={
              <p className="tilted-card-demo-text" style={{ 
                fontFamily: 'var(--font-roobert)', 
                fontSize: '13px', 
                fontWeight: 600, 
                color: 'white', 
                textTransform: 'uppercase', 
                letterSpacing: '0.08em', 
                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
              }}>
                Pavan Kumar
              </p>
            }
          />
        </div>
      </motion.section>

      {/* 2. Timeline / Education Section */}
      <motion.section 
        className="section-block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="section-heading">
          <span className="section-label">Education</span>
          <h2 className="heading-whisper">Academic timeline</h2>
        </div>

        <motion.div className="timeline-container" variants={itemVariants}>
          {education.map((item, index) => (
            <motion.div 
              key={item.school} 
              className="timeline-item"
              variants={itemVariants}
            >
              <div className="timeline-node" />
              <div className="timeline-meta">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <GraduationCap className="w-3.5 h-3.5" />
                  {item.meta}
                </span>
              </div>
              <h3 className="timeline-title">{item.school}</h3>
              <p className="timeline-sub">{item.place}</p>
              <p className="timeline-desc">{item.degree}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* 3. Interactive Technical Capability Grid */}
      <motion.section 
        className="section-block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="section-heading">
          <span className="section-label">Skills</span>
          <h2 className="heading-whisper">Technical capability</h2>
        </div>

        <div className="skills-grid-container">
          {/* Languages Card */}
          <motion.div className="skill-category-card" variants={itemVariants}>
            <div className="skill-category-title">
              <Code2 className="skill-category-icon" />
              <span className="section-label" style={{ margin: 0 }}>Languages</span>
            </div>
            <div className="skill-tags-list">
              {skills.languages.map(lang => (
                <span key={lang} className="skill-tag-pill">{lang}</span>
              ))}
            </div>
          </motion.div>

          {/* Frameworks Card */}
          <motion.div className="skill-category-card" variants={itemVariants}>
            <div className="skill-category-title">
              <Cpu className="skill-category-icon" />
              <span className="section-label" style={{ margin: 0 }}>Frameworks</span>
            </div>
            <div className="skill-tags-list">
              {skills.frameworks.map(fw => (
                <span key={fw} className="skill-tag-pill">{fw}</span>
              ))}
            </div>
          </motion.div>

          {/* Tools Card */}
          <motion.div className="skill-category-card" variants={itemVariants}>
            <div className="skill-category-title">
              <Wrench className="skill-category-icon" />
              <span className="section-label" style={{ margin: 0 }}>Tools & IDEs</span>
            </div>
            <div className="skill-tags-list">
              {skills.tools.map(tool => (
                <span key={tool} className="skill-tag-pill">{tool}</span>
              ))}
            </div>
          </motion.div>

          {/* Strengths Card */}
          <motion.div className="skill-category-card" variants={itemVariants}>
            <div className="skill-category-title">
              <Sliders className="skill-category-icon" />
              <span className="section-label" style={{ margin: 0 }}>Core Strengths</span>
            </div>
            <div className="skill-tags-list">
              {skills.strengths.map(strength => (
                <span key={strength} className="skill-tag-pill">{strength}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 4. Awards / Achievements Section */}
      <motion.section 
        className="section-block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        style={{ marginBottom: 'var(--spacing-28)' }}
      >
        <div className="section-heading">
          <span className="section-label">Awards</span>
          <h2 className="heading-whisper">Notable milestones</h2>
        </div>

        <div className="milestones-list">
          {achievements.map((achievement, index) => (
            <motion.div 
              key={achievement} 
              className="milestone-item-row"
              variants={itemVariants}
            >
              <span className="milestone-num">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Award className="w-3.5 h-3.5 text-accent-secondary" />
                  0{index + 1}
                </span>
              </span>
              <p className="milestone-text">{achievement}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 5. Hobbies & Interests Section */}
      <motion.section 
        className="section-block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        style={{ marginBottom: 'var(--spacing-48)' }}
      >
        <div className="section-heading">
          <span className="section-label">Interests</span>
          <h2 className="heading-whisper">Offline activities</h2>
        </div>

        <p className="page-intro">
          When I am not training neural networks or configuring database models, I enjoy competing in multiplayer arenas, exploring scenic heights, and playing team sports.
        </p>

        <HobbiesStack />
      </motion.section>
    </div>
  );
}

export default AboutPage;