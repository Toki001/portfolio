// Real Playwright recordings of the production site. Pauses are filming cadence, never product waits.
import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdir, rm, writeFile } from "node:fs/promises";
const label = process.argv[2] ?? "after";
if (!/^[a-z0-9-]+$/.test(label))
  throw new Error("Use a simple recording label");
const root = `docs/verification/motion/${label}`;
await mkdir(root, { recursive: true });
const server = spawn(process.execPath, ["scripts/preview.mjs"], {
  env: { ...process.env, PORT: "4176" },
  stdio: ["ignore", "pipe", "inherit"],
});
await once(server.stdout, "data");
const browser = await chromium.launch();
const notes = [];
try {
  for (const mobile of [false, true]) {
    const name = mobile ? "mobile" : "desktop";
    const size = mobile
      ? { width: 390, height: 844 }
      : { width: 1440, height: 900 };
    const context = await browser.newContext({
      viewport: size,
      isMobile: mobile,
      hasTouch: mobile,
      recordVideo: { dir: `${root}/raw`, size },
    });
    const p = await context.newPage();
    const errors = [];
    p.on("pageerror", (e) => errors.push(e.message));
    await p.goto("http://127.0.0.1:4176/");
    await p.waitForTimeout(1400);
    await p.screenshot({ path: `${root}/${name}-hero.png` });
    if (mobile) {
      await p.getByRole("button", { name: "Menu", exact: true }).tap();
      await p.waitForTimeout(450);
      await p
        .getByRole("navigation", { name: "Mobile navigation" })
        .getByRole("link", { name: "Projects", exact: true })
        .tap();
    } else {
      await p.mouse.move(1000, 320);
      await p.mouse.move(1240, 480, { steps: 30 });
      await p.waitForTimeout(500);
      await p.mouse.move(1100, 270, { steps: 30 });
      await p.waitForTimeout(500);
      await p
        .getByRole("link", { name: "Explore my work", exact: true })
        .click();
    }
    await p.waitForTimeout(850);
    const scene = p.getByRole("navigation", {
      name: "Featured project navigation",
    });
    if (await scene.isVisible()) {
      await scene.getByRole("button", { name: "Show 01 PesoFlow" }).click();
      await p.waitForTimeout(600);
      const b = await p.locator("#peso-flow .work-media-link").boundingBox();
      if (b) {
        await p.mouse.move(b.x + b.width * 0.3, b.y + b.height * 0.4);
        await p.mouse.move(b.x + b.width * 0.7, b.y + b.height * 0.6, {
          steps: 20,
        });
        await p.waitForTimeout(350);
      }
    }

    await p.screenshot({ path: `${root}/${name}-work.png` });
    for (let i = 0; i < 6; i++) {
      await p.mouse.wheel(0, 260);
      await p.waitForTimeout(250);
    }
    await p
      .getByRole("link", { name: "Explore all projects", exact: true })
      .click();
    await p.waitForTimeout(600);
    for (const category of ["Web", "All", "Mobile"]) {
      await p.getByRole("button", { name: category, exact: true }).click();
      await p.waitForTimeout(600);
    }
    await p
      .getByRole("link", { name: "Explore PesoFlow", exact: true })
      .click();
    await p.waitForTimeout(950);
    await p
      .getByRole("region", { name: "PesoFlow screenshots" })
      .scrollIntoViewIfNeeded();
    await p.waitForTimeout(700);
    await p
      .getByRole("button", { name: "Next screenshot", exact: true })
      .click();
    await p.waitForTimeout(450);
    await p.getByRole("button", { name: "View larger", exact: true }).click();
    await p.waitForTimeout(700);
    await p.getByRole("button", { name: "Close", exact: false }).click();
    await p.waitForTimeout(350);
    await p.screenshot({ path: `${root}/${name}-gallery.png` });
    const video = p.video();
    await context.close();
    await video.saveAs(`${root}/${name}.webm`);
    notes.push({
      name,
      viewport: size,
      errors,
      scenes: [
        "hero entry and pointer (desktop)",
        "menu and anchor (mobile)",
        "featured scroll sequence",
        "project filters",
        "case entry",
        "gallery next and dialog",
      ],
    });
  }
  await writeFile(
    `${root}/recording.json`,
    JSON.stringify(
      {
        label,
        source:
          "local production dist, Playwright Chromium; actual browser video, default motion",
        notes,
      },
      null,
      2,
    ) + "\n",
  );
} finally {
  await browser.close();
  server.kill();
  await rm(`${root}/raw`, { recursive: true, force: true });
}
