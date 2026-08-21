export interface ProjectExperience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  skills: string[];
  metrics?: { label: string; value: string }[];
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: { name: string; level: number; tag?: string }[];
}

export const PERSONAL_INFO = {
  name: "Ajith Pallissery Antony",
  title: "Senior Frontend Engineer & UI Architect",
  tagline: "Architecting high-performance, real-time web applications across PropTech, FinTech, Trading & Web3.",
  location: "Dubai, UAE",
  email: "ajithpallisseryantony@gmail.com",
  phone: "+971 589817188",
  linkedin: "https://www.linkedin.com/in/ajithpallisseryantony/",
  github: "https://github.com/ajithpallisseryantony",
  bio: "Senior Frontend Engineer with 6+ years of experience building and scaling high-performance, real-time web applications. Specialized in React and Next.js with deep expertise in WebSockets, sub-50ms data streaming systems, Core Web Vitals optimization, and mobile-first UI architecture.",
  stats: [
    { value: "6+", label: "Years of Experience" },
    { value: "150k+", label: "Active Web3 & DEX Users Served" },
    { value: "<50ms", label: "WebSocket Real-Time UI Latency" },
    { value: "100%", label: "Core Web Vitals & SEO Focus" }
  ]
};

export const EXPERIENCES: ProjectExperience[] = [
  {
    company: "boli.ae",
    role: "Senior Frontend Engineer",
    period: "Dec 2025 – Present",
    location: "Dubai, UAE",
    featured: true,
    description: "Spearheaded end-to-end frontend architecture for a fast-growing PropTech ecosystem, scaling digital property transactions and real-time KYC compliance.",
    highlights: [
      "Architected core web platform supporting property valuations, POA digital workflows, and instant identity verification.",
      "Integrated Shufti KYC pipelines for automated real-time user identity verification under strict UAE regulatory compliance.",
      "Engineered frictionless digital payment gateway flows for Power of Attorney (POA) and automated valuation services.",
      "Diagnosed and resolved deeply embedded legacy SEO bottlenecks, boosting Core Web Vitals and organic search discoverability by 85%."
    ],
    skills: ["React", "Next.js", "TypeScript", "Shufti KYC", "Payment Gateways", "SEO", "Tailwind CSS"],
    metrics: [
      { label: "Core Web Vitals Boost", value: "85%" },
      { label: "Identity Check Latency", value: "Instant" }
    ]
  },
  {
    company: "Coinroutes",
    role: "Senior Frontend Engineer",
    period: "Sept 2024 – Dec 2025",
    location: "Dubai, UAE",
    featured: true,
    description: "Architected high-frequency institutional crypto & algorithmic trading UIs with real-time order books, streaming market depth, and chart synchronization.",
    highlights: [
      "Built and optimized live order books handling high-frequency updates with minimal sub-50ms UI latency.",
      "Migrated REST-based polling to WebSocket streaming, reducing backend server payload by 60% during peak market volatility.",
      "Modernized state architecture from Redux Saga to Redux Toolkit and completed a full JavaScript to TypeScript migration.",
      "Optimized trading charts by migrating from TradingView Advanced Charts to Lightweight Charts, achieving 4x faster initial render while maintaining full feature parity.",
      "Implemented Ag-Grid server-side data tables with flexlayout-react for customizable institutional trader workspaces."
    ],
    skills: ["React", "TypeScript", "WebSockets", "Redux Toolkit", "Lightweight Charts", "Ag-Grid", "FlexLayout"],
    metrics: [
      { label: "Render Load Speed", value: "4x Faster" },
      { label: "Server Load Reduction", value: "60%" }
    ]
  },
  {
    company: "TNC IT Solutions",
    role: "Senior Frontend Engineer",
    period: "May 2023 – Sept 2024",
    location: "Dubai, UAE",
    featured: true,
    description: "Designed and launched production Web3 platforms, high-throughput NFT marketplaces, and DEX trading tools serving over 150,000 active global users.",
    highlights: [
      "Launched production NFT marketplace serving 150,000+ active users with multi-wallet integrations and low-gas transaction flows.",
      "Built real-time marketplace & DEX trading UI using React, Web3.js, and Socket.IO.",
      "Engineered multi-chain blockchain scanner interfaces, reducing transaction lookup times by 45% through aggressive client-side caching."
    ],
    skills: ["React", "Socket.IO", "Web3", "WalletConnect", "DEX Frontend", "Smart Contract UI"],
    metrics: [
      { label: "Active Users Served", value: "150,000+" },
      { label: "Lookup Speedup", value: "45%" }
    ]
  },
  {
    company: "CoolShop SRL",
    role: "Senior Full Stack Developer",
    period: "Aug 2022 – Apr 2023",
    location: "Dubai, UAE",
    description: "Built high-converting marketing microsites, data import pipelines, and custom dashboards integrated with Salesforce CloudPages.",
    highlights: [
      "Developed marketing microsites and dashboards using React and Salesforce CloudPages.",
      "Engineered automated REST APIs and SQL data import pipelines to sync customer analytics in real time."
    ],
    skills: ["React", "TypeScript", "Salesforce CloudPages", "REST APIs", "Node.js", "SQL"]
  },
  {
    company: "Freelance / Contract Roles",
    role: "Full Stack Developer / Dev Manager",
    period: "Dec 2021 – Aug 2022",
    location: "Remote",
    description: "Delivered customized SaaS applications, property management portals, and fintech booking workflows for international client base.",
    highlights: [
      "Built real estate, fintech, and travel booking applications using React, TypeScript, and Node.js.",
      "Integrated payment gateways, automated email services, and AI-based document parsing pipelines."
    ],
    skills: ["React", "TypeScript", "Node.js", "Express", "FinTech", "AI Document Extraction"]
  },
  {
    company: "Factweavers Technologies",
    role: "Software Engineer",
    period: "Sept 2020 – Nov 2021",
    location: "India",
    description: "Developed enterprise web apps, financial analytics dashboards, and interactive data visualization tools.",
    highlights: [
      "Built production web applications, payment gateways, and modern data visualization dashboards.",
      "Mentored junior frontend developers and refactored legacy codebases to modern ES6+/React patterns."
    ],
    skills: ["React", "JavaScript", "REST APIs", "Data Visualization", "UI Redesign"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend Core & Frameworks",
    description: "Building production-grade, accessible, type-safe web platforms.",
    skills: [
      { name: "React 18 / 19", level: 98, tag: "Primary" },
      { name: "Next.js (SSR / CSR)", level: 94, tag: "Primary" },
      { name: "TypeScript", level: 96, tag: "Primary" },
      { name: "JavaScript (ES6+)", level: 98 },
      { name: "HTML5 / CSS3", level: 95 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Styled Components", level: 90 },
      { name: "Material UI / Ant Design", level: 88 }
    ]
  },
  {
    category: "Real-Time & Data Visualization",
    description: "Sub-50ms data streaming, trading order books, & high-frequency dashboards.",
    skills: [
      { name: "WebSockets & Streaming", level: 98, tag: "Expert" },
      { name: "Socket.IO", level: 95 },
      { name: "Lightweight Charts", level: 92, tag: "Expert" },
      { name: "TradingView Charts", level: 88 },
      { name: "Ag-Grid Enterprise", level: 90 },
      { name: "FlexLayout-React", level: 85 }
    ]
  },
  {
    category: "State Management & Architecture",
    description: "Scalable state models for high-concurrency client data.",
    skills: [
      { name: "Redux Toolkit (RTK)", level: 95, tag: "Primary" },
      { name: "Redux Saga", level: 90 },
      { name: "Context API & React Query", level: 92 },
      { name: "Modular Architecture", level: 94 },
      { name: "Core Web Vitals & SEO", level: 96 }
    ]
  },
  {
    category: "Web3 & Security Integrations",
    description: "Decentralized exchanges, wallet flows, & automated KYC pipelines.",
    skills: [
      { name: "Wallet Integrations (Web3/Ethers)", level: 90 },
      { name: "Shufti KYC Pipeline", level: 92 },
      { name: "NFT Marketplaces & DEX", level: 88 },
      { name: "Payment Gateways (Stripe/Checkout)", level: 94 }
    ]
  },
  {
    category: "Backend & Databases",
    description: "Full-stack API contracts and database management.",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express / Fastify", level: 86 },
      { name: "MongoDB", level: 84 },
      { name: "PostgreSQL & SQL", level: 82 }
    ]
  }
];

export const PHILOSOPHY_TENETS = [
  {
    id: "01",
    title: "Performance-First Mindset",
    summary: "Optimized for sub-50ms real-time data streaming, financial security, and high-frequency peak user events.",
    detail: "High latency kills trader confidence and user retention. I architect UIs with minimal DOM updates, optimized virtual list rendering (Ag-Grid), and lightweight charting pipelines."
  },
  {
    id: "02",
    title: "Pragmatic Testing & Clean Architecture",
    summary: "Predictable, type-safe, maintainable code over complex over-engineering.",
    detail: "Code is read 10x more than it is written. TypeScript strictness, clean Redux state slices, and modular component isolation ensure teams ship features with zero regression."
  },
  {
    id: "03",
    title: "UX, Reliability & Production Parity",
    summary: "Mobile-first, fully accessible, and resilient under harsh network jitter.",
    detail: "Every interface must degrade gracefully during network dropouts, provide instant visual feedback, and maintain crisp responsive layouts on everything from mobile phones to multi-monitor trading setups."
  },
  {
    id: "04",
    title: "Collaborative Product Ownership",
    summary: "Ownership-driven approach collaborating directly with backend, design, & business teams.",
    detail: "I bridge the gap between technical frontend architecture and business goals—defining scalable API contracts, KYC compliance flows, and payment conversion funnels."
  }
];

// Interactive Demo Data for Live Simulators
export const INITIAL_ORDER_BOOK = {
  asks: [
    { price: 67450.50, size: 1.45, total: 1.45 },
    { price: 67449.00, size: 0.82, total: 2.27 },
    { price: 67448.25, size: 3.10, total: 5.37 },
    { price: 67447.50, size: 0.45, total: 5.82 },
    { price: 67446.00, size: 2.15, total: 7.97 }
  ],
  bids: [
    { price: 67445.00, size: 1.95, total: 1.95 },
    { price: 67444.25, size: 2.80, total: 4.75 },
    { price: 67443.50, size: 0.65, total: 5.40 },
    { price: 67442.00, size: 4.20, total: 9.60 },
    { price: 67441.75, size: 1.10, total: 10.70 }
  ]
};
