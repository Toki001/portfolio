import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { seo } from "./seo.mjs";
import sharp from "sharp";
const preview = process.argv.includes("--preview");
const sitemap = await readFile("dist/sitemap.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => match[1],
);
assert.equal(urls.length, 6, "Only the six real pages in sitemap");
const titles = new Set();
const descriptions = new Set();
const images = new Set();
for (const url of urls) {
  const path = new URL(url).pathname;
  const html = await readFile(
    path === "/" ? "dist/index.html" : `dist${path}/index.html`,
    "utf8",
  );
  assert.equal(
    (html.match(/<h1\b/g) ?? []).length,
    1,
    `${path}: one prerendered H1`,
  );
  assert.ok(html.includes(`<link rel="canonical" href="${url}"`));
  assert.equal(/noindex/i.test(html), preview, `${path}: indexability`);
  assert.equal((html.match(/<title>/g) ?? []).length, 1);
  const title = html.match(/<title>(.*?)<\/title>/)[1];
  assert.ok(!titles.has(title), "Unique titles");
  titles.add(title);
  assert.ok(
    html.includes('name="description"') &&
      html.includes('name="twitter:card" content="summary_large_image"'),
  );
  const description = html.match(/name="description" content="([^"]+)"/)[1];
  assert.ok(!descriptions.has(description), "Unique descriptions");
  descriptions.add(description);
  const image = html.match(/property="og:image" content="([^"]+)"/)[1];
  assert.equal(
    (html.match(/property="og:image"/g) ?? []).length,
    1,
    "One OG image",
  );
  assert.equal(new URL(image).origin, new URL(seo.siteUrl).origin);
  if (path.startsWith("/projects/")) {
    assert.ok(!images.has(image), "Unique project card");
    images.add(image);
  }
  const dimensions = await sharp(`dist${new URL(image).pathname}`).metadata();
  assert.equal(dimensions.width, 1200);
  assert.equal(dimensions.height, 630);
  assert.equal(dimensions.format, "jpeg");
  assert.ok(!html.includes('href="#"'), "No empty placeholder destinations");
  const graph = JSON.parse(
    html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1],
  );
  assert.equal(
    graph["@graph"].find((entity) => entity["@type"] === "Person").url,
    seo.siteUrl,
  );
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(ids).size, ids.length, "Unique HTML IDs");
  for (const match of html.matchAll(/href="#([^"]+)"/g))
    assert.ok(ids.includes(match[1]), `${path}: broken anchor ${match[1]}`);
  for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]*)"/g)) {
    const local = match[1];
    if (local.includes("#")) continue;
    await access(
      `dist${local === "/" ? "/index.html" : local.includes(".") ? local : `${local}/index.html`}`,
    );
  }
}
assert.ok(
  (await readFile("dist/404.html", "utf8")).includes("noindex, follow"),
);
const robots = await readFile("dist/robots.txt", "utf8");
assert.ok(
  preview
    ? robots.includes("Disallow: /")
    : robots.includes(new URL("/sitemap.xml", seo.siteUrl).href),
);
const manifest = JSON.parse(await readFile("dist/site.webmanifest", "utf8"));
for (const icon of manifest.icons) await access(`dist${icon.src}`);
assert.equal(
  await readFile("dist/google711de76d62b8d616.html", "utf8"),
  await readFile("public/google711de76d62b8d616.html", "utf8"),
);
console.log(
  `PASS: ${urls.length} static routes, unique titles/descriptions/H1/canonicals, five 1200×630 cards, schema, internal assets/anchors, 404 and ${preview ? "preview noindex" : "production"} crawl files.`,
);
