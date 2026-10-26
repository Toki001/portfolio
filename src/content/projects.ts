import { additionalProjects } from "./additional-projects";
import { projectMedia } from "./project-media";
import { validateProjects } from "./validation";

export type ProjectCategory =
  "Mobile" | "Web" | "AI / ML" | "Systems" | "Tools";
export interface ProjectMedia {
  thumbnail?: string;
  srcSet?: string;
  label?: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}
export interface Project {
  spotlight?: boolean;
  artwork?: {
    variant: "battle" | "tools" | "support" | "finance" | "studio";
    title: string;
    detail: string;
  };
  id: string;
  slug: string;
  index: string;
  title: string;
  category: string;
  kind: ProjectCategory;
  statusLabel: string;
  description: string;
  tags: string[];
  links: { source?: string; live?: string };
  featuredRank?: number;
  role?: string;
  problem: string;
  solution: string;
  architecture: { title: string; description: string }[];
  keyFeatures: string[];
  challenges: string;
  results: string;
  media: ProjectMedia[];
}

// Source-verified records. Dates, roles, releases and outcome metrics stay absent until verified.
export const projects: Project[] = [
  {
    id: "peso-flow",
    slug: "peso-flow",
    index: "01",
    title: "PesoFlow",
    category: "MOBILE / FINTECH",
    kind: "Mobile",
    statusLabel: "In development",
    description:
      "A local-first expense tracker with encrypted storage, budgets and on-device receipt review.",
    tags: ["Flutter", "Dart", "Drift ORM", "Riverpod"],
    links: {
      source: "https://github.com/Toki001/pesoflow",
    },
    featuredRank: 1,
    problem:
      "Everyday expense tracking should stay useful without a connection or an account. Recording a purchase also needs to stay separate from correcting a receipt scan.",
    solution:
      "A local-first Flutter app with accounts, expenses, income, transfers, budgets and recurring bills. Receipt OCR proposes fields for review; the user confirms the record before it is saved.",
    architecture: [
      {
        title: "Flutter interface",
        description:
          "GoRouter navigation and Riverpod state connect screens to local financial records.",
      },
      {
        title: "Local persistence",
        description:
          "Drift stores transactions on the device. Secure storage and AES-256-GCM protect retained financial data and receipt images.",
      },
      {
        title: "Receipt review",
        description:
          "Native camera/gallery adapters and on-device Latin ML Kit OCR extract fields; a review step precedes the expense, metadata and encrypted image commit.",
      },
    ],
    keyFeatures: [
      "Manual accounts and transaction history",
      "Budgets, recurring bills and balance analytics",
      "On-device receipt capture with review",
      "CSV transaction export",
    ],
    challenges:
      "Keep balances and persistence predictable across restarts, and keep receipt extraction correctable. The mobile app starts without the optional NestJS health service. It does not connect to banks or deliver OS notifications.",
    results:
      "The owned source documents the implemented local flows and retained-data behavior. An app-store release, user count and performance benchmark are not verified here.",
    media: [
      {
        src: "/projects/peso-flow-home.webp",
        alt: "PesoFlow home with account balances, cashflow and budget pacing",
        width: 390,
        height: 1447,
        caption: "Home screen. App test capture with fixture data.",
        label: "Home",
        thumbnail: "/projects/peso-flow-home-195.webp",
      },
      {
        src: "/projects/peso-flow-budgets.webp",
        alt: "PesoFlow budgets and category spending limits",
        width: 390,
        height: 1600,
        caption: "Budgets. App test capture with fixture data.",
        label: "Budgets",
        thumbnail: "/projects/peso-flow-budgets-195.webp",
      },
      {
        src: "/projects/peso-flow-analytics.webp",
        alt: "PesoFlow spending analytics and cashflow",
        width: 390,
        height: 1600,
        caption: "Analytics. App test capture with fixture data.",
        label: "Analytics",
      },
    ],
  },
  {
    id: "pokechamp",
    artwork: {
      variant: "battle",
      title: "Plan your\nnext team.",
      detail: "Team composition / coverage / meta snapshots",
    },
    slug: "pokechamp",
    index: "02",
    title: "PokeChamp",
    category: "WEBSITE / GAMING",
    kind: "Web",
    statusLabel: "Web application",
    description: "Pokemon team builder with meta analytics and team showcase.",
    tags: ["TypeScript", "Vite", "Tailwind"],
    links: {
      source: "https://github.com/Toki001/pokechamp",
      live: "https://pokechamp-tau.vercel.app/",
    },
    featuredRank: 2,
    problem:
      "Competitive team planning needs team composition, a way to share builds, and a readable view of championship usage data in one interface.",
    solution:
      "A React and TypeScript team builder with a community showcase and championship meta analytics, backed by Supabase for shared content.",
    architecture: [
      {
        title: "Typed React client",
        description:
          "Vite builds the team builder, showcase and analytics interface with TypeScript and Tailwind.",
      },
      {
        title: "Prepared data",
        description:
          "A build step deduplicates move definitions, creates a compact usage map and loads detailed analytics on selection. Statistics are snapshots rather than a live feed.",
      },
      {
        title: "Sharing and indexing",
        description:
          "Supabase handles shared content; the build prerenders the main routes and preserves stable, case-sensitive shared team IDs.",
      },
    ],
    keyFeatures: [
      "Competitive team composition",
      "Community team showcase",
      "Championship usage snapshots",
      "Shareable team URLs",
    ],
    challenges:
      "Keep the data useful without shipping every source dataset to every visitor. Preparation preserves move fields while separating the small builder index from on-demand analytics detail.",
    results:
      "The source includes build and SEO checks and static route generation. No adoption or competitive outcome is claimed.",
    media: [
      {
        src: "/projects/pokechamp.webp",
        alt: "Actual PokeChamp team builder with a sample roster and defensive coverage",
        width: 1440,
        height: 1100,
        caption:
          "Local team-building session with a sample roster. No team was submitted.",
        label: "Team builder",
        thumbnail: "/projects/pokechamp-800.webp",
      },
      ...projectMedia.pokechamp,
    ],
  },
  {
    id: "pixeltools",
    artwork: {
      variant: "tools",
      title: "Small edits.\nAll local.",
      detail: "Crop / resize / rotate",
    },
    slug: "pixeltools",
    index: "03",
    title: "PixelTools",
    category: "WEB / IMAGE EDITING",
    kind: "Web",
    statusLabel: "Web application",
    description:
      "Browser-based image utilities for cropping, rotating and resizing.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    links: {
      source: "https://github.com/Toki001/pixeltools",
      live: "https://pixeltool-toki.netlify.app",
    },
    featuredRank: 3,
    problem:
      "Small image tasks should be available in a browser with clear individual tools and readable previews.",
    solution:
      "A collection of browser-based image utilities, including crop, rotate and resize, implemented with Next.js and exported as a static site.",
    architecture: [
      {
        title: "Static Next.js site",
        description:
          "Individual tool pages build to a static export. The deployment serves clean, descriptive paths with retained legacy aliases.",
      },
      {
        title: "Browser image workflow",
        description:
          "Uploaded previews stay local. Image metadata parsing loads after selection rather than on the initial page.",
      },
      {
        title: "Discoverable tools",
        description:
          "Each tool has individual metadata, structured data and related-tool links. Self-hosted fonts and a subset icon font avoid external runtime font requests.",
      },
    ],
    keyFeatures: [
      "Image cropping, rotation and resizing",
      "Local image previews",
      "Dedicated URLs for individual tools",
      "Responsive browser interface",
    ],
    challenges:
      "Balance a growing utility inventory with a light initial payload and consistent navigation. Static export and deferred EXIF parsing keep server requirements and initial work small.",
    results:
      "The source documents static builds, unit checks and SEO validation commands. No third-party usage, privacy certification or processing benchmark is asserted.",
    media: [
      {
        src: "/projects/pixeltools.webp",
        alt: "PixelTools directory of browser-based image utilities",
        width: 960,
        height: 782,
        caption: "Actual tool directory retained from the original portfolio.",
        label: "Tool directory",
        thumbnail: "/projects/pixeltools-640.webp",
      },
      ...projectMedia.pixeltools,
    ],
  },
  {
    id: "guest-reco",
    slug: "guest-reco",
    index: "04",
    title: "GuestReco",
    category: "AI / FACIAL RECOGNITION",
    kind: "AI / ML",
    statusLabel: "Project note",
    description: "GuestReco is facial recognition for guests and employees.",
    tags: ["TypeScript", "FastAPI", "MediaMTX", "SQL"],
    links: {
      source: "https://github.com/Toki001/guest-reco",
    },
    problem: "Recognize guests and employees in a visitor workflow.",
    solution:
      "The public source contains a React client for camera, personnel, event and attendance views, with FastAPI and MediaMTX service code. The captured SecureSight interface is an isolated client preview with empty fixture data.",
    architecture: [],
    keyFeatures: [],
    challenges:
      "The client views can be inspected without collecting any person's image or attendance record. Live camera feeds, backend authorization and recognition quality were not exercised in the isolated preview.",
    results:
      "Retained as a project note with three actual empty client views. No connected camera, biometric result, deployment or production-use claim follows from these captures.",
    media: projectMedia["guest-reco"],
  },
  ...additionalProjects,
];

export const featuredProjects = projects
  .filter((p) => p.featuredRank)
  .sort((a, b) => a.featuredRank! - b.featuredRank!);
export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
validateProjects(projects);
