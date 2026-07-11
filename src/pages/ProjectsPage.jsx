import React, { useState, useEffect } from 'react';
import { projects } from '../data/portfolioData';
import { Github } from 'lucide-react';
import GlowingShadow from '../components/GlowingShadow';
import CircularGallery from '../components/CircularGallery';
import ProjectDrawer from '../components/ProjectDrawer';

// High-quality editorial visual maps matching each project type
const projectImages = {
  '3D Brain Tumor & 2D Retinal Vessel Segmentation': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80',
  'Check-in Check-out System (DBMS)': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  'AI Legal Buddy': 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
  'Examination Seat Allotment System': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
  'Interactive Developer Portfolio': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
};

function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [theme, setTheme] = useState(document.documentElement.classList.contains('light') ? 'light' : 'dark');
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isLight = document.documentElement.classList.contains('light');
          setTheme(isLight ? 'light' : 'dark');
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const shortProjectNames = {
    '3D Brain Tumor & 2D Retinal Vessel Segmentation': 'AI Segmentation',
    'Check-in Check-out System (DBMS)': 'Check-in DBMS',
    'AI Legal Buddy': 'AI Legal Buddy',
    'Examination Seat Allotment System': 'Seat Allotment',
    'Interactive Developer Portfolio': 'Dev Portfolio'
  };

  const galleryItems = projects.map(project => ({
    image: projectImages[project.name] || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    text: shortProjectNames[project.name] || project.name
  }));

  const handleItemClick = (index) => {
    setSelectedProject(projects[index]);
    setIsDrawerOpen(true);
  };

  const textColor = theme === 'light' ? '#0f172a' : '#ffffff';

  return (
    <>
      {/* Introduction */}
      <section className="section-block">
        <div className="section-heading">
          <span className="section-label">Projects</span>
          <h2 className="heading-whisper">Selected work</h2>
        </div>
        <p className="page-intro">
          An editorial compilation of research code, applied deep learning implementations, and database-backed systems. Drag the gallery to spin and click a cover to inspect details.
        </p>
      </section>

      {/* 3D WebGL Circular Gallery Navigation */}
      <section className="section-block" style={{ marginTop: 'var(--spacing-12)' }}>
        <div style={{ height: '500px', position: 'relative', width: '100%', overflow: 'hidden', border: '1px solid var(--color-ash-mist)', backgroundColor: 'var(--surface-card)' }}>
          {webglSupported ? (
            <CircularGallery
              items={galleryItems}
              bend={1.2}
              textColor={textColor}
              borderRadius={0.0} // Sharp 0px corners to match Monopo Saigon
              scrollEase={0.06}
              fontUrl="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
              font="bold 13px Orbitron"
              scrollSpeed={1.8}
              onItemClick={handleItemClick}
            />
          ) : (
            <div className="webgl-fallback-container" style={{ display: 'flex', gap: '24px', padding: '40px 24px', overflowX: 'auto', height: '100%', alignItems: 'center', boxSizing: 'border-box' }}>
              {projects.map((project, index) => (
                <div
                  key={project.name}
                  onClick={() => handleItemClick(index)}
                  className="webgl-fallback-card"
                  style={{
                    flexShrink: 0,
                    width: '260px',
                    height: '380px',
                    border: '1px solid var(--color-ash-mist)',
                    backgroundColor: 'var(--color-paper)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '24px',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s ease, transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-accent-secondary)';
                    e.currentTarget.style.transform = 'translateY(-6px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-ash-mist)';
                    e.currentTarget.style.transform = 'translateY(0px)';
                  }}
                >
                  <img src={projectImages[project.name]} alt={project.name} loading="lazy" decoding="async" style={{ width: '100%', height: '150px', objectFit: 'cover', border: '1px solid var(--color-ash-mist)' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--color-obsidian)', fontFamily: 'var(--font-roobert)', lineHeight: '1.4' }}>{shortProjectNames[project.name] || project.name}</h4>
                    <p style={{ margin: 0, fontSize: '11px', color: 'var(--color-felt-gray)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{project.technologies}</p>
                  </div>
                  <p style={{ margin: 0, fontSize: '11px', color: 'var(--color-accent-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Inspect Case Study</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects List Rows */}
      <section className="section-block" style={{ marginTop: 'var(--spacing-48)' }}>
        <div className="project-list-container">
          {projects.map((project, index) => {
            const imageUrl = projectImages[project.name] || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
            
            return (
              <article key={project.name} id={`project-row-${index}`} className="project-row">
                {/* 1. Full-Bleed Image (0px corners, no shadow) */}
                <div className="project-row-image-wrap">
                  <img
                    src={imageUrl}
                    alt={project.name}
                    className="project-row-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* 2. Metadata & Description Below */}
                <div className="project-row-details">
                  <div className="project-row-header">
                    <div>
                      <h3 className="project-row-title">{project.name}</h3>
                      <span className="project-row-tech">{project.technologies}</span>
                    </div>
                    
                    {/* Status rendered as a 75px pill tag */}
                    <span className="project-row-status-tag">
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="project-row-description">{project.description}</p>

                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '20px' }}>
                    {/* View Case Study Button */}
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setIsDrawerOpen(true);
                      }}
                      style={{
                        height: '38px',
                        padding: '0 20px',
                        border: '1px solid var(--color-ash-mist)',
                        background: 'rgba(255,255,255,0.02)',
                        fontFamily: 'var(--font-roobert)',
                        fontSize: '11px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--color-obsidian)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'border-color 0.25s ease, background 0.25s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-accent)';
                        e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-ash-mist)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      }}
                    >
                      View Case Study
                    </button>

                    {/* View on GitHub Button */}
                    {project.githubLink && (
                      <GlowingShadow style={{ width: '180px', height: '38px' }}>
                        <a 
                          href={project.githubLink}
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
                            gap: '8px',
                            fontSize: '11px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}
                        >
                          <Github className="w-4 h-4" />
                          View on GitHub
                        </a>
                      </GlowingShadow>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Case Study Details Sliding Drawer */}
      <ProjectDrawer
        project={selectedProject}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}

export default ProjectsPage;