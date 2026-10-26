import { test, expect } from "@playwright/test";
test("completed hero never replays on keyboard-to-pointer handoff", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".hero")).toHaveAttribute(
    "data-intro-complete",
    "true",
  );
  await page.keyboard.press("Tab");
  await page.mouse.move(300, 300);
  expect(
    await page
      .locator(".hero-title")
      .evaluate(
        (el) =>
          el
            .getAnimations({ subtree: true })
            .filter((a) => a.playState === "running").length,
      ),
  ).toBe(0);
  await page.locator("#tech-stack").scrollIntoViewIfNeeded();
  await expect(page.locator(".pixel-handoff i")).toHaveCount(12);
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page
      .locator(".pixel-handoff")
      .evaluate(
        (el) =>
          el
            .getAnimations({ subtree: true })
            .filter((a) => a.playState === "running").length,
      ),
  ).toBe(0);
});
test("gallery accepts rapid pointer input and Escape during opening", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/projects/peso-flow");
  const next = page.getByRole("button", { name: "Next screenshot" });
  await next.click();
  await next.click();
  await page.getByRole("button", { name: "Previous screenshot" }).click();
  await expect(page.locator(".case-gallery figcaption")).toContainText(
    "2 of 3",
  );
  const zoom = page.getByRole("button", { name: "View larger" });
  await zoom.click();
  await page.keyboard.press("Escape");
  await expect(zoom).toBeFocused();
  await expect(page.getByRole("dialog")).toBeHidden();
  expect(errors).toEqual([]);
});
