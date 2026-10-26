import { test, expect } from "@playwright/test";
test("hero has real masks, bounded pointer response and cancellation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".hero-title .motion-line")).toHaveCount(2);
  await page.locator(".hero").evaluate(async (el) => {
    await Promise.allSettled(
      el.getAnimations({ subtree: true }).map((a) => a.finished),
    );
  });
  const portrait = page.locator(".portrait-stage");
  const b = (await portrait.boundingBox())!;
  await page.mouse.move(b.x + b.width * 0.8, b.y + b.height * 0.4);
  await expect(portrait).toHaveAttribute("data-pointer-active", "true");
  await expect
    .poll(() =>
      portrait
        .locator("[data-pointer-layer]")
        .evaluate((el) => el.style.transform),
    )
    .toContain("rotateY(");
  await expect(portrait.locator("[data-pointer-light]")).toHaveCSS(
    "opacity",
    "1",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(portrait.locator("[data-pointer-layer]")).toHaveCSS(
    "transform",
    "none",
  );
  await expect(portrait).not.toHaveAttribute("data-pointer-active", "true");
});
test("coarse pointer has no lens and touch project/contact links work", async ({
  browser,
}) => {
  const c = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const p = await c.newPage();
  await p.goto("/");
  await expect(p.locator(".portrait-light")).toBeHidden();
  await p.getByRole("link", { name: "Explore my work", exact: true }).tap();
  await expect(p).toHaveURL(/#projects$/);
  await expect(
    p.getByRole("link", { name: "Get in touch", exact: true }),
  ).toHaveAttribute("href", "#contact");
  await c.close();
});
