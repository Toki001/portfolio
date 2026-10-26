import { projects } from "../src/content/projects";
import { test, expect } from "@playwright/test";
const paths = ["/", "/projects", ...projects.map((p) => `/projects/${p.slug}`)];
test.use({ reducedMotion: "reduce" });
for (const width of [
  320, 360, 375, 390, 414, 430, 768, 1024, 1280, 1440, 1920,
]) {
  test(`all routes fit ${width}px without broken media or console errors`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    for (const path of paths) {
      expect((await page.goto(path))?.status()).toBe(200);
      await page.evaluate(async () => {
        await document.fonts.ready;
        for (const img of document.images) {
          img.loading = "eager";
          await img.decode().catch(() => {});
        }
      });
      await expect(page.locator("h1")).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        path,
      ).toBe(true);
      expect(
        await page
          .locator("img")
          .evaluateAll((imgs) =>
            imgs.every((i) => i.complete && i.naturalWidth > 0),
          ),
        path,
      ).toBe(true);
      expect(
        await page.locator('link[rel="canonical"]').getAttribute("href"),
      ).toBe(`https://portfolio-toki20.vercel.app${path === "/" ? "/" : path}`);
    }
    expect(errors).toEqual([]);
  });
}
test("landscape touch navigation and reduced motion remain operable", async ({
  browser,
}) => {
  const c = await browser.newContext({
    viewport: { width: 844, height: 390 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "reduce",
  });
  const p = await c.newPage();
  await p.goto("/");
  expect(await p.evaluate(() => matchMedia("(pointer:coarse)").matches)).toBe(
    true,
  );
  await p.getByRole("button", { name: "Menu", exact: true }).tap();
  await p
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Contact" })
    .tap();
  await expect(p).toHaveURL(/#contact$/);
  await expect(p.locator("#contact")).toBeFocused();
  expect(
    await p.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    ),
  ).toBe(0);
  expect(
    await p.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
  await c.close();
});
test("tablet landscape, enlarged text, redirects and query variants", async ({
  page,
  request,
}) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  for (const path of paths) {
    await page.goto(path);
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      path,
    ).toBe(true);
    await expect(page.locator("h1")).toBeVisible();
  }
  for (const path of ["/index.html", "/projects/"]) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
  }
  await page.goto("/projects?category=Unknown");
  await expect(page.locator("h1")).toBeVisible();
  await page.goto("/projects/peso-flow?media=999");
  await expect(page.locator(".case-gallery figcaption")).toContainText(
    "1 of 3",
  );
});
