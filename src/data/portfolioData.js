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
      'An automated medical image segmentation pipeline. Leverages deep learning to delineate complex brain tumors from multi-modal MRIs and trace delicate retinal vessel structures.',
    githubLink: 'https://github.com/pavankumargp8/Medical-Image-Segmentation',
    caseStudy: {
      problem: 'Manual segmentation of 3D brain scans and high-resolution retinal images is slow, highly subjective, and prone to clinical fatigue, delaying critical diagnostic timelines.',
      solution: 'Engineered an attention-gated 3D UNet pipeline using MONAI. Trained on multi-modal MRIs (T1, T2, FLAIR), it automatically produces high-fidelity masks of tumor boundaries, reducing analysis overhead from hours to seconds.',
      metric: {
        type: 'double-bar',
        label1: '3D Brain Tumor',
        val1: 89,
        label2: '2D Retinal Vessels',
        val2: 82,
        suffix: '%'
      },
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
      'A high-throughput log management system. Replaces paper logs with structured relational tables to track and analyze daily check-in activity.',
    githubLink: 'https://github.com/pavankumargp8/DBMS-CheckIn-CheckOut',
    caseStudy: {
      problem: 'Analog logbooks create security vulnerabilities, cause entrance bottlenecks, and make it impossible to audit facility usage or trace occupancy history in real-time.',
      solution: 'Designed a highly normalized MySQL database schema wrapped in a lightweight Java interface. Optimized query indexes to handle 5,000+ daily visitor transactions with check-in confirmation times under 45ms.',
      metric: {
        type: 'radial',
        label: 'Latency Reduction',
        val: 85,
        suffix: '%',
        description: 'Check-in response latency dropped from 300ms down to under 45ms.'
      },
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
      'A local retrieval-augmented generation (RAG) assistant. Automates the extraction of key clauses and liability indicators from dense legal contracts without external cloud dependencies.',
    githubLink: 'https://github.com/pavankumargp8/AI-Legal-Buddy',
    caseStudy: {
      problem: 'Manual contract analysis is time-intensive and risks overlooking critical liability loops, while online translation or parsing tools leak sensitive document data.',
      solution: 'Configured an offline RAG engine using ChromaDB and a quantized Mistral-7B model. Users upload documents locally to identify unfavorable clauses and ask legal queries in a secure, sandboxed interface.',
      metric: {
        type: 'line',
        label: 'Review Duration',
        labelY: 'Minutes',
        x1: 'Manual Review',
        y1: 100,
        x2: 'RAG AI Buddy',
        y2: 35
      },
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
      'An algorithmic seat planning utility. Automates student examination placement, enforces custom spacing rules, and outputs optimized seating charts.',
    githubLink: 'https://github.com/pavankumargp8/Exam-Seat-Allotment',
    caseStudy: {
      problem: 'Manually assigning hundreds of students to exam halls while respecting structural constraints (like alternating subjects to prevent cheating) is an error-prone logistics puzzle.',
      solution: 'Built a constraint-satisfaction scheduling engine in React and Node.js. It distributes candidates across available halls, prevents scheduling clashes, and generates printable layout maps instantly.',
      metric: {
        type: 'radial',
        label: 'Hours Saved',
        val: 92,
        suffix: '%',
        description: 'Saved 15+ hours of manual administrative mapping work per cycle.'
      },
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
      'A clean, editorial-style personal web gallery showcasing interactive engineering projects, featuring circular screen transitions, WebGL line backdrops, and spring animations.',
    githubLink: 'https://github.com/pavankumargp8/portfolio',
    caseStudy: {
      problem: 'Standard resumes and simple websites look flat and fail to showcase advanced front-end engineering, aesthetic design, and interactive UX capabilities.',
      solution: 'Engineered a responsive React SPA featuring custom OGL WebGL components, fluid layout transitions, and persistent theme controls, focused on speed and high visual fidelity.',
      metric: {
        type: 'radial',
        label: 'Lighthouse Rating',
        val: 98,
        suffix: '%',
        description: 'Achieved a 98% Lighthouse performance score on low-end mobile devices.'
      },
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
  'Developed and deployed university curriculum mini-projects with strict focus on database integrity.',
  'Designed offline retrieval-augmented generation (RAG) pipelines for contract analysis.',
  'Competed in medical AI hackathons, building semantic segmentation models for 3D MRI scans.'
];