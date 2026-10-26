// Owned application captures only. Alternate widths never count as distinct screens.
import sharp from "sharp";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
const root = "/Users/jameskierdoliguez/projects";
const sources = [
  {
    project: "resolvehub",
    view: "conversation",
    source: `${root}/resolvehub/docs/verification/internal-support-desktop.png`,
    revision: "5e37e45",
    state:
      "Historical actual app workflow capture, synthetic-customer@example.test, internal-only reply; documented in internal-support-workflow.md",
  },
  {
    project: "reconcileiq",
    view: "overview",
    source: "/private/tmp/portfolio-phase3-captures/reconcileiq/overview.png",
    revision:
      "Local preview at port 3100; source HEAD 326d9ec with later uncommitted work; runtime not asserted equal to HEAD",
    state:
      "Actual running synthetic read-only finance workspace, captured 2026-10-26",
  },
  {
    project: "reimagined",
    view: "studio",
    source: `${root}/reimagined/docs/verification/screenshots/m08-analytics-studio-1440.png`,
    revision: "2f9ebec",
    state:
      "Actual app studio showing original fictional analytics fixture, no customer data; documented M08 verification",
  },

  {
    project: "resolvehub",
    view: "knowledge",
    source: "/private/tmp/portfolio-phase3-captures/resolvehub/knowledge.png",
    revision: "5e37e45 compiled app",
    state:
      "Actual unchanged UI with empty isolated API fixtures; backend and ingestion not exercised",
  },
  {
    project: "resolvehub",
    view: "review",
    source: "/private/tmp/portfolio-phase3-captures/resolvehub/review.png",
    revision: "5e37e45 compiled app",
    state:
      "Actual unchanged review queue with empty isolated API fixtures; no approvals or delivery performed",
  },
  ...["invoices", "reconciliation", "exceptions"].map((view) => ({
    project: "reconcileiq",
    view,
    source: `/private/tmp/portfolio-phase3-captures/reconcileiq/${view}.png`,
    revision:
      "Read-only running local synthetic preview; source HEAD 326d9ec with later owner work",
    state: "Actual synthetic finance app, no data edits or payments",
  })),
  {
    project: "reimagined",
    view: "comparisons",
    source: `${root}/reimagined/docs/verification/screenshots/m08-comparisons-1440.png`,
    revision: "2f9ebec",
    state:
      "Actual browser comparison job panel for original fictional fixture; clearly labeled upper-panel excerpt",
    crop: { left: 0, top: 0, width: 1344, height: 1200 },
  },
  {
    project: "reimagined",
    view: "export",
    source: `${root}/reimagined/docs/verification/screenshots/m08-export-dialog-1440.png`,
    revision: "2f9ebec",
    state:
      "Actual completed independent React export dialog, original fixture, no visible access token",
  },
  ...["showcase", "analytics"].map((view) => ({
    project: "pokechamp",
    view,
    source: `/private/tmp/portfolio-phase3-captures/pokechamp/${view}.png`,
    revision: "a700e0a existing production dist",
    state:
      view === "showcase"
        ? "Actual app with empty isolated community collection; no user content or submissions"
        : "Actual app with bundled championship snapshot; no live-results claim",
  })),
  ...["crop", "resize", "rotate"].map((view) => ({
    project: "pixeltools",
    view,
    source: `/private/tmp/portfolio-phase3-captures/pixeltools/${view}.png`,
    revision: "c29b91c existing static export",
    state:
      "Actual distinct tool route with original test-input PNG selected and processed in browser",
  })),
  ...["dashboard", "cameras", "employees"].map((view) => ({
    project: "guest-reco",
    view,
    source: `/private/tmp/portfolio-phase3-captures/guest-reco/${view}.png`,
    revision: "8db9928033347332dc022374c372b6d207ff6ecc",
    state:
      "Unchanged actual client with isolated empty data and synthetic preview identity; no real backend, camera, person or recognition result",
  })),
];
const labels = {
  resolvehub: {
    conversation: [
      "Ticket conversation",
      "Reviewed internal conversation with demo data.",
    ],
    knowledge: [
      "Knowledge base",
      "Knowledge upload/search view. Isolated empty API fixture.",
    ],
    review: ["Review queue", "Human review queue. Isolated empty API fixture."],
  },
  reconcileiq: {
    overview: [
      "Overview",
      "Payables overview. Synthetic, read-only demo records.",
    ],
    invoices: [
      "Invoices",
      "Invoice list with deterministic synthetic records.",
    ],
    reconciliation: [
      "Reconciliation",
      "Invoice and purchase-order comparisons. Synthetic data.",
    ],
    exceptions: [
      "Exceptions",
      "Quantity, duplicate and missing-PO exception views. Synthetic data.",
    ],
  },
  reimagined: {
    studio: [
      "Studio",
      "Reference and React workbench. Original fictional fixture.",
    ],
    comparisons: [
      "Browser evidence",
      "Actual comparison job and overlay controls. Upper-panel excerpt, original fixture.",
    ],
    export: [
      "React export",
      "Completed independent React ZIP export. Original fixture.",
    ],
  },
  pokechamp: {
    showcase: [
      "Team showcase",
      "Team showcase route. Empty isolated community collection; no public submission.",
    ],
    analytics: [
      "Meta analytics",
      "Championship usage snapshot bundled with the application.",
    ],
  },
  pixeltools: {
    crop: [
      "Crop image",
      "Actual crop tool with an original test image selected.",
    ],
    resize: [
      "Resize image",
      "Actual dimensions/resampling workflow with the same owned input.",
    ],
    rotate: [
      "Rotate image",
      "Actual rotation/flip tool with the owned input image.",
    ],
  },
  "guest-reco": {
    dashboard: [
      "Dashboard",
      "Actual client preview with isolated empty data. Recognition backend not connected.",
    ],
    cameras: [
      "Camera grid",
      "Actual camera-grid empty state. No cameras connected or captured.",
    ],
    employees: [
      "Employees",
      "Actual personnel view with an empty fixture collection. No personal records.",
    ],
  },
};
await mkdir("public/projects", { recursive: true });
const records = [];
const media = {};
for (const item of sources) {
  const input = await readFile(item.source);
  const base = `/projects/${item.project}-${item.view}`;
  const pipeline = () => {
    const result = sharp(input);
    return item.crop ? result.extract(item.crop) : result;
  };
  const output = await pipeline()
    .resize({ width: 1440, withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 })
    .toBuffer({ resolveWithObject: true });
  await writeFile("public" + base + ".webp", output.data);
  const small = await pipeline()
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 86, effort: 6 })
    .toBuffer({ resolveWithObject: true });
  await writeFile("public" + base + "-800.webp", small.data);
  await pipeline()
    .resize({ width: 320, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile("public" + base + "-320.webp");
  const [label, caption] = labels[item.project][item.view];
  const publicMedia = {
    src: base + ".webp",
    srcSet: `${base}-800.webp ${small.info.width}w, ${base}.webp ${output.info.width}w`,
    thumbnail: base + "-320.webp",
    width: output.info.width,
    height: output.info.height,
    label,
    alt: `${label} in ${item.project === "guest-reco" ? "GuestReco (SecureSight client)" : item.project}. ${caption}`,
    caption,
  };
  (media[item.project] ??= []).push(publicMedia);
  records.push({
    ...item,
    ...publicMedia,
    sourceMtime: (await stat(item.source)).mtime.toISOString(),
    sourceSha256: createHash("sha256").update(input).digest("hex"),
    bytes: output.data.length,
    sha256: createHash("sha256").update(output.data).digest("hex"),
  });
}
await writeFile(
  "docs/verification/project-media-evidence.json",
  JSON.stringify(records, null, 2) + "\n",
);
await writeFile(
  "src/content/project-media.ts",
  '// Generated from reviewed owned captures by scripts/import-project-media.mjs.\nimport type { ProjectMedia } from "./projects";\nexport const projectMedia: Record<string, ProjectMedia[]> = ' +
    JSON.stringify(media, null, 2) +
    ";\n",
);
console.log(
  records.map((r) => ({
    src: r.src,
    width: r.width,
    height: r.height,
    bytes: r.bytes,
  })),
);
