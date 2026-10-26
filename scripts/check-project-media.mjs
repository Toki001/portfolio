import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";
const evidence = JSON.parse(
  await readFile("docs/verification/project-media-evidence.json", "utf8"),
);
for (const item of evidence) {
  const bytes = await readFile("public" + item.src);
  const meta = await sharp(bytes).metadata();
  assert.equal(
    createHash("sha256").update(bytes).digest("hex"),
    item.sha256,
    `${item.src}: matches reviewed output`,
  );
  assert.equal(meta.width, item.width);
  assert.equal(meta.height, item.height);
  assert.equal(meta.format, "webp");
  assert.ok(
    item.sourceSha256 &&
      item.source &&
      item.revision &&
      item.state &&
      item.label &&
      item.alt &&
      item.caption,
    "Complete traceability",
  );
  const thumb = await sharp("public" + item.thumbnail).metadata();
  assert.ok(thumb.width <= 320);
}
const artwork = JSON.parse(
  await readFile("docs/verification/project-artwork-evidence.json", "utf8"),
);
for (const item of artwork) {
  assert.equal(
    createHash("sha256")
      .update(await readFile(item.source))
      .digest("hex"),
    item.sourceSHA256,
  );
  for (const output of item.outputs) {
    const bytes = await readFile(output.file),
      meta = await sharp(bytes).metadata();
    assert.equal(
      createHash("sha256").update(bytes).digest("hex"),
      output.sha256,
    );
    assert.equal(meta.width, output.width);
    assert.equal(meta.height, output.height);
    assert.equal(bytes.length, output.bytes);
  }
}
const portrait = JSON.parse(
  await readFile("docs/verification/portrait-evidence.json", "utf8"),
);
for (const output of portrait.outputs) {
  const bytes = await readFile(output.file),
    meta = await sharp(bytes).metadata();
  assert.equal(createHash("sha256").update(bytes).digest("hex"), output.sha256);
  assert.equal(meta.width, output.width);
  assert.equal(meta.height, output.height);
  assert.equal(
    meta.exif,
    undefined,
    "Portrait derivatives contain no EXIF metadata",
  );
}
const sitemap = await readFile("dist/sitemap.xml", "utf8");
let count = 0;
for (const [, url] of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) {
  const path = new URL(url).pathname;
  if (!path.startsWith("/projects/")) continue;
  const html = await readFile(`dist${path}/index.html`, "utf8");
  const gallery =
    html.match(/<p class="no-script-gallery">([\s\S]*?)<\/p>/)?.[1] ?? "";
  const images = [
    ...new Set([...gallery.matchAll(/href="([^"]+)"/g)].map((m) => m[1])),
  ];
  assert.ok(images.length >= 3, `${path}: three distinct real UI views`);
  const hashes = [];
  for (const image of images)
    hashes.push(
      createHash("sha256")
        .update(await readFile("dist" + image))
        .digest("hex"),
    );
  assert.equal(
    new Set(hashes).size,
    images.length,
    `${path}: no duplicate files pretending to be screens`,
  );
  count += images.length;
}
console.log(
  `PASS: ${evidence.length} reviewed capture outputs match hashes/geometry; ${artwork.length * 2} artwork derivatives and ${portrait.outputs.length} portrait variants verified separately; ${count} distinct gallery images have static fallback links.`,
);
