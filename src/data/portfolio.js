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

export const experience = {
  title: "Software Engineer",
  company: "Creators Infotek",
  location: "Bengaluru, India",
  period: "2023 \u2014 Present",
  duration: "3+ years",
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
};

export const projects = [
  {
    mission: "MISSION 01",
    title: "MCP Server",
    description:
      "Building an MCP server to enable AI models to interact with external tools and APIs — core architecture with context management, structured responses, and scalable AI-driven workflows.",
    technologies: ["Node.js", "AI Integration", "REST APIs"],
    status: "IN PROGRESS",
    image: "/mission4.png",
    color: "#FF6B00",
  },
  {
    mission: "MISSION 02",
    title: "Real Estate Online Contract System",
    description:
      "Built real-time contract platform with live chat, online signatures, and audit trail. Cut turnaround time by 35%.",
    technologies: ["React.js", "Zustand", "Formik", "SignalR"],
    status: "COMPLETED",
    image: "/mission1.png",
    color: "#FF6B00",
  },
  {
    mission: "MISSION 03",
    title: "Healthcare Management Platform",
    description:
      "Multi-portal app (Admin, Doctor, Patient) with scheduling, EMR, video consultations, and e-prescriptions.",
    technologies: ["React.js", "Redux", "REST API", "SignalR"],
    status: "COMPLETED",
    image: "/mission2.png",
    color: "#FF6B00",
  },
  {
    mission: "MISSION 04",
    title: "Proficiency Testing App",
    description:
      "ISO-certified lab management app with graphical analytics, automated reporting. AI-assisted dev accelerated build by 40%.",
    technologies: ["React.js", "REST API", "Claude AI", "Augment"],
    status: "COMPLETED",
    image: "/mission3.png",
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
  github: "https://github.com/praveen-r",
};
