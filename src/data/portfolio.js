export const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "My Story" },
  { id: "skills", label: "Arsenal" },
  { id: "experience", label: "Saga" },
  { id: "projects", label: "Missions" },
  { id: "education", label: "Academy" },
  { id: "certificates", label: "Scrolls" },
  { id: "contact", label: "Connect" },
];

export const skillCategories = [
  {
    title: "Frontend Development",
    subtitle: "Fire Release · 火遁",
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3"],
  },
  {
    title: "State Management",
    subtitle: "Wind Release · 風遁",
    skills: ["Redux", "Zustand", "TanStack Query"],
  },
  {
    title: "UI & Styling",
    subtitle: "Water Release · 水遁",
    skills: ["Tailwind CSS", "Bootstrap", "Material UI", "Framer Motion"],
  },
  {
    title: "Backend Development",
    subtitle: "Earth Release · 土遁",
    skills: ["C#", ".NET", "ASP.NET Web API", "REST API Development", "Entity Framework", "SignalR"],
  },
  {
    title: "Databases",
    subtitle: "Wood Release · 木遁",
    skills: ["PostgreSQL", "SQL Server", "MySQL"],
  },
  {
    title: "Testing",
    subtitle: "Lightning Release · 雷遁",
    skills: ["Jest", "React Testing Library"],
  },
  {
    title: "SEO & GEO",
    subtitle: "Yin Release · 陰遁",
    skills: ["Technical SEO", "Schema Markup", "Website Optimization", "GEO"],
  },
  {
    title: "Development Tools",
    subtitle: "Yang Release · 陽遁",
    skills: ["Git", "GitHub", "NPM", "Yarn", "Turborepo", "Webpack"],
  },
  {
    title: "AI Development Tools",
    subtitle: "Six Paths · 六道",
    skills: ["Claude", "Augment", "Codex"],
  },
];

export const careerRecord = {
  company: "Svavvashaa Technologies Pvt. Ltd.",
  location: "Bengaluru, India",
  overallPeriod: "May 2023 — Present",
  overallDuration: "3+ years",
  designation: "Software Engineer",
  rank: "S",
  technologies: [
    "React.js", "Next.js", "TypeScript",
    "C#", "ASP.NET Web API", "PostgreSQL",
  ],
  assignments: [
    {
      number: "01",
      title: "Software Engineer",
      team: "Creators Infotek",
      period: "May 2023 — May 2026",
      duration: "3 years",
      rank: "CHUNIN",
      current: false,
      records: [
        "Developed and maintained web applications using React.js, Next.js and TypeScript across multiple company projects",
        "Delivered frontend features for KYC onboarding, RFQ and carrier bidding, participant testing workflows and patient appointment booking",
        "Built application features involving product management, billing, POS operations, GST and reporting",
        "Developed and integrated REST APIs using ASP.NET Web API and worked with PostgreSQL for database operations",
        "Handled new feature development, bug fixes and ongoing improvements across different applications",
      ],
    },
    {
      number: "02",
      title: "Software Engineer",
      team: "Svavvashaa Technologies",
      period: "May 2026 — Present",
      duration: "Current",
      rank: "JONIN",
      current: true,
      records: [
        "Internally transferred and designated as Software Engineer within the same organisation",
        "Continued full-stack development across React.js, Next.js and TypeScript applications",
        "Developed and maintained the company website using WordPress and Elementor with a custom widget plugin",
        "Set up technical SEO infrastructure including 8 JSON-LD schema types, XML sitemap and GA4 / Search Console integration",
        "Established and follow a weekly website optimisation schedule with bi-weekly GEO content reviews",
      ],
    },
  ],
};

// Keep experiences export for any existing imports
export const experiences = [];

export const projects = [
  {
    mission: "MISSION 01",
    missionNumber: "01",
    rank: "S",
    title: "ThreadPOS",
    company: null,
    summary: "POS & Business Management Application",
    description:
      "Full-stack POS and business management app. Engineered features across 8 modules including POS operations, product management, billing, GST workflows and database operations.",
    role: "Full Stack Development",
    keyFeatures: [
      "Engineered full-stack features across 8 modules, including POS operations, product management and billing, with API integration, bug fixes and database operations",
      "Implemented product QR code generation and printing through the billing machine; scanning a product's QR code adds it to the billing list",
      "Delivered GST functionality, including GST product setup, GST collection workflows and GSTR-2B and GSTR-3B summary reports",
    ],
    technologies: ["React.js", "C#", "ASP.NET Web API", "PostgreSQL"],
    status: "LIVE",
    statusLabel: "Completed",
    image: "/Threpos_image.png",
    color: "#FF6B00",
    links: {},
    placeholder: false,
  },
  {
    mission: "MISSION 02",
    missionNumber: "02",
    rank: "S",
    title: "TriTrackz",
    company: null,
    summary: "Logistics Aggregation Platform",
    description:
      "Full-stack logistics aggregation platform with role-based portals, KYC onboarding, RFQ workflows, carrier bidding, and driver app UI.",
    role: "Full Stack Development",
    keyFeatures: [
      "Developed 7 modules, including role-based dynamic KYC and onboarding for transport companies, brokers and carriers; currently building the subscription module",
      "Created RFQ workflows (forward, backward, share, direct, preferred network and common RFQ creation) and carrier bidding",
      "Designed the driver app UI and developed trip assignment and the full proof of pickup (POP) and proof of delivery (POD) flow, from order creation to delivery",
    ],
    technologies: ["React.js", "C#", "ASP.NET Web API", "PostgreSQL"],
    status: "LIVE",
    statusLabel: "Completed",
    image: "/tritrackz-logistics-platform.png",
    color: "#FF6B00",
    links: {},
    placeholder: false,
  },
  {
    mission: "MISSION 03",
    missionNumber: "03",
    rank: "A",
    title: "Hasteri",
    company: null,
    summary: "Proficiency Testing Platform",
    description:
      "Frontend and backend development for a proficiency testing platform with separate Admin and participant portals, role-based access, and a 10-stage PT workflow.",
    role: "Frontend & Backend Development",
    keyFeatures: [
      "Built the Auth and main layouts for the Admin and participant portals, and admin-driven participant onboarding (participants cannot self-register)",
      "Developed UMS with role-based menu and button-level restrictions, along with master modules",
      "Delivered the PT application flow from the participant portal and a 10-stage process (instruction submission, test values, dispatch, invoice, tax invoice, certification), each stage opening after admin completion",
      "Currently maintaining the application end to end, including participant workflow reports and Regenerate for reports, invoices and certificates",
    ],
    technologies: ["React.js", "TypeScript", ".NET", "PostgreSQL"],
    status: "LIVE",
    statusLabel: "Live",
    image: "/proficiency-testing-app.png",
    color: "#00FF88",
    links: {},
    placeholder: false,
  },
  {
    mission: "MISSION 04",
    missionNumber: "04",
    rank: "A",
    title: "Tabib",
    company: null,
    summary: "Healthcare Appointment & Consultation Platform",
    description:
      "React frontend development for a healthcare platform with patient onboarding, admin master screens, appointment booking, and 100ms video consultation integration.",
    role: "Frontend Development",
    keyFeatures: [
      "Converted UI designs into React screens for the Auth and main layouts, patient onboarding and patient creation from the admin portal",
      "Implemented around 8 admin master screens, including specialization, specification, degree and medicine",
      "Built the appointment module for admin and patient, with normal scheduled and instant booking screens",
      "Integrated 100ms video consultation, including call screen layouts and prescription screens",
    ],
    technologies: ["React.js", "100ms"],
    status: "LIVE",
    statusLabel: "Live",
    image: "/healthcare-management-platform.png",
    color: "#00FF88",
    links: {},
    placeholder: false,
  },
  {
    mission: "MISSION 05",
    missionNumber: "05",
    rank: "A",
    title: "Svvatech Company Website",
    company: "Svavvashaa Technologies",
    summary: "B2B WordPress Website & Technical SEO",
    description:
      "Built a 29-page B2B WordPress website from scratch and set up full technical SEO, structured data, GA4 integration, and ongoing GEO optimization.",
    role: "Website Development & Optimization",
    keyFeatures: [
      "Created a 29-page B2B WordPress website from scratch using Elementor and a custom widget plugin",
      "Set up 8 JSON-LD schema types, a 44-page XML sitemap and GA4 / Search Console integration",
      "Optimized hero video for LCP and maintained ongoing content optimization and GEO practices",
    ],
    technologies: ["WordPress", "Elementor", "Technical SEO", "JSON-LD", "GEO", "GA4"],
    status: "LIVE",
    statusLabel: "Live",
    image: "/svvatech-seo-cover.png",
    color: "#FF6B00",
    links: {},
    placeholder: false,
  },
  {
    mission: "MISSION 06",
    missionNumber: "06",
    rank: "B",
    title: "Closing Pro",
    company: "Closing Pro",
    summary: "Real Estate Contract Management Platform",
    description:
      "A real estate contract management platform where property owners, brokers, and agents onboard and collaborate on contracts end-to-end — from creation and draft filling to review, internal discussion, and final closure.",
    role: "Frontend Development",
    keyFeatures: [
      "Onboarding flows for property owners, brokers, and agents with role-based access to contracts",
      "Contract creation workflow where owners initiate contracts and define property and deal details",
      "Contract sharing to brokers who can fill in draft details and submit for review",
      "Activity tracking on every contract — full history of edits, status changes, and milestones",
      "Internal contract-level comments (chat-style) for owners, brokers, and agents to discuss without leaving the contract",
      "Contract finalisation and closure flow — once all parties approve, the contract is marked closed with a final record",
    ],
    technologies: ["React.js", "Zustand", "Formik", "SignalR", "REST API"],
    status: "LIVE",
    statusLabel: "Completed",
    image: "/realestate-contract-system.png",
    color: "#FF6B00",
    links: {},
    placeholder: false,
  },
  {
    mission: "MISSION 07",
    missionNumber: "07",
    rank: "B",
    title: "Forsa",
    company: "Forsa",
    summary: "Workforce Development & People Management Platform",
    description:
      "A multi-portal workforce development platform where Associates are onboarded, assigned training programs, allocated assets or business opportunities, and tracked as employees. Includes separate portals for employees and training centers. My first project — I owned the dashboard, Associate management, reports, and core workflows.",
    role: "Frontend Development",
    keyFeatures: [
      "Built the main dashboard with key workforce metrics and activity overview",
      "Developed Associate creation and edit flows — onboarding individuals with their profile, training assignments, and role details",
      "Implemented asset and business opportunity allocation to Associates",
      "Built the employee portal and training center portal UI",
      "Developed reports module for tracking Associate progress and assignments",
      "Handled basic workflow screens — my first production project, covering core CRUD and navigation patterns",
    ],
    technologies: ["React.js", "REST API", "Bootstrap", "JavaScript"],
    status: "LIVE",
    statusLabel: "Completed",
    image: "/forsa_img.png",
    color: "#00FF88",
    links: {},
    placeholder: false,
  },
];

export const education = {
  degree: "Bachelor of Computer Applications (BCA)",
  institution: "Jamal Mohamed College",
  period: "2019 – 2022",
  location: "Tiruchirappalli, India",
  description: "Strong foundation in Computer Science, DBMS, OS, Networks, and Web Development.",
};

export const certificates = [
  {
    title: "Full Stack .NET",
    issuer: "FFUTUREWISE, Trichy",
    period: "Jul – Dec 2022",
    description:
      "Hands-on experience with C#, ASP.NET Web API, Entity Framework, SQL Server, and REST APIs. Built responsive applications with HTML, CSS, JavaScript, and Bootstrap.",
  },
  {
    title: "Claude 101 – Introduction to AI",
    issuer: "Anthropic",
    period: null,
    description:
      "Learned prompt engineering, AI-assisted development, and LLM workflows. Applied AI tools (Claude, Codex, Augment) to improve development productivity and code quality.",
  },
];

export const quotes = [
  {
    japanese: "守りたいものがある時、人は本当に強くなれる。",
    english: "A man becomes stronger when he has something he wants to protect.",
    character: "Jiraiya",
    characterRole: "Legendary Sannin · 伝説の三忍",
  },
  {
    japanese: "俺は逃げない。言ったことは絶対に守る。それが俺の忍道だ！",
    english: "I'm not gonna run away, I never go back on my word. That's my nindō!",
    character: "Naruto Uzumaki",
    characterRole: "Seventh Hokage · 七代目火影",
  },
  {
    japanese: "人は、自分が正しいと認めたものに縛られて生きている。",
    english: "People live their lives bound by what they accept as correct and true.",
    character: "Itachi Uchiha",
    characterRole: "Sharingan Master · 写輪眼",
  },
  {
    japanese: "愛が深ければ深いほど、失った時の痛みも大きい。",
    english: "The deeper the love, the greater the pain of losing it.",
    character: "Obito Uchiha",
    characterRole: "Masked Warrior · 仮面の戦士",
  },
  {
    japanese: "本当の痛みを知らない者に、本当の平和は理解できない。",
    english: "Those who do not understand true pain can never understand true peace.",
    character: "Pain (Nagato)",
    characterRole: "Leader of Akatsuki · 暁のリーダー",
  },
  {
    japanese: "自分を信じない者にとって、努力は無意味だ。",
    english: "Hard work is worthless for those that don't believe in themselves.",
    character: "Rock Lee",
    characterRole: "Taijutsu Specialist · 体術の達人",
  },
  {
    japanese: "現実を見ろ！この呪われた世界では、何も計画通りにはいかない。",
    english: "Wake up to reality! Nothing ever goes as planned in this accursed world.",
    character: "Madara Uchiha",
    characterRole: "Legendary Uchiha · 伝説のうちは",
  },
  {
    japanese: "仲間を見捨てる者は、クズ以下だ。",
    english: "Those who abandon their friends are worse than scum.",
    character: "Kakashi Hatake",
    characterRole: "Copy Ninja · コピー忍者",
  },
];

export const contactInfo = {
  email: "saiprawin0466@gmail.com",
  phone: "7550121102",
  location: "Bengaluru, India",
  linkedin: "https://linkedin.com/in/praveen-r-20536324b/",
  github: "https://github.com/Prawinpinto",
};
