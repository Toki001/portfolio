// Actual local production browser journey through the verified expanded catalog.
import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdir, rm, writeFile } from "node:fs/promises";
const label = process.argv[2] ?? "phase3-m18";
if (!/^[a-z0-9-]+$/.test(label)) throw new Error("Simple label required");
const root = `docs/verification/motion/${label}`;
await mkdir(root, { recursive: true });
const server = spawn(process.execPath, ["scripts/preview.mjs"], {
  env: { ...process.env, PORT: "4188" },
  stdio: ["ignore", "pipe", "inherit"],
});
await once(server.stdout, "data");
const browser = await chromium.launch();
const records = [];
try {
  for (const mobile of [false, true]) {
    const name = mobile ? "mobile" : "desktop",
      size = mobile
        ? { width: 390, height: 844 }
        : { width: 1440, height: 900 };
    const context = await browser.newContext({
      viewport: size,
      isMobile: mobile,
      hasTouch: mobile,
      recordVideo: { dir: root + "/raw", size },
    });
    const p = await context.newPage();
    const errors = [];
    p.on("pageerror", (e) => errors.push(e.message));
    await p.goto("http://127.0.0.1:4188/projects");
    await p.waitForTimeout(900);
    await p.screenshot({ path: `${root}/${name}-index.png`, fullPage: true });
    for (const category of ["Systems", "Tools", "All"]) {
      await p.getByRole("button", { name: category, exact: true }).click();
      await p.waitForTimeout(500);
      await p.screenshot({
        path: `${root}/${name}-${category.toLowerCase()}.png`,
      });
    }
    for (const [title, slug, kind] of [
      ["ResolveHub", "resolvehub", "Systems"],
      ["ReconcileIQ", "reconcileiq", "Systems"],
      ["Reimagined", "reimagined", "Tools"],
    ]) {
      await p.goto("http://127.0.0.1:4188/projects");
      await p.getByRole("button", { name: kind, exact: true }).click();
      await p.waitForTimeout(350);
      await p
        .getByRole("link", { name: `Explore ${title}`, exact: true })
        .click();
      await p.waitForTimeout(900);
      await p.screenshot({ path: `${root}/${name}-${slug}.png` });
      await p
        .getByRole("heading", { name: "The approach", exact: true })
        .scrollIntoViewIfNeeded();
      await p.waitForTimeout(700);
      const gallery = p.getByRole("region", {
        name: `${title} screenshots`,
        exact: true,
      });
      await gallery.scrollIntoViewIfNeeded();
      await p.waitForTimeout(600);
      const next = gallery.getByRole("button", {
        name: "Next screenshot",
        exact: true,
      });
      if (await next.count())
        for (let i = 0; i < 2; i++) {
          await next.click();
          await p.waitForTimeout(500);
        }
      await p.screenshot({ path: `${root}/${name}-${slug}-gallery.png` });
    }
    const video = p.video();
    await context.close();
    await video.saveAs(`${root}/${name}.webm`);
    records.push({
      name,
      size,
      errors,
      scenes: [
        "catalog",
        "real Systems/Tools/All filters",
        "ResolveHub",
        "ReconcileIQ",
        "Reimagined",
        "actual available galleries",
      ],
    });
  }
  await rm(root + "/raw", { recursive: true, force: true });
  await writeFile(
    root + "/catalog-recording.json",
    JSON.stringify(
      {
        label,
        source: "Actual local production Chromium video, default motion",
        records,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(records);
} finally {
  await browser.close();
  server.kill();
}
