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
];
await mkdir("public/projects", { recursive: true });
const records = [];
for (const item of sources) {
  const input = await readFile(item.source);
  const base = `/projects/${item.project}-${item.view}`;
  const output = await sharp(input)
    .resize({ width: 1440, withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 })
    .toBuffer({ resolveWithObject: true });
  await writeFile("public" + base + ".webp", output.data);
  const small = await sharp(input)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 86, effort: 6 })
    .toBuffer({ resolveWithObject: true });
  await writeFile("public" + base + "-800.webp", small.data);
  records.push({
    ...item,
    sourceMtime: (await stat(item.source)).mtime.toISOString(),
    sourceSha256: createHash("sha256").update(input).digest("hex"),
    src: base + ".webp",
    width: output.info.width,
    height: output.info.height,
    bytes: output.data.length,
    srcSet: `${base}-800.webp ${small.info.width}w, ${base}.webp ${output.info.width}w`,
    sha256: createHash("sha256").update(output.data).digest("hex"),
  });
}
await writeFile(
  "docs/verification/project-media-evidence.json",
  JSON.stringify(records, null, 2) + "\n",
);
console.log(
  records.map((r) => ({
    src: r.src,
    width: r.width,
    height: r.height,
    bytes: r.bytes,
  })),
);
