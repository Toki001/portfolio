import { test, expect } from "@playwright/test";

test("editorial rows reveal during native scrolling and settle after rapid disclosure", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const selector of [".capability-detail", ".tool-row"]) {
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const row = page.locator(selector).first();
    await row.evaluate((el) =>
      scrollTo({
        top: el.getBoundingClientRect().top + scrollY - innerHeight - 200,
        behavior: "instant",
      }),
    );
    await page.waitForTimeout(80);
    await page.mouse.wheel(0, 80);
    await page.waitForTimeout(80);
    await page.mouse.wheel(0, 240);
    await expect(row).toHaveAttribute("data-reveal-state", "done");
    expect(
      await row.evaluate((el) =>
        el
          .getAnimations({ subtree: true })
          .some((a) => a.playState === "running"),
      ),
      `${selector} should enter during an ordinary scroll, after the jump has settled`,
    ).toBe(true);
    await page.keyboard.press("Tab");
    expect(
      await row
        .locator(".reveal-word-inner")
        .evaluateAll((els) =>
          els.every((el) => getComputedStyle(el).transform === "none"),
        ),
    ).toBe(true);
    // Return to pointer input so the next section is tested with its default motion.
    await page.mouse.move(500, 400);
  }
  const detail = page.locator(".capability-detail").nth(1);
  const summary = detail.locator("summary");
  for (let i = 0; i < 3; i++) await summary.click();
  await expect(detail).toHaveAttribute("open", "");
  await expect(detail.locator(".stack-tags")).toBeVisible();
  await expect
    .poll(() =>
      detail.evaluate(
        (el) =>
          el
            .getAnimations({ subtree: true })
            .filter((a) => a.playState === "running").length,
      ),
    )
    .toBe(0);
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(detail).not.toHaveAttribute("open");
  await page.keyboard.press("Enter");
  await expect(detail).toHaveAttribute("open", "");
  expect(
    await detail.evaluate(
      (el) =>
        el
          .getAnimations({ subtree: true })
          .filter((a) => a.playState === "running").length,
    ),
  ).toBe(0);
});

test("coarse pointer and live reduced motion keep all row text and tags available", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("/");
  const detail = page.locator(".capability-detail").nth(2);
  await detail.locator("summary").tap();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(detail.locator(".stack-tags")).toBeVisible();
  expect(
    await page
      .locator(".reveal-word-inner")
      .evaluateAll((els) =>
        els.every((el) => getComputedStyle(el).transform === "none"),
      ),
  ).toBe(true);
  expect(
    await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    ),
  ).toBe(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await expect(
    page.getByRole("heading", { name: "Postman", exact: true }),
  ).toHaveCount(1);
  await context.close();
});
