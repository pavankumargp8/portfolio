import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Cpu, FileText, Code2, Sliders, Wrench } from 'lucide-react';
import { achievements, education, skills } from '../data/portfolioData';
import GlowingShadow from '../components/GlowingShadow';
import HobbiesStack from '../components/HobbiesStack';
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
      {/* 1. Manifesto / Introduction Section */}
      <motion.section 
        className="section-block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="section-heading">
          <span className="section-label">Manifesto</span>
          <h2 className="heading-whisper">Where the work is heading</h2>
        </div>

        <motion.div className="about-hero" variants={itemVariants}>
          <div className="about-glow" />
          <p className="about-manifesto-text">
            I write code to make complex systems behave predictably and look clean. Currently pursuing my B.E. in Computer Science & Engineering, my work centers on medical deep learning pipelines, normalized database systems, and robust web applications that solve real-world workflows without unnecessary noise.
          </p>
          <div>
            <GlowingShadow style={{ width: '280px' }}>
              <a 
                href="/PavanKumarCSE.pdf" 
                download="PavanKumarCSE.pdf"
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  textDecoration: 'none', 
                  color: 'inherit', 
                  width: '100%', 
                  height: '100%', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px' 
                }}
              >
                <FileText className="w-4 h-4" />
                Download CV (PDF)
              </a>
            </GlowingShadow>
          </div>
        </motion.div>
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