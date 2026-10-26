import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { writeFile } from "node:fs/promises";
const desktop = process.argv.includes("--desktop");
const device = desktop ? "desktop" : "mobile";
const server = spawn(process.execPath, ["scripts/preview.mjs"], {
  env: { ...process.env, PORT: "4176" },
  stdio: ["ignore", "pipe", "inherit"],
});
await once(server.stdout, "data");
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: desktop
      ? { width: 1440, height: 900 }
      : { width: 390, height: 844 },
    isMobile: !desktop,
    hasTouch: !desktop,
  });
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: 1_638_400 / 8,
    uploadThroughput: 750_000 / 8,
    connectionType: "cellular4g",
  });
  await page.addInitScript(() => {
    window.__profile = { events: [], longTasks: [], lcp: 0, cls: 0 };
    new PerformanceObserver((list) =>
      list.getEntries().forEach((e) => {
        if (e.interactionId)
          window.__profile.events.push({
            name: e.name,
            duration: e.duration,
            inputDelay: e.processingStart - e.startTime,
          });
      }),
    ).observe({ type: "event", buffered: true, durationThreshold: 16 });
    new PerformanceObserver((list) =>
      list
        .getEntries()
        .forEach((e) => window.__profile.longTasks.push(e.duration)),
    ).observe({ type: "longtask", buffered: true });
    new PerformanceObserver((list) =>
      list.getEntries().forEach((e) => (window.__profile.lcp = e.startTime)),
    ).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) =>
      list.getEntries().forEach((e) => {
        if (!e.hadRecentInput) window.__profile.cls += e.value;
      }),
    ).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto("http://127.0.0.1:4176/");
  await page.waitForFunction(() =>
    document.getAnimations().every((a) => a.playState !== "running"),
  );
  if (desktop) {
    const bounds = await page.locator(".portrait-stage").boundingBox();
    await page.mouse.move(
      bounds.x + bounds.width * 0.8,
      bounds.y + bounds.height * 0.3,
    );
    await page.waitForTimeout(500);
    const nav = page.getByRole("navigation", {
      name: "Featured project navigation",
    });
    for (const name of [
      "Show 01 PesoFlow",
      "Show 02 PokeChamp",
      "Show 03 PixelTools",
    ]) {
      await nav.getByRole("button", { name, exact: true }).click();
      await page.waitForTimeout(600);
    }
    await page.locator("#tech-stack summary").nth(1).click();
  } else {
    await page.getByRole("button", { name: "Menu", exact: true }).tap();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Tools", exact: true })
      .tap();
    await page.locator("#tech-stack summary").nth(1).tap();
  }
  for (const id of ["projects", "tech-stack", "tools", "about", "contact"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    );
    await page.waitForFunction(() =>
      document.getAnimations().every((a) => a.playState !== "running"),
    );
  }
  await page.screenshot({
    path: `docs/verification/motion/after/${device}-throttled-contact.png`,
  });
  await page.waitForFunction(() =>
    document.getAnimations().every((a) => a.playState !== "running"),
  );
  await cdp.send("Performance.enable");
  const metrics = await cdp.send("Performance.getMetrics");
  const result = {
    conditions: `Chromium ${await browser.version()}, ${desktop ? "1440×900 fine pointer" : "390×844 coarse pointer"}; 4× CPU, 150ms RTT, 1.6384Mbps download; default motion; local gzip production build. Single scripted run, not field INP.`,
    ...(await page.evaluate(() => ({
      ...window.__profile,
      idleAnimations: document
        .getAnimations()
        .filter((a) => a.playState === "running").length,
    }))),
    heap: metrics.metrics.find((m) => m.name === "JSHeapUsedSize")?.value,
  };
  await writeFile(
    `docs/verification/motion-after-${device}-profile.json`,
    JSON.stringify(result, null, 2) + "\n",
  );
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
  server.kill();
}
