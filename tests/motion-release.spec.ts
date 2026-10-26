import { projects } from "../src/content/projects";
import { test, expect } from "@playwright/test";
const routes = [
  "/",
  "/projects",
  ...projects.map((p) => `/projects/${p.slug}`),
];
for (const width of [320, 360, 375, 390, 414, 430, 768, 1024, 1280, 1440, 1920])
  test(`default motion remains readable on every route at ${width}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    for (const route of routes) {
      expect((await page.goto(route))?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      // Intro completion can replace/cancel CSS animation objects. Observe the live
      // animation set instead of retaining finished promises for detached effects.
      await page.waitForFunction(() =>
        document
          .getAnimations()
          .every((a) => a.playState !== "running" && a.playState !== "paused"),
      );
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        route,
      ).toBe(true);
    }
    expect(errors).toEqual([]);
  });
test("native wheel advances the stack and End escapes it", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const nav = page.getByRole("navigation", {
    name: "Featured project navigation",
  });
  await nav.getByRole("button", { name: "Show 01 PesoFlow" }).click();
  await expect(
    nav.getByRole("button", { name: "Show 01 PesoFlow" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect
    .poll(async () =>
      Math.abs((await page.locator("#peso-flow").boundingBox())!.y - 160),
    )
    .toBeLessThan(5);
  await page.mouse.wheel(0, 650);
  await expect(
    nav.getByRole("button", { name: "Show 02 PokeChamp" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.mouse.wheel(0, 650);
  await expect(
    nav.getByRole("button", { name: "Show 03 PixelTools" }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(
    (await page.locator(".project-deck").boundingBox())!.height,
  ).toBeLessThan(900 * 3);
  await page.keyboard.press("End");
  await expect(page.locator("footer")).toBeInViewport();
});
test("pointer decorations settle and disappear offscreen", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const portrait = page.locator(".portrait-stage");
  const b = (await portrait.boundingBox())!;
  await page.mouse.move(b.x + b.width * 0.8, b.y + b.height * 0.3);
  await expect(portrait).toHaveAttribute("data-pointer-active", "true");
  await page.mouse.move(10, 10);
  await expect(portrait).not.toHaveAttribute("data-pointer-active", "true");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  expect(
    await portrait
      .locator("[data-pointer-layer]")
      .evaluate((el) => el.style.transform),
  ).toBe("");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    ),
  ).toBe(0);
});
test("all catalog routes and genuine gallery links survive without JavaScript", async ({
  browser,
}) => {
  const c = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const p = await c.newPage();
  for (const route of routes) {
    expect((await p.goto(route))?.status()).toBe(200);
    await expect(p.locator("h1")).toBeVisible();
    expect(
      await p.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
  }
  await p.goto("/projects/peso-flow");
  await expect(p.locator(".no-script-gallery a")).toHaveCount(3);
  await expect(
    p.getByRole("link", { name: "View larger", exact: true }),
  ).toHaveAttribute("href", "/projects/peso-flow-home.webp");
  await c.close();
});
