// Decode actual recordings with Playwright's bundled FFmpeg; Chromium video overlays
// produced blank review captures on this host, while the underlying VP9 video is valid.
import { chromium } from "@playwright/test";
import { readdir, writeFile, readFile, mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import sharp from "sharp";
const run = promisify(execFile),
  label = process.argv[2] ?? "after",
  device = process.argv[3] ?? "desktop";
if (!/^[a-z0-9-]+$/.test(label) || !["desktop", "mobile"].includes(device))
  throw new Error("Invalid capture");
const cache = chromium.executablePath().split(/[/\\]chromium-\d+/)[0];
const versions = (await readdir(cache))
  .filter((n) => /^ffmpeg-\d+$/.test(n))
  .sort((a, b) => Number(b.split("-")[1]) - Number(a.split("-")[1]));
const ffmpeg =
  process.env.FFMPEG_PATH ??
  join(
    cache,
    versions[0],
    process.platform === "darwin"
      ? "ffmpeg-mac"
      : process.platform === "win32"
        ? "ffmpeg-win64.exe"
        : "ffmpeg-linux",
  );
const root = `docs/verification/motion/${label}`,
  file = `${root}/${device}.webm`;
let metadata = "";
try {
  await run(ffmpeg, ["-hide_banner", "-i", file]);
} catch (e) {
  metadata = String(e.stderr);
}
const match = metadata.match(/Duration: (\d+):(\d+):([\d.]+)/);
if (!match) throw new Error("Recording duration could not be decoded");
const duration =
  Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]);
const times = [
    0.08,
    0.25,
    0.5,
    0.9,
    1.3,
    ...[0.25, 0.4, 0.55, 0.7, 0.8, 0.9, 0.97].map((t) => t * duration),
  ],
  tiles = [];
for (const [i, t] of times.entries()) {
  const folder = await mkdtemp(join(tmpdir(), "portfolio-frame-"));
  const frame = join(folder, "frame.png");
  await run(ffmpeg, [
    "-loglevel",
    "error",
    "-ss",
    String(t),
    "-i",
    file,
    "-frames:v",
    "1",
    "-c:v",
    "png",
    frame,
  ]);
  const stdout = await readFile(frame);
  await rm(folder, { recursive: true, force: true });
  tiles.push({
    input: await sharp(stdout)
      .resize(640, 400, { fit: "contain", background: "white" })
      .png()
      .toBuffer(),
    left: (i % 4) * 640,
    top: Math.floor(i / 4) * 430,
  });
  tiles.push({
    input: Buffer.from(
      `<svg width="640" height="30"><rect width="640" height="30" fill="white"/><text x="12" y="21" font-family="Arial" font-size="17">${device} / ${t.toFixed(2)} seconds</text></svg>`,
    ),
    left: (i % 4) * 640,
    top: Math.floor(i / 4) * 430 + 400,
  });
}
await sharp({
  create: { width: 2560, height: 1290, channels: 3, background: "white" },
})
  .composite(tiles)
  .webp({ quality: 88 })
  .toFile(`${root}/${device}-timeline.webp`);
await writeFile(
  `${root}/${device}-timeline.json`,
  JSON.stringify(
    {
      duration,
      times,
      source:
        "Actual Playwright VP9 recording decoded by its bundled FFmpeg; no synthetic frames",
    },
    null,
    2,
  ) + "\n",
);
console.log(label, device, "duration", duration);
