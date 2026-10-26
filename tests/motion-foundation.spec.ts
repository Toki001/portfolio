import { test, expect } from "@playwright/test";
test("normal-motion real links, back and forward produce no page errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await page
    .getByRole("link", { name: "Explore all projects", exact: true })
    .click();
  await page.getByRole("button", { name: "Web", exact: true }).click();
  await page
    .getByRole("link", { name: "Explore PokeChamp", exact: true })
    .click();
  await expect(page.locator("h1")).toContainText("PokeChamp");
  await page.goBack();
  await expect(
    page.getByRole("button", { name: "Web", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.goForward();
  await expect(page.locator("h1")).toContainText("PokeChamp");
  expect(errors).toEqual([]);
});
test("live reduced-motion preference cancels movement and preserves content", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  expect(
    await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    ),
  ).toBe(0);
  await expect(page.locator("h1")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore my work" }),
  ).toBeVisible();
});
test("keyboard menu opens immediately with static focus while pointer menu animates", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Menu", exact: true });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-input", "keyboard");
  await expect(
    page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Home", exact: true }),
  ).toBeFocused();
  expect(
    await page
      .locator("#mobile-navigation")
      .evaluate(
        (el) =>
          el.getAnimations().filter((a) => a.playState === "running").length,
      ),
  ).toBe(0);
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-input", "pointer");
});
