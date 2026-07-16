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
    title: "Ninjutsu",
    subtitle: "Frontend Arts",
    emoji: "\uD83E\uDD4B",
    color: "#FF6B00",
    skills: [
      "React.js",
      "Next.js (SSR/SSG)",
      "TypeScript",
      "JavaScript (ES6+)",
      "Redux",
      "Zustand",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "Material UI",
      "jQuery",
    ],
  },
  {
    title: "Genjutsu",
    subtitle: "Mobile & UI",
    emoji: "\uD83D\uDC41\uFE0F",
    color: "#00FF88",
    skills: ["React Native", "Responsive Design", "Formik", "Validation"],
  },
  {
    title: "Taijutsu",
    subtitle: "Tools & Workflow",
    emoji: "\uD83D\uDCA5",
    color: "#FF6B00",
    skills: [
      "Git / GitHub",
      "NPM",
      "Yarn",
      "Agile",
      "Figma (Basic)",
      "Claude",
      "Augment",
      "Codex",
    ],
  },
  {
    title: "Forbidden Jutsu",
    subtitle: "Backend & Other",
    emoji: "\uD83C\uDF00",
    color: "#CC0000",
    skills: [
      "WordPress (Plugin & Theme Dev)",
      "SQL",
      "MySQL",
      "PostgreSQL",
      "SignalR (Real-time)",
      "ASP.NET (Basics)",
      "REST API Integration",
    ],
  },
];

export const experiences = [
  {
    title: "Software Engineer",
    company: "Svavvashaa Technologies Pvt Ltd",
    location: "Bengaluru, India",
    period: "May 2026 \u2014 Present",
    duration: "Ongoing",
    arcNumber: 2,
    arcTitle: "ARC 02 \u2014 THE SVAVVASHAA SAGA",
    description: [
      "Building and maintaining React.js applications with TypeScript, focusing on scalable component architecture and type-safe state management",
      "Using Claude AI as an embedded pair-programmer to accelerate feature development, refactors, and code reviews across the codebase",
      "Driving technical SEO alongside core development \u2014 structured data (JSON-LD), sitemap health, and Search Console diagnostics for a 29-page B2B SaaS platform",
      "Collaborating cross-functionally to translate product requirements into performant, accessible UI built with Tailwind CSS",
      "Debugging and optimizing existing modules for performance, maintainability, and cross-browser consistency",
      "Continuing to expand ownership across frontend engineering as the team scales its product footprint",
    ],
    technologies: [
      "React.js",
      "TypeScript",
      "Claude AI",
      "Tailwind CSS",
      "Technical SEO",
      "REST APIs",
    ],
  },
  {
    title: "Software Engineer",
    company: "Creators Infotek",
    location: "Bengaluru, India",
    period: "2023 \u2014 2026",
    duration: "3+ years",
    arcNumber: 1,
    arcTitle: "ARC 01 \u2014 THE CREATORS INFOTEK SAGA",
    description: [
      "Architected and developed real-time freight & logistics tracking platforms using React.js and SignalR for live data streaming",
      "Built scalable, component-driven UI systems with Redux and Zustand for complex state management across multi-module applications",
      "Implemented CI/CD pipelines using Azure DevOps, reducing deployment cycles by 40% with automated build and release workflows",
      "Collaborated in Agile sprints, conducting code reviews, pair programming, and mentoring junior developers on React best practices",
      "Integrated RESTful APIs with optimized data fetching patterns, error boundaries, and loading states for seamless UX",
      "Championed responsive design and accessibility standards, ensuring WCAG compliance across all user-facing applications",
    ],
    technologies: [
      "React.js",
      "Redux",
      "Zustand",
      "SignalR",
      "TypeScript",
      "Azure DevOps",
      "REST APIs",
      "Tailwind CSS",
    ],
  },
];

export const projects = [
  {
    mission: "MISSION 01",
    title: "ThreadPOS — GST-Compliant POS & Inventory Platform",
    description:
      "Multi-tenant SaaS for Indian clothing retailers combining POS billing, inventory, and GST compliance across Pro (GST-registered) and Lite (non-GST) tiers. Built as a modular monolith across 13 bounded contexts with PostgreSQL row-level security for tenant isolation, an outbox-driven event pipeline for cross-module consistency, and offline-first billing with WhatsApp-integrated receipts. AI-assisted dev (Claude) accelerated schema migrations, GST calculation audits, and cross-module bug fixes.",
    technologies: ["React", "TypeScript", ".NET 10", "PostgreSQL", "MediatR / CQRS", "Tailwind CSS"],
    status: "IN PROGRESS",
    image: "/tritrackz-logistics-platform.png",
    color: "#FF6B00",
  },
  {
    mission: "MISSION 02",
    title: "TriTrackz — Logistics & Freight Management Platform",
    description:
      "Scaled multi-tenant B2B platform with role-based portals (Admin, Driver, User) for RFQ, order management, and shipment tracking. Built React frontend workflows with full API integration, real-time updates, and role-based access control. AI-assisted dev (Claude, Augment) boosted efficiency by 20%.",
    technologies: ["React", "TypeScript", "Redux Toolkit", ".NET 8", "PostgreSQL"],
    status: "COMPLETED",
    image: "/tritrackz-logistics-platform.png",
    color: "#FF6B00",
  },
  {
    mission: "MISSION 03",
    title: "Proficiency Testing App",
    description:
      "ISO-certified lab management app with graphical analytics, automated reporting. AI-assisted dev accelerated build by 40%.",
    technologies: ["React.js", "REST API", "Claude AI", "Augment"],
    status: "COMPLETED",
    image: "/proficiency-testing-app.png",
    color: "#FF6B00",
  },
  {
    mission: "MISSION 04",
    title: "Healthcare Management Platform",
    description:
      "Multi-portal app (Admin, Doctor, Patient) with scheduling, EMR, video consultations, and e-prescriptions.",
    technologies: ["React.js", "Redux", "REST API", "SignalR"],
    status: "COMPLETED",
    image: "/healthcare-management-platform.png",
    color: "#FF6B00",
  },
  {
    mission: "MISSION 05",
    title: "Real Estate Online Contract System",
    description:
      "Built real-time contract platform with live chat, online signatures, and audit trail. Cut turnaround time by 35%.",
    technologies: ["React.js", "Zustand", "Formik", "SignalR"],
    status: "COMPLETED",
    image: "/realestate-contract-system.png",
    color: "#FF6B00",
  },
  {
    mission: "MISSION 06",
    title: "Svvatech — B2B SaaS SEO & Technical Optimization",
    description:
      "End-to-end technical SEO foundation for a 29-page B2B SaaS site (manufacturing, logistics, IIoT). Configured 8 JSON-LD schema types validated via Google Rich Results, submitted 44-page sitemap to GSC, resolved migration issues, and optimized robots.txt, meta titles, and alt text across 30+ pages.",
    technologies: ["JSON-LD Schema", "Google Search Console", "Technical SEO", "robots.txt"],
    status: "COMPLETED",
    image: "/svvatech-seo-cover.png",
    color: "#FF6B00",
  },
];

export const education = {
  degree: "BCA",
  institution: "Jamal Mohamed College",
  period: "2019 – 2022",
  location: "Trichy, India",
  description: "Strong foundation in Computer Science, DBMS, OS, Networks, and Web Development.",
};

export const certificates = [
  {
    title: "Full Stack Development in .NET",
    issuer: "FFUTUREWISE, TRICHY",
    description:
      "Hands-on experience with C#, ASP.NET MVC, Entity Framework, SQL Server, and REST APIs. Built responsive applications with HTML, CSS, JavaScript, and Bootstrap.",
  },
  {
    title: "Claude 101 – Introduction to AI",
    issuer: "Anthropic",
    description:
      "Learned prompt engineering, AI-assisted development, and LLM workflows. Applied AI tools (Claude, Codex, Augment) to improve development productivity and code quality.",
  },
];

export const quotes = [
  {
    text: "Dattebayo! Believe it \u2014 and ship it.",
    author: "Developer Ninja",
  },
  {
    text: "The only way to escape your limits is to exceed them every single day.",
    author: "Naruto Inspired",
  },
  {
    text: "In the world of code, those who abandon best practices abandon their teammates.",
    author: "Naruto Adapted",
  },
];

export const contactInfo = {
  email: "saiprawin0466@gmail.com",
  phone: "7550121102",
  location: "Bengaluru, India",
  linkedin: "https://linkedin.com/in/praveen-r-20536324b/",
  github: "https://github.com/Prawinpinto",
};
