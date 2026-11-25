/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  PORTFOLIO CONFIGURATION - BALAKRISHNAN S                    ║
 * ║  PURPLE GALAXY · PREMIUM 3D GLASSMORPHISM PORTFOLIO          ║
 * ║  AI & Data Science Student · Excel Engineering College      ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

/* ───────────── 1. BASIC INFO ───────────── */
export const SITE = {
  name: 'BALAKRISHNAN S',
  pageTitle: 'BALAKRISHNAN S – AI & Data Science Developer | Purple Galaxy 3D Portfolio',
  role: 'AI & Data Science Developer · Aspiring AI Engineer',
  email: 'balasathish658@gmail.com',
  phone: '919360264849',
  phoneFormatted: '+91 9360264849',
  location: 'Kallakurichi, Tamil Nadu, India',
  college: 'Excel Engineering College (Autonomous)',
  education: 'B.Tech. Artificial Intelligence and Data Science',
  graduationYear: '2027',
  whatsappMessage: 'Hi Balakrishnan, I visited your portfolio and would like to get in touch.',
  available: true,
};

/* ───────────── 2. HERO (top of page) ───────────── */
export const HERO = {
  eyebrow: 'ARTIFICIAL INTELLIGENCE & DATA SCIENCE',
  headline: 'BALAKRISHNAN S',
  roles: [
    'AI Developer',
    'Data Scientist',
    'Full Stack Developer',
    'Data Analyst',
    'Prompt Engineer',
  ] as string[],
  tagline: 'Building Intelligent Solutions Through AI, Data Science & Innovation.',
  primaryButton: 'EXPLORE MY PROJECTS',
  secondaryButton: 'CONTACT ME',
  image: '/assets/hero-red-bg.jpg', // 1920x1080 purple galaxy background with authentic portrait
  imageAlt: 'Portrait of BALAKRISHNAN S inside 3D Glass Shards',
  imagePosition: '69% center',
};

/* ───────────── 3. LOADING SCREEN ───────────── */
export const LOADER = {
  statement: 'BALAKRISHNAN S - LOADING PORTFOLIO...',
  accentWords: ['BALAKRISHNAN', 'PORTFOLIO'],
};

/* ───────────── 4. ABOUT ───────────── */
export const ABOUT = {
  eyebrow: 'AI & Data Science · Machine Learning · Full Stack',
  portrait: '/media/profile.webp',
  portraitAlt: 'Portrait of BALAKRISHNAN S',
  portraitCaption: 'AI & Data Science Developer',
  paragraphs: [
    'I am Balakrishnan S, currently pursuing B.Tech in Artificial Intelligence and Data Science at Excel Engineering College (Autonomous), graduating in the class of 2027. My academic and technical foundation is rooted in engineering rigor, algorithmic problem solving, mathematical modeling, and modern data structures.',
    'I am an aspiring AI and Data Science developer passionate about architecting intelligent applications, innovative software solutions, and high-performance web experiences. I actively explore Machine Learning, Data Analytics, Generative AI, and Full Stack Development, continuously building practical real-world projects to solve impactful industry challenges.',
  ],
  infoCards: [
    { label: 'Name', value: 'BALAKRISHNAN S' },
    { label: 'Location', value: 'Kallakurichi, Tamil Nadu, India' },
    { label: 'Education', value: 'B.Tech AI & Data Science' },
    { label: 'Graduation', value: '2027 · Excel Engg College' },
    { label: 'Career Focus', value: 'AI Engineer / Data Scientist' },
  ],
  technologies: [
    'Python',
    'Machine Learning',
    'Data Science',
    'Generative AI',
    'Prompt Engineering',
    'Claude AI',
    'ChatGPT',
    'React.js',
    'Node.js',
    'MongoDB',
    'MySQL',
    'Power BI',
    'Tailwind CSS',
    'REST APIs',
  ],
  focus: [
    'Artificial Intelligence & ML',
    'Data Science & Analytics',
    'Full Stack Web Applications',
    'Generative AI & LLM Systems',
  ],
};

/* ───────────── 5. SOCIAL LINKS (footer & contact) ───────────── */
export const SOCIALS = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/balakrishnan658' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/balakrish658/' },
] as const;

/* ───────────── 6. TECHNICAL SKILLS (6 cards) ───────────── */
export const SKILL_CARDS: { name: string; category: string; level: string; skills: string[] }[] = [
  {
    name: 'Programming Languages',
    category: 'Core algorithmic problem solving & system scripting',
    level: 'Advanced',
    skills: ['Python', 'Java (Basic)', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    name: 'AI & Machine Learning',
    category: 'Intelligent systems, deep learning & generative AI',
    level: 'Advanced',
    skills: ['Artificial Intelligence', 'Machine Learning', 'Data Science', 'Generative AI', 'Prompt Engineering', 'Claude AI', 'ChatGPT'],
  },
  {
    name: 'Data Science & Analytics',
    category: 'Exploratory data analysis & business intelligence',
    level: 'Advanced',
    skills: ['Data Science', 'Data Analytics', 'Statistical Modeling', 'Power BI Dashboards', 'EDA'],
  },
  {
    name: 'Frontend Development',
    category: 'Modern reactive interfaces & glassmorphism 3D UI',
    level: 'Proficient',
    skills: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
  },
  {
    name: 'Backend & APIs',
    category: 'Scalable servers, REST architecture & service routing',
    level: 'Proficient',
    skills: ['Node.js', 'Express.js', 'REST API', 'Server Architecture'],
  },
  {
    name: 'Databases & Dev Tools',
    category: 'Relational/NoSQL data storage & developer toolchain',
    level: 'Proficient',
    skills: ['MongoDB', 'MySQL', 'Git', 'GitHub', 'VS Code', 'Power BI'],
  },
];

/* ───────────── 6b. TECH STACK STRIP (logos under the skills) ───────────── */
export const TECH_STACK: string[] = [
  'Python',
  'Claude AI',
  'ChatGPT',
  'React',
  'JavaScript',
  'Node.js',
  'MongoDB',
  'MySQL',
  'Tailwind CSS',
  'Power BI',
  'Git',
  'GitHub',
  'HTML5',
  'CSS3',
  'Three.js',
  'GSAP',
];

/* ───────────── 7. PROJECTS (6 distinct projects) ───────────── */
export interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  videoUrl?: string;
  embedUrl?: string;
  driveUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  kind?: 'video' | 'software';
  poster?: string;
  description?: string;
  tags?: string[];
  features?: string[];
}

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 'smart-bike-parking',
    kind: 'software',
    title: 'Smart Bike Parking and Automatic Billing System',
    subtitle: 'Automated IoT & AI Parking Management Solution',
    category: 'AI & IoT Automation',
    poster: '/assets/thumbnails/project-1-1.jpg',
    description: 'An intelligent automated bike parking management and automatic billing solution that optimizes slot allocation, tracks vehicle occupancy in real time, and automates tariff calculation.',
    tags: ['IoT', 'Python', 'Automation', 'Billing System', 'Sensors'],
    features: [
      'Real-time ultrasonic sensor occupancy detection and slot allocation',
      'Automatic license plate and entry/exit timestamp calculation',
      'Dynamic automated billing engine with paperless digital receipts',
    ],
  },
  {
    id: 'smartmart-ai-expiry-billing',
    kind: 'software',
    title: 'SmartMart – AI Expiry Analysis & Billing',
    subtitle: 'AI-Powered Supermarket Expiry Date Analysis & Smart Billing',
    category: 'Computer Vision & Retail AI',
    poster: '/assets/thumbnails/project-2-1.jpg',
    description: 'AI-powered retail management system that conducts automated expiry date analysis on supermarket products, prevents inventory spoilage, and enables accelerated smart billing for customers.',
    tags: ['Computer Vision', 'Machine Learning', 'Data Analytics', 'Smart Billing', 'Python'],
    features: [
      'Computer vision OCR pipeline for automated packaging expiry date extraction',
      'Predictive inventory shelf-life forecasting to minimize stock spoilage',
      'High-speed barcode and optical smart billing cart checkout flow',
    ],
  },
  {
    id: 'smart-break-recommendation',
    kind: 'software',
    title: 'Smart Break Recommendation System',
    subtitle: 'Intelligent Ergonomic & Productivity Wellness Engine',
    category: 'Machine Learning & Analytics',
    poster: '/assets/thumbnails/project-3-1.jpg',
    description: 'An intelligent recommendation system analyzing continuous work sessions, screen exposure time, and user fatigue patterns to deliver personalized ergonomic break schedules.',
    tags: ['Machine Learning', 'Recommendation Engine', 'Data Analytics', 'Health Tech', 'Python'],
    features: [
      'Adaptive ergonomic cadence algorithm tailored to individual work intensity',
      'Fatigue trend analysis and posture recovery exercise suggestions',
      'Real-time wellness analytics dashboard with productivity insights',
    ],
  },
  {
    id: 'buildtrack-ai-pro',
    kind: 'software',
    title: 'BuildTrack AI Pro',
    subtitle: 'AI Construction Site Safety & Resource Tracking Platform',
    category: 'Computer Vision & Site Intelligence',
    poster: '/assets/thumbnails/project-4-1.jpg',
    description: 'Intelligent construction site intelligence system utilizing computer vision for personal protective equipment (PPE) compliance detection, worker hazard alerts, and real-time heavy equipment tracking.',
    tags: ['Computer Vision', 'Deep Learning', 'Site Safety', 'PPE Detection', 'Python'],
    features: [
      'Real-time YOLO neural network helmet and high-visibility vest verification',
      'Restricted hazard zone perimeter geofencing with instant safety alerts',
      'Material inventory throughput analytics and equipment utilization telemetry',
    ],
  },
  {
    id: 'customer-behavior-analysis',
    kind: 'software',
    title: 'Smart Customer Behavior Analysis Platform',
    subtitle: 'Predictive Consumer Insights & Trend Analytics',
    category: 'Data Science & Predictive AI',
    poster: '/assets/thumbnails/project-5-1.jpg',
    description: 'A comprehensive data science analytics platform utilizing predictive modeling, customer segmentation, and behavioral clustering to identify buying patterns and enhance decision-making.',
    tags: ['Data Science', 'Machine Learning', 'Predictive Modeling', 'Analytics', 'Power BI'],
    features: [
      'K-Means customer clustering for personalized persona classification',
      'Churn probability estimation and lifetime value predictive forecasting',
      'Interactive executive Power BI dashboards with real-time KPI metrics',
    ],
  },
  {
    id: 'network-intrusion-detection',
    kind: 'software',
    title: 'Network Intrusion Detection System',
    subtitle: 'Machine Learning-Driven Cyber Threat Defense Architecture',
    category: 'Cybersecurity & Machine Learning',
    poster: '/assets/thumbnails/project-6-1.jpg',
    description: 'Machine-learning-based intrusion detection framework designed to inspect network traffic, identify malicious anomaly signatures in real time, and protect infrastructure from zero-day cyber attacks.',
    tags: ['Machine Learning', 'Cybersecurity', 'Anomaly Detection', 'Network Security', 'Python'],
    features: [
      'Deep packet telemetry classification against benchmark threat matrices',
      'Unsupervised anomaly detection flagging zero-day behavioral deviations',
      'High-throughput alert dispatch pipeline with actionable mitigation logs',
    ],
  },
];

/* ───────────── 8. SERVICES (6 specialized domains) ───────────── */
export const SERVICES_PRICING = [
  {
    id: 'service-1',
    title: 'AI Application Development',
    description: 'Custom intelligent software and automation pipelines built with modern AI models and algorithmic workflows.',
    deliverables: ['Custom AI Pipelines', 'Model Integration', 'Automated Decision Engines'],
    priceLabel: 'Expertise',
    price: 'Core Domain',
    featured: true,
  },
  {
    id: 'service-2',
    title: 'Machine Learning Solutions',
    description: 'Predictive models, classification systems, and regression frameworks trained on domain-specific datasets.',
    deliverables: ['Supervised & Unsupervised ML', 'Model Evaluation & Tuning', 'Data Preprocessing'],
    priceLabel: 'Expertise',
    price: 'Core Domain',
    featured: false,
  },
  {
    id: 'service-3',
    title: 'Data Analytics & Power BI',
    description: 'Interactive business intelligence dashboards, KPI visualization, and exploratory statistical analytics.',
    deliverables: ['Power BI Dashboards', 'Exploratory Data Analysis', 'KPI & Trend Reports'],
    priceLabel: 'Expertise',
    price: 'Analytics',
    featured: false,
  },
  {
    id: 'service-4',
    title: 'Full Stack Web Development',
    description: 'Modern responsive web applications built with React, Node.js, Tailwind CSS, and 3D glassmorphic designs.',
    deliverables: ['React & Tailwind UI', 'Node & Express Backends', 'RESTful API Services'],
    priceLabel: 'Expertise',
    price: 'Full Stack',
    featured: false,
  },
  {
    id: 'service-5',
    title: 'Generative AI & Prompt Engineering',
    description: 'Designing structured prompts, LLM embeddings, Retrieval-Augmented Generation, and AI agent architectures.',
    deliverables: ['LLM Workflow Design', 'Structured Prompt Systems', 'AI Automation Agents'],
    priceLabel: 'Expertise',
    price: 'Gen AI',
    featured: false,
  },
  {
    id: 'service-6',
    title: 'Intelligent Automation Systems',
    description: 'IoT sensor integration, smart parking/billing architectures, and automated anomaly detection systems.',
    deliverables: ['Hardware/Sensor Interfacing', 'Automated Billing Logic', 'Real-Time Monitoring'],
    priceLabel: 'Expertise',
    price: 'Systems',
    featured: false,
  },
] as const;

/* ───────────── 9. HEADLINE NUMBERS (under hero) ───────────── */
export const CLIENT_STATS = [
  { id: 'stat-1', value: 6, suffix: '+', label: 'AI & Engineering Projects' },
  { id: 'stat-2', value: 15, suffix: '+', label: 'Technologies & Tools' },
  { id: 'stat-3', value: 2027, suffix: '', label: 'Graduation Year · Excel Engg' },
] as const;

/* Derived contact link */
export const WHATSAPP_URL = `https://wa.me/${SITE.phone}?text=${encodeURIComponent(SITE.whatsappMessage)}`;

/* Google Apps Script Web App Endpoint for Contact Form Submissions */
export const GOOGLE_APPS_SCRIPT_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbxvF0-sVOUDw9AhPyFr7TcZKY0Vg6IKtg_AjGF7OfXakxXOAUkirSPdCoN_qxnIhh3j/exec';

/* Dedicated Google Sheet URL for Portfolio Submissions */
export const GOOGLE_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1rxnJNKvj8wR1mjrVXm7w7uu43WVot3LrhvaVVcv4sow/edit?gid=0#gid=0';
