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
  const crop = { left: 0, top: 0, width: 390, height: 860 };
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
      height: (width * 860) / 390,
    });
  }
  evidence.push({
    source,
    sourceSHA256: await hash(source),
    crop,
    use: "Existing top-aligned cropped phone artwork only; never counted as another screen. Case-study gallery keeps the original full screenshot.",
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
