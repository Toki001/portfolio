// Normalize the owner's original orientation and emit sharp, metadata-free responsive crops.
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
const source = process.argv[2];
if (!source)
  throw new Error(
    "Pass the original portrait path; it is never needed by a normal build.",
  );
const bytes = await readFile(source),
  sourceSHA256 = createHash("sha256").update(bytes).digest("hex");
const original = await sharp(bytes).metadata();
const outputs = [];
for (const width of [480, 800, 1200, 1600]) {
  for (const format of ["avif", "webp"]) {
    const file = `src/assets/profile-${width}.${format}`;
    const image = sharp(bytes)
      .rotate()
      .resize({
        width,
        height: width * 1.2,
        fit: "cover",
        position: "north",
        withoutEnlargement: true,
      })
      .grayscale();
    const result = await (
      format === "avif"
        ? image.avif({ quality: 70, effort: 6 })
        : image.webp({ quality: 94, effort: 6 })
    ).toBuffer();
    await writeFile(file, result);
    outputs.push({
      file,
      width,
      height: width * 1.2,
      bytes: result.length,
      sha256: createHash("sha256").update(result).digest("hex"),
    });
  }
}
await writeFile(
  "docs/verification/portrait-evidence.json",
  JSON.stringify(
    {
      source,
      sourceSHA256,
      original: {
        width: original.width,
        height: original.height,
        orientation: original.orientation,
      },
      processing:
        "EXIF orientation normalized to 4000×6000; top-aligned 5:6 crop; grayscale; high-quality AVIF/WebP; no generated detail, sharpening or upscale; metadata stripped",
      outputs,
    },
    null,
    2,
  ) + "\n",
);
console.log(outputs.map(({ file, bytes }) => ({ file, bytes })));
