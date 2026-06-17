// ─── EDIT ALL YOUR INFO HERE ────────────────────────────────────────────────

export const personal = {
  name: 'Pavan Kumar',
  initials: 'PK.',
  tagline: 'Building intelligent systems that solve real problems.',
  subtitle:
    "Hi, I'm Pavan Kumar — a CSE student at PESITM Shivamogga with a passion for deep learning, medical AI, and full-stack systems.",
  heroLabel: 'Computer Science Engineer · AI · Deep Learning · n8n · Agentic AI',
  about: [
    "I'm a B.E. CSE student (Expected 2027) at PES Institute of Technology and Management, Shivamogga, currently maintaining an 8.9 CGPA. My work lives at the intersection of machine learning, medical imaging, and practical software systems.",
    'From segmenting brain tumors in multi-modal MRI data to building LLM-powered legal assistants, designing agentic AI workflows, and automating complex pipelines with n8n — I approach every problem with a systems mindset and a bias for clean, purposeful engineering.',
  ],
  email: 'pavankumargp88@gmail.com',
  github: 'https://github.com/pavankumargp8',
  linkedin: 'https://linkedin.com/in/pavan-kumar',
  location: 'Shahabad, Karnataka, India',
  status: 'Open to internships & collaborations',
  hackathon: 'MONAITHON — Medical AI Hackathon',
  stats: [
    { value: '8.9', label: 'CGPA' },
    { value: '4+', label: 'Projects' },
    { value: 'AI', label: 'Focus' },
  ],
}

export const projects = [
  {
    title: "Examination Seat Allotment System",
    description:
      "A web-based platform that automates exam seat allocation with CSV uploads, intelligent seating patterns, downloadable reports, and a student portal.",
    tech: [
      "React",
      "Node.js",
      "PostgreSQL",
      "PDF",
      "CSV"
    ],
    github: "https://github.com/pavankumargp8",
    live: "#",
    color: "from-cyan-500 to-blue-600"
  },

  {
    title: "AI Legal Buddy",
    description:
      "LLM-powered legal assistant capable of clause extraction, semantic contract analysis, and automated document review using offline language models.",
    tech: [
      "Python",
      "FastAPI",
      "Mistral",
      "Gemma",
      "LLM"
    ],
    github: "https://github.com/pavankumargp8",
    live: "#",
    color: "from-purple-500 to-pink-500"
  },

  {
    title: "3D Brain Tumor Segmentation",
    description:
      "Medical AI project built with MONAI and PyTorch for BraTS MRI segmentation and retinal vessel analysis using deep learning.",
    tech: [
      "MONAI",
      "PyTorch",
      "TensorFlow"
    ],
    github: "https://github.com/pavankumargp8",
    live: "#",
    color: "from-green-500 to-cyan-500"
  },

  {
    title: "Check-in Check-out System",
    description:
      "Dynamic check-in/check-out management system featuring user registration, live tracking, dashboard, and MySQL database integration.",
    tech: [
      "Java",
      "MySQL",
      "HTML",
      "CSS"
    ],
    github: "https://github.com/pavankumargp8",
    live: "#",
    color: "from-orange-500 to-red-500"
  }
];

export const skills = {
  languages: [
    { name: 'Python',     level: 'Advanced',  pct: 88 },
    { name: 'Java',       level: 'Proficient', pct: 75 },
    { name: 'JavaScript', level: 'Proficient', pct: 72 },
    { name: 'C / C++',   level: 'Competent',  pct: 65 },
    { name: 'SQL',        level: 'Proficient', pct: 78 },
  ],
  frameworks: [
    'MONAI', 'PyTorch', 'TensorFlow', 'React.js', 'Node.js',
    'FastAPI', 'NumPy', 'Pandas', 'HTML / CSS', 'n8n', 'Agentic AI',
  ],
  tools: [
    { dot: 'primary',   text: 'VS Code · Cursor · Windsurf IDE' },
    { dot: 'primary',   text: 'Git · GitHub' },
    { dot: 'primary',   text: 'Jupyter Notebook · MySQL Workbench' },
    { dot: 'secondary', text: 'Deep Learning & Image Segmentation' },
    { dot: 'secondary', text: 'AI Automation & Model Training' },
    { dot: 'secondary', text: 'DBMS · PostgreSQL · MySQL' },
    { dot: 'n8n',       text: 'n8n Workflow Automation' },
    { dot: 'primary',   text: 'Agentic AI Systems' },
  ],
}

export const education = [
  {
    degree: 'B.E. in Computer Science & Engineering',
    institution: 'P.E.S Institute of Technology and Management (PESITM)',
    location: 'Shivamogga, Karnataka',
    score: '8.9',
    scoreLabel: 'CGPA',
    year: 'Expected 2027',
    current: true,
    dot: 'primary',
  },
  {
    degree: 'PUC (Science)',
    institution: 'Shree Guru Independent PU College',
    location: 'Kalaburagi, Karnataka',
    score: '93.33%',
    scoreLabel: 'Score',
    year: '2023',
    current: false,
    dot: 'secondary',
  },
  {
    degree: 'SSLC',
    institution: 'Mount Carmel Convent School',
    location: 'Shahabad, Karnataka',
    score: '89.28%',
    scoreLabel: 'Score',
    year: '2021',
    current: false,
    dot: 'outline',
  },
]

export const achievements = [
  {
    icon: 'emoji_events',
    title: 'MONAITHON Hackathon',
    description:
      'Participated in the MONAITHON Medical AI Hackathon, applying deep learning expertise to healthcare challenges.',
  },
  {
    icon: 'school',
    title: 'VTU Mini Project',
    description:
      'Developed the Examination Seat Allotment System as a recognized mini-project under the VTU curriculum.',
  },
  {
    icon: 'psychology',
    title: 'AI Legal Buddy',
    description:
      'Built a practical NLP & LLM-powered legal assistant demonstrating real-world AI application with offline inference.',
  },
]
