// Art-directed derivatives of owned screenshots; galleries retain the full captures.
import sharp from "sharp";
import { readFile, writeFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
const hash = async (path) =>
  createHash("sha256")
    .update(await readFile(path))
    .digest("hex");
const evidence = [];
for (const view of ["home", "budgets"]) {
  const source = `public/projects/peso-flow-${view}.webp`;
  const meta = await sharp(source).metadata();
  const crop = { left: 0, top: 0, width: meta.width, height: meta.height };
  const outputs = [];
  for (const width of [195, 390]) {
    const output = `public/projects/peso-flow-${view}-artwork${width === 195 ? "-195" : ""}.webp`;
    await sharp(source)
      .extract(crop)
      .resize({ width })
      .webp({ quality: 90 })
      .toFile(output);
    outputs.push({
      file: output,
      sha256: await hash(output),
      bytes: (await stat(output)).size,
      width,
      height: (width * meta.height) / meta.width,
    });
  }
  evidence.push({
    source,
    sourceSHA256: await hash(source),
    crop,
    use: "Resampled actual phone viewport for featured artwork; never counted as another screen. Case-study gallery keeps the full 2x render.",
    outputs,
  });
}
await writeFile(
  "docs/verification/project-artwork-evidence.json",
  JSON.stringify(evidence, null, 2) + "\n",
);
console.log(
  evidence.map(({ source, outputs }) => ({
    source,
    outputs: outputs.map(({ file, bytes }) => ({ file, bytes })),
  })),
);
