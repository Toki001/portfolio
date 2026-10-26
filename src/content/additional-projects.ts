import { projectMedia } from "./project-media";
import type { Project } from "./projects";

// Verified local implementations. Empty/unpublished remotes and demos stay absent.
export const additionalProjects: Project[] = [
  {
    id: "resolvehub",
    artwork: {
      variant: "support",
      title: "Review.\nThen reply.",
      detail: "Source evidence / human review / internal replies",
    },
    slug: "resolvehub",
    index: "05",
    title: "ResolveHub",
    category: "SYSTEMS / SUPPORT",
    kind: "Systems",
    statusLabel: "Development workspace",
    description:
      "A tenant-scoped support workspace connecting tickets, source evidence and human-reviewed drafts.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "BullMQ"],
    links: { source: "https://github.com/Toki001/resolvehub" },
    problem:
      "Support conversations need reliable source material and a clear boundary between a proposed response and an approved reply.",
    solution:
      "A Next.js workspace backed by NestJS contract APIs, scoped persistence and durable workers. Knowledge documents support cited drafts; a person reviews the evidence and wording before an internal reply is recorded.",
    architecture: [
      {
        title: "Authenticated workspace",
        description:
          "HttpOnly browser sessions and server-side API calls connect verified organization members to tickets, knowledge and reviews.",
      },
      {
        title: "Durable document pipeline",
        description:
          "MinIO storage, a BullMQ worker and PostgreSQL coordinate validated extraction, chunking, publication, retries and a dead-letter queue.",
      },
      {
        title: "Evidence and human review",
        description:
          "Drafts retain source references and review state. Approval and the internal ticket reply are recorded together; external customer delivery remains deferred.",
      },
    ],
    keyFeatures: [
      "Ticket context and conversation history",
      "Knowledge uploads and scoped search",
      "Cited drafts with explicit human review",
      "Durable background jobs and tenant boundaries",
    ],
    challenges:
      "Keep a draft distinct from a delivered response and keep tenant data isolated across API, retrieval and worker boundaries. The default drafting/embedding paths are synthetic; optional provider acceptance does not establish production AI quality.",
    results:
      "The source and documented synthetic workflow demonstrate ingestion, evidence review and internal replies. No production deployment, customer delivery, adoption or model-quality result is claimed.",
    spotlight: true,
    media: projectMedia.resolvehub,
  },
  {
    id: "reconcileiq",
    artwork: {
      variant: "finance",
      title: "Match.\nReview.\nTrace.",
      detail: "Invoices / matching / audit history",
    },
    slug: "reconcileiq",
    index: "06",
    title: "ReconcileIQ",
    category: "SYSTEMS / FINANCE",
    kind: "Systems",
    statusLabel: "Local development",
    description:
      "An auditable invoice and purchase-order reconciliation workspace with review, exceptions and durable processing.",
    tags: ["Next.js", "FastAPI", "Celery", "PostgreSQL"],
    links: {},
    problem:
      "Invoice totals, purchase-order matches and exceptions need traceable decisions. Extracted document fields must stay separate from authoritative financial records.",
    solution:
      "A typed finance dashboard connects to FastAPI and a durable Python worker. Deterministic matching, immutable reconciliation records and audit events support a human review flow. The application does not make payments.",
    architecture: [
      {
        title: "Contract-driven finance UI",
        description:
          "Next.js and TypeScript present invoice, purchase-order, reconciliation, exception and audit views using generated API contracts.",
      },
      {
        title: "Financial persistence",
        description:
          "PostgreSQL retains scoped records and audit history. A SQLite lite mode supports local development without exercising the full infrastructure.",
      },
      {
        title: "Durable processing",
        description:
          "Celery, RabbitMQ and MinIO support uploaded-document processing, attempts and recoverable work. Candidate extraction remains separate from review and reconciliation.",
      },
    ],
    keyFeatures: [
      "Invoice and purchase-order views",
      "Deterministic matching and exception review",
      "Audit history and record inspection",
      "Document processing with durable attempts",
    ],
    challenges:
      "Preserve exact money semantics and the boundary between extracted candidates, approved records and matching results. Retries and recovery must not silently duplicate financial effects. Live AI quality and production operations remain unverified here.",
    results:
      "The local implementation and retained synthetic workspace show real finance screens and documented verification. Public deployment, payment execution and production business outcomes are not claimed. The public remote currently has no useful released source, so no repository link is shown.",
    spotlight: true,
    media: projectMedia.reconcileiq,
  },
  {
    id: "reimagined",
    artwork: {
      variant: "studio",
      title: "Reference\ninto React.",
      detail: "Compare / refine / export",
    },
    slug: "reimagined",
    index: "07",
    title: "Reimagined",
    category: "TOOLS / VISUAL ENGINEERING",
    kind: "Tools",
    statusLabel: "Local development",
    description:
      "A visual reconstruction workspace for controlled React editing, real browser comparisons and independent source export.",
    tags: ["Next.js", "TypeScript", "Playwright", "PostgreSQL"],
    links: {},
    problem:
      "Turning an authorized visual reference into an editable interface needs a controlled representation, a useful comparison loop and source that can run independently.",
    solution:
      "A workspace imports authorized material into a controlled React tree, lets the owner refine it in a studio, runs isolated browser capture/diff jobs and exports a buildable React application. Original fictional fixtures provide safe examples.",
    architecture: [
      {
        title: "Controlled React tree",
        description:
          "An application-authored renderer displays validated interface structures. Uploaded JavaScript is not executed as part of the trusted preview.",
      },
      {
        title: "Isolated browser evidence",
        description:
          "Durable jobs run browser capture and comparison in an isolated runtime. Saved revisions connect the workbench to actual PNG, overlay and difference artifacts.",
      },
      {
        title: "Independent export",
        description:
          "A bounded export packages React source for a separate install and build. Private project imports, revisions and exports remain scoped to the owner.",
      },
    ],
    keyFeatures: [
      "Interactive reconstruction studio",
      "Side-by-side, split and overlay comparisons",
      "Saved revisions and real browser evidence",
      "Independent React source export",
    ],
    challenges:
      "Keep uploaded material separate from trusted rendering, preserve owner access boundaries and make exports work independently of the workspace. An isolated capture worker and application-authored renderer enforce those boundaries.",
    results:
      "The local source and recorded fixture workflows demonstrate editing, browser evidence and buildable exports. Screens show original fictional fixtures, not customer projects. Staging/production release and external provider consent remain separate gates; no public demo or useful remote source is claimed.",
    spotlight: true,
    media: projectMedia.reimagined,
  },
];
