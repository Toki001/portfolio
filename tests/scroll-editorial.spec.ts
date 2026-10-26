import { test, expect } from "@playwright/test";

test("scroll reveals actual responsive lines and does not replay on return", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const intro = page.locator(".editorial-introduction [data-reveal=sequence]");
  const text = await intro.locator(".scroll-copy").textContent();
  await page.mouse.wheel(0, 260);
  await expect(intro).toHaveAttribute("data-reveal-state", "done");
  const delays = await intro.evaluate((el) =>
    el
      .getAnimations({ subtree: true })
      .map((a) => Number(a.effect?.getTiming().delay)),
  );
  expect(new Set(delays).size).toBeGreaterThan(1);
  await expect
    .poll(() =>
      intro.evaluate(
        (el) =>
          el
            .getAnimations({ subtree: true })
            .filter((a) => a.playState === "running").length,
      ),
    )
    .toBe(0);
  const oldRows = Number(
    await intro.locator(".scroll-copy").getAttribute("data-lines"),
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await expect
    .poll(async () =>
      Number(await intro.locator(".scroll-copy").getAttribute("data-lines")),
    )
    .toBeGreaterThan(oldRows);
  expect(await intro.locator(".scroll-copy").textContent()).toBe(text);
  await page.mouse.wheel(0, -800);
  await page.mouse.wheel(0, 260);
  expect(
    await intro.evaluate(
      (el) =>
        el
          .getAnimations({ subtree: true })
          .filter((a) => a.playState === "running").length,
    ),
  ).toBe(0);
});

test("fast scroll, keyboard and live reduction expose complete text immediately", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.evaluate(() =>
    scrollTo({
      top:
        document.querySelector("#about")!.getBoundingClientRect().top +
        scrollY -
        120,
      behavior: "instant",
    }),
  );
  const heading = page.locator(".about-heading");
  await expect(heading).toHaveAttribute("data-reveal-state", "done");
  await expect(
    page.getByRole("heading", { name: "The person behind the code." }),
  ).toBeInViewport();
  await page.keyboard.press("Tab");
  expect(
    await page
      .locator(".reveal-word-inner")
      .evaluateAll((els) =>
        els.every((el) => getComputedStyle(el).transform === "none"),
      ),
  ).toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    ),
  ).toBe(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.mouse.move(300, 300);
  expect(await page.locator("[data-reveal-state=waiting]").count()).toBe(0);
});

test("case chapters reveal readable, unduplicated engineering text", async ({
  page,
}) => {
  await page.goto("/projects/peso-flow");
  const chapter = page.locator(".case-chapter").first();
  await chapter.scrollIntoViewIfNeeded();
  await expect(chapter).toHaveAttribute("data-reveal-state", "done");
  await expect(
    page.getByRole("heading", { name: "The problem", exact: true }),
  ).toBeInViewport();
  await expect(chapter.locator("p")).toHaveText(
    "Everyday expense tracking should stay useful without a connection or an account. Recording a purchase also needs to stay separate from correcting a receipt scan.",
  );
  await page.keyboard.press("Tab");
  expect(
    await chapter
      .locator(".reveal-word-inner")
      .evaluateAll((els) =>
        els.every((el) => getComputedStyle(el).transform === "none"),
      ),
  ).toBe(true);
});
