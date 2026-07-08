import StaggeredGrid from '../components/StaggeredGrid';
import ChatBox from '../components/ChatBox';
import GlowingShadow from '../components/GlowingShadow';

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const bentoItems = [
  {
    id: 'github',
    title: 'GitHub',
    subtitle: 'pavankumargp8',
    icon: <GithubIcon className="w-5 h-5" />,
    href: 'https://github.com/pavankumargp8'
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    subtitle: 'Pavan Kumar',
    icon: <LinkedinIcon className="w-5 h-5" />,
    href: 'https://linkedin.com/in/pavan-kumar'
  },
  {
    id: 'gmail',
    title: 'Gmail',
    subtitle: 'pavankumargp88@gmail.com',
    icon: <MailIcon className="w-5 h-5" />,
    href: 'mailto:pavankumargp88@gmail.com'
  }
];

function ContactPage() {
  return (
    <section className="section-block" style={{ marginBottom: 'var(--spacing-68)' }}>
      {/* 1. Header Section */}
      <div className="section-heading">
        <span className="section-label">Contact</span>
        <h2 className="heading-whisper">Let’s start a conversation</h2>
      </div>

      {/* 2. Intro Description & Primary Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-28)', maxWidth: '44rem', margin: 'var(--spacing-12) 0 var(--spacing-40)' }}>
        <p className="page-intro" style={{ margin: 0 }}>
          I am always open to discussing research projects in medical AI, new database engineering challenges, or responsive frontend experiences. Reach out via email or check my active logs.
        </p>

        <div style={{ display: 'flex', gap: 'var(--spacing-12)', flexWrap: 'wrap' }}>
          <GlowingShadow style={{ width: '160px' }}>
            <a href="mailto:pavankumargp88@gmail.com" style={{ textDecoration: 'none', color: 'inherit', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Email Pavan
            </a>
          </GlowingShadow>
          <GlowingShadow style={{ width: '180px' }}>
            <a
              href="https://github.com/pavankumargp8"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              GitHub Profile
            </a>
          </GlowingShadow>
        </div>
      </div>

      {/* 3. Staggered Grid Mesh (GitHub, LinkedIn, Gmail) */}
      <div style={{ marginTop: 'var(--spacing-40)' }}>
        <StaggeredGrid
          bentoItems={bentoItems}
          centerText="CONTACT"
          showFooter={false}
        />
      </div>

      {/* 4. Chat Box Section */}
      <div style={{ marginTop: 'var(--spacing-40)', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <ChatBox />
      </div>
    </section>
  );
}

export default ContactPage;