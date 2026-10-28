import { projects } from "../content/projects";
import seo from "./seo.json";
import profileImg from "../assets/profile-480.webp";
import profile800 from "../assets/profile-800.webp";
import profile1200 from "../assets/profile-1200.webp";
import profile1600 from "../assets/profile-1600.webp";
// Keep the normal-density first-screen portrait in the document on cold CDN visits.
// These are the reviewed AVIF bytes; larger Retina variants remain available.
import portrait800 from "../assets/profile-800.avif?inline";
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
    profileAvifSrcSet: `${portrait800} 800w, ${portrait1200} 1200w, ${portrait1600} 1600w`,
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
        "Flutter applications with Riverpod state, typed local storage and receipt capture. PesoFlow keeps financial records in an encrypted local workspace backed by Drift and SQLite.",
      tags: ["Flutter", "Dart", "Riverpod", "Drift", "SQLite"],
    },
    {
      index: "02",
      proofProject: "pixeltools",
      title: "Modern Web Development",
      description:
        "React interfaces with TypeScript and Tailwind, from PixelTools’ browser-based image tools to Next.js dashboards. Vite powers smaller applications and interactive frontends.",
      tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite"],
    },
    {
      index: "03",
      proofProject: "resolvehub",
      title: "APIs & Application Services",
      description:
        "Python and TypeScript services using FastAPI and NestJS. ResolveHub and ReconcileIQ connect REST and GraphQL interfaces to authentication, document workflows and background jobs.",
      tags: ["Python", "FastAPI", "Node.js", "NestJS", "GraphQL"],
    },
    {
      index: "04",
      proofProject: "guest-reco",
      title: "Computer Vision & Machine Learning",
      description:
        "Image classification experiments in PyTorch and TensorFlow, with OpenCV preprocessing and classification reports. GuestReco applies face embeddings and ONNX inference to visitor recognition.",
      tags: ["PyTorch", "TensorFlow", "OpenCV", "ONNX Runtime", "scikit-learn"],
    },
    {
      index: "05",
      proofProject: "reconcileiq",
      title: "Databases & Persistence",
      description:
        "Relational data and migrations with PostgreSQL, Drizzle and SQLAlchemy. GuestReco uses MySQL for visitor records; ResolveHub uses Redis with BullMQ for queued work.",
      tags: ["PostgreSQL", "MySQL", "Drizzle ORM", "SQLAlchemy", "Redis"],
    },
    {
      index: "06",
      proofProject: "reimagined",
      title: "Testing & Delivery",
      description:
        "Browser checks with Playwright, TypeScript unit tests with Vitest and Python tests with pytest. Docker Compose defines local services, with GitHub Actions running repository checks.",
      tags: [
        "Git",
        "GitHub Actions",
        "Docker",
        "Playwright",
        "Vitest",
        "pytest",
      ],
    },
  ],
  tools: [
    {
      id: "editor",
      name: "Flutter & Dart",
      description:
        "Mobile interfaces, Riverpod state and local financial records in PesoFlow.",
      categoryLabel: "MOBILE",
    },
    {
      id: "vcs",
      name: "GitHub & Git",
      description:
        "Versioned project source and GitHub Actions workflows for build and test checks.",
      categoryLabel: "REPOSITORY",
    },
    {
      id: "quality",
      name: "Playwright & Vitest",
      description:
        "Browser interaction coverage and TypeScript unit tests in PixelTools and Reimagined.",
      categoryLabel: "TESTING",
    },
    {
      id: "db",
      name: "PostgreSQL & Drizzle",
      description:
        "Typed relational schemas, queries and migrations in ResolveHub and Reimagined.",
      categoryLabel: "DATA",
    },
    {
      id: "ai",
      name: "Jupyter & PyTorch",
      description:
        "Rice-leaf classification notebooks with image augmentation, model training and evaluation.",
      categoryLabel: "RESEARCH",
    },
    {
      id: "api",
      name: "FastAPI & NestJS",
      description:
        "Python and TypeScript API services for GuestReco, ReconcileIQ and ResolveHub.",
      categoryLabel: "SERVICES",
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
