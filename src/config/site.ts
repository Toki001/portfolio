import profileImg from "../assets/profile.jpg";
import pesoflowImg from "../assets/pesoflow.svg";
import pixeltoolsImg from "../assets/pixeltools.png";

export const siteConfig = {
  seo: {
    title: "Jameskier Doliguez — Software Engineer",
    description: "I build practical digital products across web, desktop, mobile.",
    siteUrl: "https://portfolio-toki20.vercel.app",
    ogImage: "https://portfolio-toki20.vercel.app/og-image.jpg",
  },

  identity: {
    name: "Jameskier Doliguez",
    initials: "JD",
    shortRole: "[ Software Engineer ]",
    title: "Software Engineer",
    heroStatement: "I build practical digital products across mobile, web, and machine learning.",
    heroDescription: "Focused on crafting production-grade software with tight engineering standards. Dedicated to edge-computing, clean state architectures in Flutter, and building high-utility tools designed to solve real-world workflows.",
    profileImage: profileImg, // using imported asset
  },

  navigation: [
    { label: "Home", href: "#home", index: "01" },
    { label: "Projects", href: "#projects", index: "02" },
    { label: "Tech Stack", href: "#tech-stack", index: "03" },
    { label: "Tools", href: "#tools", index: "04" },
    { label: "About", href: "#about", index: "05" },
    { label: "Contact", href: "#contact", index: "06" },
  ],

  socials: {
    github: { label: "GitHub", url: "https://github.com/Toki001?tab=repositories", handle: "github.com/Toki001?tab=repositories" },
    linkedin: { label: "LinkedIn", url: "https://www.linkedin.com/in/jameskier-doliguez-6b8432413/", handle: "linkedin.com/in/jameskier" },
    facebook: { label: "Facebook", url: "https://www.facebook.com/jameskier.doliguez", handle: "facebook.com/jameskierdoliguez" },
    discord: { label: "Discord", url: "https://discord.com", handle: "_rtoki" },
  },

  location: {
    country: "Philippines",
    region: "Caraga, Agusan del Sur",
    remoteLabel: "Remote",
    coordinatesLabel: "15.48° N, 120.71° E",
  },

  currentFocus: {
    tags: ["Flutter", "Full-stack", "AI / ML"],
    architecture: "Offline-First & Edge AI",
    research: "Quantized Models (TFLite)",
  },

  currentlyBuilding: {
    projectId: "peso-flow",
    title: "PesoFlow",
    description: "Personal finance application with offline-first SQLite sync",
    href: "#projects",
  },

  disciplines: [
    {
      index: "01",
      category: "MOBILE",
      title: "Mobile Development",
      description: "Flutter-based mobile applications with an emphasis on useful everyday products, clean state handling, and offline-first persistence.",
      stackSummary: "Flutter • Dart • Drift",
      icon: "smartphone",
    },
    {
      index: "02",
      category: "WEB",
      title: "Web Development",
      description: "Modern responsive interfaces and full-stack web experiences designed with tight information density, performance, and accessibility.",
      stackSummary: "React • Tailwind • Supabase",
      icon: "desktop_windows",
    },
    {
      index: "03",
      category: "INTELLIGENCE",
      title: "AI / Machine Learning",
      description: "Image classification, TensorFlow models, lightweight CNN architectures, and edge deployment with mobile-optimized inference pipelines.",
      stackSummary: "TensorFlow • TFLite • OpenCV",
      icon: "psychology",
    },
  ],

  projects: [
    {
      id: "peso-flow",
      index: "01",
      title: "PesoFlow",
      category: "MOBILE / FINTECH",
      categoryLabel: "[ MOBILE / FINTECH ]",
      statusLabel: "STATUS: PROD READY",
      statusTone: "success",
      versionLabel: "v2.4.0",
      image: pesoflowImg,
      imageAlt: "PesoFlow financial application screenshot interface preview",
      description: "Offline-first mobile finance app optimized for swift expense logging, recurring budget analytics, and encrypted biometric vaults.",
      tags: ["Flutter", "Dart", "Drift ORM", "Riverpod"],
      footerLabel: "OFFLINE-FIRST",
      links: {
        source: "https://github.com/Toki001/pesoflow",
        demo: "#contact",
        live: "",
        docs: "",
      },
    },
    {
      id: "pokechamp",
      index: "02",
      title: "PokeChamp",
      category: "WEBSITE / GAMING",
      categoryLabel: "[ WEBSITE / GAMING ]",
      statusLabel: "TEAM BUILDER",
      statusTone: "neutral",
      versionLabel: "v1.0.0",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBzP7Oq7nnh2m3vYsxUDl-z_u6Dh10yOanOBFMDcUcRbNM0pdWn9_3uZEyL_UbqTvqpwTdxhipDdR7aOHAf4H39XCFKT-Kqv7ah9j3hBhfTtwHH8vejEXdZMHuHb0i1Mc4S7goz_Pbq2WnDIAdaIA9FrEKgqf7tpHyg8F7P0bdDDKeeY1FfKXGnleMCRWkuQXURB5FPcI5tSOFCEOyv-w8NaQFQIOYxeT09cY_8vR1",
      imageAlt: "Pokemon team builder preview",
      description: "Pokemon team builder with meta analytics and team showcase.",
      tags: ["TypeScript", "Vite", "Tailwind"],
      footerLabel: "SUPABASE",
      links: {
        source: "https://github.com/Toki001/pokechamp",
        demo: "",
        live: "https://pokechamp-tau.vercel.app/",
      },
    },
    {
      id: "pixeltools",
      index: "03",
      title: "PixelTools",
      category: "WEB / IMAGE EDITING",
      categoryLabel: "[ WEB / IMAGE EDITING ]",
      statusLabel: "REACT + TAILWIND",
      statusTone: "neutral",
      versionLabel: "",
      image: pixeltoolsImg,
      imageAlt: "PixelTools fullstack responsive web dashboard",
      description: "PixelTools is a web-based image editing tool that allows users to crop, rotate, and resize images.",
      tags: ["TypeScript", "React", "Tailwind", "React Crop"],
      footerLabel: "REACT",
      links: {
        source: "https://github.com/Toki001/pixeltools",
        live: "https://pixeltool-toki.netlify.app",
        demo: "",
        docs: "",
      },
    },
    {
      id: "guest-reco",
      index: "04",
      title: "GuestReco",
      category: "AI / FACIAL RECOGNITION",
      categoryLabel: "[ AI / FACIAL RECOGNITION ]",
      statusLabel: "STATUS: DEPLOYED",
      statusTone: "success",
      versionLabel: "AI",
      image: "",
      imageAlt: "GuestReco interface preview",
      description: "GuestReco is facial recognition for guests and employees.",
      tags: ["TypeScript", "FastAPI", "MediaMTX", "SQL"],
      footerLabel: "AI & MACHINE LEARNING",
      links: {
        source: "https://github.com/Toki001/guest-reco",
        docs: "#contact",
        demo: "",
        live: "",
      },
    },
  ],

  techDomains: [
    {
      index: "01",
      category: "MOBILE",
      icon: "smartphone",
      title: "Cross-Platform Mobile",
      description: "Multi-platform client engineering with fluid animations, local SQLite databases, reactive state loops, and hardware sensor integrations.",
      tags: ["Flutter", "Dart", "Riverpod", "Drift", "Hive"],
      footer: "Flutter • Dart • Riverpod • SQLite",
    },
    {
      index: "02",
      category: "FRONTEND",
      icon: "desktop_windows",
      title: "Modern Web Development",
      description: "Fast, accessible interfaces built on component composition, strict TypeScript typing, and atomic utility CSS design systems.",
      tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
      footer: "React • Next.js • TypeScript • Tailwind",
    },
    {
      index: "03",
      category: "BACKEND",
      icon: "database",
      title: "Backend & Cloud Services",
      description: "RESTful APIs, relational databases, serverless functions, authentication guards, and low-latency transactional storage.",
      tags: ["Node.js", "Supabase", "PostgreSQL", "Firebase", "REST APIs"],
      footer: "Node.js • Supabase • PostgreSQL • Firebase",
    },
    {
      index: "04",
      category: "INTELLIGENCE",
      icon: "psychology",
      title: "AI & Machine Learning",
      description: "Supervised model training, computer vision pipelines, quantization for edge inference, and integration with intelligent LLM APIs.",
      tags: ["TensorFlow", "TFLite", "Python", "OpenCV", "scikit-learn"],
      footer: "TensorFlow • TFLite • OpenCV • Python",
    },
    {
      index: "05",
      category: "TOOLCHAIN",
      icon: "terminal",
      title: "DevOps, Version Control & Quality",
      description: "Git branching hygiene, automated continuous deployment workflows, containerized environments, and contract API testing.",
      tags: ["Git", "GitHub Actions", "Docker", "Postman", "VS Code", "Linux CLI"],
      footer: "Git • Docker • GitHub Actions • Postman",
    },
    {
      index: "06",
      category: "ARCHITECTURE",
      icon: "architecture",
      title: "System Architecture & Optimization",
      description: "Clean architectural design patterns, state management boundaries, offline-first caching strategies, and runtime performance profiling.",
      tags: ["Clean Architecture", "Offline-First", "Performance Profiling", "Design Systems", "REST / GraphQL"],
      footer: "Clean Arch • Offline Sync • Profiling • State Design",
    },
  ],

  tools: [
    {
      id: "editor",
      icon: "terminal",
      name: "VS Code & Antigravity",
      description: "Primary code editing environment with Dart, Flutter & Tailwind language servers",
      categoryLabel: "AUTHORING",
      href: "",
    },
    {
      id: "vcs",
      icon: "code",
      name: "GitHub & Git CLI",
      description: "Distributed version control, continuous integration runners, and issue milestones",
      categoryLabel: "REPOSITORY",
      href: "",
    },
    {
      id: "design",
      icon: "draw",
      name: "Figma & Stitch",
      description: "Mobile app prototyping, design tokens, wireframing, and interactive components",
      categoryLabel: "DESIGN",
      href: "",
    },
    {
      id: "db",
      icon: "database",
      name: "Supabase & Firebase Console",
      description: "Cloud database orchestration, authentication rules, storage buckets, and realtime channels",
      categoryLabel: "CLOUD DB",
      href: "",
    },
    {
      id: "ai",
      icon: "psychology",
      name: "Codex, Claude & Gemini",
      description: "Architecture formulation, edge-case analysis, documentation writing, and prototype synthesis",
      categoryLabel: "SYNTHESIS",
      href: "",
    },
    {
      id: "api",
      icon: "api",
      name: "Postman",
      description: "REST endpoint assertions, header authorization testing, and schema validation",
      categoryLabel: "TESTING",
      href: "",
    },
  ],

  about: {
    sectionTitle: "EXPERIENCE & PHILOSOPHY",
    introHeading: "Hi, I'm Jameskier Doliguez.",
    paragraphs: [
      "I am a mobile, web, and machine learning developer with a focus on building functional, durable digital systems. My engineering discipline centers on clean code structures, predictable offline persistence, and pragmatic intelligence pipelines.",
      "Whether architecting cross-platform Flutter applications or training quantized vision models with TensorFlow Lite, I prioritize user speed, clean separation of concerns, and clean visual typography.",
      "I thrive on translating complex requirements into reliable codebases with intuitive feedback loops and zero bloated dependencies."
    ],
    chips: [
      { label: "SPECIALTY", value: "React19, Next.js & Flutter" },
      { label: "AI FOCUS", value: "Machine Learning & AI Development" },
      { label: "TIMEZONE", value: "GMT+8 (Philippines)" },
    ],
    education: {
      degree: "B.S. in Computer Science",
      school: "Father Saturnino Urios University, Butuan City",
    },
    focusAreas: ["Mobile Architecture", "Edge Inference", "SQL Optimization"],
    availability: "Available for remote full-time & contract projects",
    identityCodeLines: [
      { key: "architecture", value: "clean & modular" },
      { key: "stateManagement", value: "predictable" },
      { key: "userExperience", value: "fast & responsive" },
    ],
    roles: [
      {
        index: "01",
        title: "Full-Stack Web Developer",
        stack: "React, Next.js, Tailwind CSS, Supabase PostgreSQL",
      },
      {
        index: "02",
        title: "Mobile Application Developer",
        stack: "Offline-first Flutter, Drift DB, Native Dart APIs",
      },
      {
        index: "03",
        title: "AI & Edge Machine Learning",
        stack: "TFLite Vision Models, CNN Classifiers, Python Preprocessing",
      },
    ],
  },

  contact: {
    heading: "Let's Build Something Together",
    intro: "Have a mobile app in mind, a web platform to launch, or machine learning model to deploy? Let's discuss requirements and timelines.",
    responseTime: "< 24H",
    email: "jameskierdoliguez@gmail.com",
    directIntro: "I respond to project inquiries, freelance collaborations, and full-time discussions within 24 hours.",
    form: {
      mode: "mailto", // "mailto" | "endpoint"
      endpoint: "",
      subjectPrefix: "Project Inquiry from Portfolio",
    },
  },

  footer: {
    craftedWith: "Crafted with Geist & Plus Jakarta Sans",
    copyrightName: "Jameskier Doliguez",
    systemStatus: "ALL SYSTEMS NOMINAL",
  },
} as const;
