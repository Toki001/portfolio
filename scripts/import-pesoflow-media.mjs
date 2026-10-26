// Actual Flutter renders from an isolated source copy; no interface reconstruction.
import sharp from "sharp";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
const directory =
  process.argv[2] ?? ".local/pesoflow-capture-20261027/mobile/test/goldens";
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const entries = [];
await mkdir("public/projects", { recursive: true });
for (const [view, theme] of [
  ["home", "light"],
  ["budgets", "light"],
  ["analytics", "dark"],
]) {
  const source = join(directory, `portfolio_${view}_${theme}.png`);
  const bytes = await readFile(source);
  const meta = await sharp(bytes).metadata();
  if (meta.width !== 780 || meta.height !== 1688)
    throw new Error(`Unexpected phone viewport: ${source}`);
  const outputs = [];
  for (const width of [195, 390, 780]) {
    const file = `public/projects/peso-flow-${view}${width === 780 ? "" : `-${width}`}.webp`;
    await sharp(bytes).resize({ width }).webp({ quality: 92 }).toFile(file);
    const output = await readFile(file);
    outputs.push({
      file,
      width,
      height: (width * 1688) / 780,
      bytes: (await stat(file)).size,
      sha256: hash(output),
    });
  }
  entries.push({ view, theme, source, sourceSHA256: hash(bytes), outputs });
}
await writeFile(
  "docs/verification/pesoflow-media-evidence.json",
  JSON.stringify(
    {
      date: "2026-10-27",
      repository: "https://github.com/Toki001/pesoflow",
      revision: "db29c0aa0f19a8a9dc619d810dd3ccc5fab15c5b",
      state:
        "Actual unchanged app UI, stitchV7Fixture synthetic financial data, fake repository/platform adapters and fixed test clock. No owner's financial records.",
      capture:
        "Existing production_app_test.dart in an isolated local copy; only viewport set to 390x844 and RepaintBoundary.toImage(pixelRatio: 2) used for PNG export. Inter/MaterialIcons loaded by the original test config. Flutter 3.47.5, no dependency installation.",
      command:
        "flutter test --no-pub test/production_app_test.dart --name '^(home light|budgets light|analytics dark) production golden$'",
      entries,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `Imported ${entries.length} verified current PesoFlow screens at 2x, each with 390/195px derivatives.`,
);
