import { projects } from "../src/content/projects";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("spatial stack tracks scroll, explicit selection, and keyboard focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".project-deck")).toHaveAttribute(
    "data-spatial",
    "true",
  );
  const nav = page.getByRole("navigation", {
    name: "Featured project navigation",
  });
  await nav.getByRole("button", { name: "Show 02 PokeChamp" }).click();
  await expect(
    nav.getByRole("button", { name: "Show 02 PokeChamp" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".scene-count")).toHaveText("02 / 03");
  await nav.getByRole("button", { name: "Show 03 PixelTools" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".scene-count")).toHaveText("03 / 03");
  await page.locator("#pixeltools .work-case-link").focus();
  await expect(page.locator("#pixeltools .work-case-link")).toBeInViewport();
  expect(
    (await new AxeBuilder({ page }).include("#projects").analyze()).violations,
  ).toEqual([]);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".project-deck")).not.toHaveAttribute(
    "data-spatial",
    "true",
  );
  await expect(nav).toBeHidden();
});
test("reflow filters tolerate rapid changes, history and keyboard activation", async ({
  page,
}) => {
  await page.goto("/projects");
  for (const category of ["Web", "Mobile", "All", "AI / ML", "All"])
    await page.getByRole("button", { name: category, exact: true }).click();
  await expect(page.locator(".explorer-card")).toHaveCount(projects.length);
  await page.goBack();
  await expect(page.locator(".explorer-card")).toHaveCount(1);
  const web = page.getByRole("button", { name: "Web", exact: true });
  await web.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".explorer-card")).toHaveCount(2);
  await expect(web).toBeFocused();
  expect(
    await page
      .locator(".explorer-grid")
      .evaluate(
        (el) =>
          el
            .getAnimations({ subtree: true })
            .filter((a) => a.playState === "running").length,
      ),
  ).toBe(0);
});
