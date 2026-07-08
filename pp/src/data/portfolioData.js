export const contactLinks = [
  {
    label: 'Email',
    value: 'pavankumargp88@gmail.com',
    href: 'mailto:pavankumargp88@gmail.com',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/pavan-kumar',
    href: 'https://linkedin.com/in/pavan-kumar',
  },
  {
    label: 'GitHub',
    value: 'github.com/pavankumargp8',
    href: 'https://github.com/pavankumargp8',
  },
];

export const education = [
  {
    school: 'P.E.S Institute of Technology and Management (PESITM)',
    place: 'Shivamogga, Karnataka',
    degree: 'B.E. in Computer Science & Engineering (CSE)',
    meta: 'CGPA 8.9 · Expected Graduation 2027',
  },
  {
    school: 'Shree Guru Independent PU College',
    place: 'Kalaburagi, Karnataka',
    degree: 'PUC (Science)',
    meta: 'Score 93.33% · Year 2023',
  },
  {
    school: 'Mount Carmel Convent School',
    place: 'Shahabad, Karnataka',
    degree: 'SSLC',
    meta: 'Score 89.28% · Year 2021',
  },
];

export const skills = {
  languages: ['C', 'C++', 'Java', 'Python', 'HTML', 'CSS', 'JavaScript', 'SQL', 'React.js'],
  frameworks: ['MONAI', 'PyTorch', 'TensorFlow', 'NumPy', 'Pandas'],
  tools: ['VS Code', 'Cursor', 'Windsurf IDE', 'Jupyter Notebook', 'Git', 'MySQL Workbench'],
  strengths: ['Deep Learning', 'Image Segmentation', 'DBMS', 'AI Automation', 'Model Training'],
};

export const projects = [
  {
    name: '3D Brain Tumor & 2D Retinal Vessel Segmentation',
    status: 'Completed',
    technologies: 'MONAI, PyTorch',
    description:
      'Developed a model for the BraTS challenge on Kaggle, focused on multi-modal MRI analysis and tumor segmentation.',
    githubLink: 'https://github.com/pavankumargp8',
    caseStudy: {
      problem: 'Segmenting multi-modal 3D MRI scans and high-resolution retinal images accurately is critical for diagnostic aid, but manual annotation is slow and error-prone.',
      solution: 'Developed a neural pipeline using MONAI and PyTorch with 3D UNet and Attention mechanisms, achieving high dice scores on the BraTS benchmark dataset.',
      features: [
        'Multi-modal MRI input (T1, T1c, T2, FLAIR) fusion.',
        'Attention-gated UNet block segmentation.',
        'Dynamic loss function mixing Dice and Cross-Entropy loss.',
        'Retinal vessel tracing on 2D fundus photography.'
      ],
      flow: [
        { step: '1. Multi-modal MRI scans input (FLAIR, T1, T2)', direction: 'down' },
        { step: '2. Preprocessing & Normalization via MONAI pipeline', direction: 'down' },
        { step: '3. Attention 3D UNet segmentation model execution', direction: 'down' },
        { step: '4. High-fidelity tumor mask prediction output', direction: '' }
      ]
    }
  },
  {
    name: 'Check-in Check-out System (DBMS)',
    status: 'Completed',
    technologies: 'MySQL, Java',
    description:
      'Built a dynamic entry and exit logging system with user registration, dashboards, and full database-backed tracking.',
    githubLink: 'https://github.com/pavankumargp8',
    caseStudy: {
      problem: 'Managing building entry/exit tracking manually leads to security loopholes, delays, and poor analytics on visitor distribution.',
      solution: 'Built a Java JDBC client connected to a secure MySQL database backend, storing structured user logs and rendering real-time dashboard stats.',
      features: [
        'Secure operator registration and authentication system.',
        'Real-time automated timestamp log creation upon scan.',
        'Advanced SQL reporting queries with visitor trends.',
        'Clean GUI design with user profile lookup.'
      ],
      flow: [
        { step: '1. Operator scans student/visitor badge profile ID', direction: 'down' },
        { step: '2. Java desktop client executes local query validation', direction: 'down' },
        { step: '3. MySQL relational engine locks entry/exit timestamp log', direction: 'down' },
        { step: '4. Dynamic dashboard updates active occupant counts', direction: '' }
      ]
    }
  },
  {
    name: 'AI Legal Buddy',
    status: 'Completed',
    technologies: 'Python, FastAPI, Mistral/Gemma',
    description:
      'LLM-powered legal assistant for clause extraction, contract analysis, and offline document review workflows.',
    githubLink: 'https://github.com/pavankumargp8',
    caseStudy: {
      problem: 'Reviewing long-form legal contracts manually is tedious and makes it easy to overlook critical liability clauses or unfavorable terms.',
      solution: 'Created an offline legal AI assistant using Mistral-7B/Gemma model embeddings, FastAPI backend routing, and custom retrieval logic.',
      features: [
        'Semantic chunking of PDF and DOCX legal files.',
        'Offline LLM inference using quantized model weight files.',
        'Risk classification scoring for indemnification clauses.',
        'RAG-based chat dialog interface for contract queries.'
      ],
      flow: [
        { step: '1. User uploads legal contract document file (PDF)', direction: 'down' },
        { step: '2. FastAPI slices text into chunks & indexes embeddings', direction: 'down' },
        { step: '3. Quantized Mistral model parses risks and key clauses', direction: 'down' },
        { step: '4. Interactive chat box delivers legal advice outputs', direction: '' }
      ]
    }
  },
  {
    name: 'Examination Seat Allotment System',
    status: 'Mini Project',
    technologies: 'React, Node.js, PostgreSQL',
    description:
      'Web system for automated seat allocation with bulk CSV uploads, seating patterns, and downloadable reports.',
    githubLink: 'https://github.com/pavankumargp8',
    caseStudy: {
      problem: 'Assigning seating plans for hundreds of university students across multiple branches manually leads to scheduling collisions and layout bias.',
      solution: 'Developed an automated seat distribution web application powered by React and Node.js with a PostgreSQL constraint matching engine.',
      features: [
        'Bulk CSV uploads for quick student and class roster imports.',
        'Collision-free branch shuffling seating distribution engine.',
        'Classroom visual grid layout editor.',
        'One-click PDF generation for printable seating maps.'
      ],
      flow: [
        { step: '1. Admin uploads student branch list CSV datasets', direction: 'down' },
        { step: '2. Node.js backend processes constraints & shuffles seats', direction: 'down' },
        { step: '3. PostgreSQL transaction commits collision-free plans', direction: 'down' },
        { step: '4. Web dashboard exports ready-to-print seating map PDFs', direction: '' }
      ]
    }
  },
  {
    name: 'Interactive Developer Portfolio',
    status: 'Completed',
    technologies: 'React, Framer Motion, WebGL, GSAP',
    description:
      'A high-fidelity developer portfolio styled with Monopo Saigon aesthetics, dark/light themes, circular transition reveals, WebGL line backdrops, and custom spring animations.',
    githubLink: 'https://github.com/pavankumargp8/portfolio',
    caseStudy: {
      problem: 'Standard resumes and simple websites look flat and fail to showcase advanced engineering, aesthetic design, and interactive UX capabilities.',
      solution: 'Engineered a React SPA with WebGL canvas backdrops, View Transitions theme toggling, GSAP typography, and CSS Houdini border animations.',
      features: [
        '3D WebGL wavy lines and project gallery carousels.',
        'Circular ripple page reveals on theme toggles.',
        'Smooth mouse trailing ring magnetic cursor glows.',
        'Step-by-step chat assistant for direct visitor messages.'
      ],
      flow: [
        { step: '1. User interacts with site grid cards or toggle buttons', direction: 'down' },
        { step: '2. React state hook triggers View Transitions circular clip', direction: 'down' },
        { step: '3. WebGL OGL renders 3D line bending/gallery spins', direction: 'down' },
        { step: '4. Custom cursor expands ring & snaps to clickable targets', direction: '' }
      ]
    }
  }
];

export const achievements = [
  'Participated in the MONAITHON Hackathon (Medical AI).',
  'Developed the Examination Seat Allotment System as a mini-project under the VTU curriculum.',
  'Created AI Legal Buddy using NLP and LLM models.',
];