import { projects } from "../content/projects";
import seo from "./seo.json";
import profileImg from "../assets/profile-480.webp";
import profile800 from "../assets/profile-800.webp";
import profile1200 from "../assets/profile-1200.webp";
import profile1600 from "../assets/profile-1600.webp";
import portrait480 from "../assets/profile-480.avif";
import portrait800 from "../assets/profile-800.avif";
import portrait1200 from "../assets/profile-1200.avif";
import portrait1600 from "../assets/profile-1600.avif";

export const siteConfig = {
  // TODO: add only an owner-verified resume URL and current availability.
  resumeUrl: undefined as string | undefined,
  availability: undefined as string | undefined,
  seo: seo,
  identity: {
    wordmark: "toki",
    name: "Jameskier Doliguez",
    title: "Software Engineer",
    heroStatement:
      "I build practical digital products across mobile, web, and machine learning.",
    profileImage: profileImg,
    profileSrcSet: `${profileImg} 480w, ${profile800} 800w, ${profile1200} 1200w, ${profile1600} 1600w`,
    profileAvifSrcSet: `${portrait480} 480w, ${portrait800} 800w, ${portrait1200} 1200w, ${portrait1600} 1600w`,
  },
  navigation: [
    {
      label: "Home",
      href: "#home",
    },
    {
      label: "Projects",
      href: "#projects",
    },
    {
      label: "Tech stack",
      href: "#tech-stack",
    },
    {
      label: "Tools",
      href: "#tools",
    },
    {
      label: "About",
      href: "#about",
    },
    {
      label: "Contact",
      href: "#contact",
    },
  ],
  socials: {
    github: {
      label: "GitHub",
      url: "https://github.com/Toki001?tab=repositories",
      handle: "github.com/Toki001?tab=repositories",
    },
    linkedin: {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/jameskier-doliguez-6b8432413/",
      handle: "linkedin.com/in/jameskier",
    },
    facebook: {
      label: "Facebook",
      url: "https://www.facebook.com/jameskier.doliguez",
      handle: "facebook.com/jameskierdoliguez",
    },
    discord: {
      label: "Discord",
      url: "",
      handle: "_rtoki",
    },
  },
  location: {
    country: "Philippines",
    region: "Caraga, Agusan del Sur",
    timeZoneLabel: "GMT+8",
  },
  currentFocus: {
    tags: ["Flutter", "Full-stack", "AI / ML"],
    architecture: "Offline-First & Edge AI",
  },
  projects: projects,
  techDomains: [
    {
      index: "01",
      proofProject: "peso-flow",
      title: "Cross-Platform Mobile",
      description:
        "Multi-platform client engineering with fluid animations, local SQLite databases, reactive state loops, and hardware sensor integrations.",
      tags: ["Flutter", "Dart", "Riverpod", "Drift", "Hive"],
    },
    {
      index: "02",
      proofProject: "pixeltools",
      title: "Modern Web Development",
      description:
        "Fast, accessible interfaces built on component composition, strict TypeScript typing, and atomic utility CSS design systems.",
      tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
    },
    {
      index: "03",
      proofProject: "resolvehub",
      title: "Backend & Cloud Services",
      description:
        "RESTful APIs, relational databases, serverless functions, authentication guards, and low-latency transactional storage.",
      tags: ["Node.js", "Supabase", "PostgreSQL", "Firebase", "REST APIs"],
    },
    {
      index: "04",
      proofProject: "guest-reco",
      title: "AI & Machine Learning",
      description:
        "Supervised model training, computer vision pipelines, quantization for edge inference, and integration with intelligent LLM APIs.",
      tags: ["TensorFlow", "TFLite", "Python", "OpenCV", "scikit-learn"],
    },
    {
      index: "05",
      proofProject: "reimagined",
      title: "DevOps, Version Control & Quality",
      description:
        "Git branching hygiene, automated continuous deployment workflows, containerized environments, and contract API testing.",
      tags: [
        "Git",
        "GitHub Actions",
        "Docker",
        "Postman",
        "VS Code",
        "Linux CLI",
      ],
    },
    {
      index: "06",
      proofProject: "reconcileiq",
      title: "System Architecture & Optimization",
      description:
        "Clean architectural design patterns, state management boundaries, offline-first caching strategies, and runtime performance profiling.",
      tags: [
        "Clean Architecture",
        "Offline-First",
        "Performance Profiling",
        "Design Systems",
        "REST / GraphQL",
      ],
    },
  ],
  tools: [
    {
      id: "editor",
      name: "VS Code & Antigravity",
      description:
        "Primary code editing environment with Dart, Flutter & Tailwind language servers",
      categoryLabel: "AUTHORING",
    },
    {
      id: "vcs",
      name: "GitHub & Git CLI",
      description:
        "Distributed version control, continuous integration runners, and issue milestones",
      categoryLabel: "REPOSITORY",
    },
    {
      id: "design",
      name: "Figma & Stitch",
      description:
        "Mobile app prototyping, design tokens, wireframing, and interactive components",
      categoryLabel: "DESIGN",
    },
    {
      id: "db",
      name: "Supabase & Firebase Console",
      description:
        "Cloud database orchestration, authentication rules, storage buckets, and realtime channels",
      categoryLabel: "CLOUD DB",
    },
    {
      id: "ai",
      name: "Codex, Claude & Gemini",
      description:
        "Architecture formulation, edge-case analysis, documentation writing, and prototype synthesis",
      categoryLabel: "SYNTHESIS",
    },
    {
      id: "api",
      name: "Postman",
      description:
        "REST endpoint assertions, header authorization testing, and schema validation",
      categoryLabel: "TESTING",
    },
  ],
  about: {
    paragraphs: [
      "I’m Jameskier Doliguez, a software engineer in the Philippines. I build mobile and web applications, and work with machine learning where it helps solve a practical problem.",
      "My focus is on clear interfaces and systems that stay understandable: local persistence, predictable state, and clean separation of concerns.",
      "I enjoy turning complex requirements into useful products, from a Flutter application to a lightweight vision model running on a device.",
    ],
    education: {
      degree: "B.S. in Computer Science",
      school: "Father Saturnino Urios University, Butuan City",
    },
  },
  contact: {
    email: "jameskierdoliguez@gmail.com",
    subjectPrefix: "Project inquiry from the portfolio",
  },
  footer: {
    craftedWith: "Designed and built with React & TypeScript",
    copyrightYear: 2026,
  },
} as const;
