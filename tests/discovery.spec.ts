import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const cards = (page: import("@playwright/test").Page) =>
  page.getByTestId("game-card");

test("Discover renders all eight games without browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Your next game",
  );
  await expect(cards(page)).toHaveCount(8);
  await expect(
    page.getByRole("button", { name: /Preview .* on map/ }),
  ).toHaveCount(8);
  await expect(page.getByTestId("game-count")).toHaveText("8");
  expect(errors).toEqual([]);
});

test("sport and distance compose; details and back preserve filters", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Basketball", exact: true }).click();
  await expect(cards(page)).toHaveCount(2);
  await expect(cards(page).first()).toHaveAttribute("data-sport", "Basketball");
  await page.getByLabel("Distance", { exact: true }).selectOption("2");
  await expect(cards(page)).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: /Preview .* on map/ }),
  ).toHaveCount(1);
  await page
    .getByRole("link", { name: "View After-class hoops", exact: true })
    .click();
  await expect(page).toHaveURL(/\/games\/corec-evening-hoops$/);
  await expect(
    page.getByRole("heading", { name: "After-class hoops", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Tuesday, September 22, 2026")).toBeVisible();
  await page.getByRole("link", { name: "Back to Discover" }).click();
  await expect(cards(page)).toHaveCount(1);
  await expect(page.getByLabel("Distance", { exact: true })).toHaveValue("2");
  await expect(
    page.getByRole("button", { name: "Basketball", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("link", { name: "View After-class hoops", exact: true })
    .click();
  await expect(page).toHaveURL(/\/games\/corec-evening-hoops$/);
  await page.goBack();
  await expect(cards(page)).toHaveCount(1);
});

test("distance alone includes boundary games and empty filters recover", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("Distance", { exact: true }).selectOption("2");
  await expect(cards(page)).toHaveCount(4);
  const distances = await cards(page).evaluateAll((elements) =>
    elements.map((el) => Number(el.getAttribute("data-distance"))),
  );
  expect(distances.every((distance) => distance <= 2)).toBeTruthy();
  await page.getByRole("button", { name: "Volleyball", exact: true }).click();
  await page.getByLabel("Distance", { exact: true }).selectOption("1");
  await expect(cards(page)).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "No games in this corner. Yet." }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Preview .* on map/ }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Clear all filters" }).click();
  await expect(cards(page)).toHaveCount(8);
});

test("open spots and chronological sorting change the results", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("Open spots only").check();
  await expect(cards(page)).toHaveCount(7);
  await expect(
    page.getByRole("link", { name: "View Weekend rally club", exact: true }),
  ).toHaveCount(0);
  await page.getByLabel("Open spots only").uncheck();
  await page.getByLabel("Sort games").selectOption("date");
  await expect(cards(page).nth(4)).toContainText("Weekend rally club");
  await expect(cards(page).nth(5)).toContainText("Saturday morning buckets");
});

test("joining the last spot, My games, leaving, and full-game protection", async ({
  page,
}) => {
  await page.goto("/games/purdue-doubles");
  await expect(page.getByTestId("player-count")).toHaveText("3 of 4 players");
  await page.getByRole("button", { name: "Join game", exact: true }).click();
  await expect(page.getByTestId("player-count")).toHaveText("4 of 4 players");
  await expect(page.getByRole("status")).toContainText("You’re on the roster!");
  await page.getByRole("link", { name: "View my games" }).click();
  await expect(cards(page)).toHaveCount(1);
  await expect(cards(page)).toContainText("A little friendly doubles");
  await page
    .getByRole("link", { name: "View A little friendly doubles", exact: true })
    .click();
  await page.getByRole("button", { name: "Leave game", exact: true }).click();
  await expect(page.getByTestId("player-count")).toHaveText("3 of 4 players");
  await page.getByRole("link", { name: "My games", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Your game plan starts here." }),
  ).toBeVisible();
  await page.goto("/games/clegg-tennis");
  await expect(
    page.getByRole("button", { name: "Game full", exact: true }),
  ).toBeDisabled();
});

test("every map marker can be selected; preview and zoom work", async ({
  page,
}) => {
  await page.goto("/");
  const markers = page.getByRole("button", { name: /Preview .* on map/ });
  for (const marker of await markers.all()) {
    await marker.click();
    await expect(marker).toHaveAttribute("aria-pressed", "true");
  }
  await page.getByRole("button", { name: "Zoom in", exact: true }).click();
  await page.getByRole("button", { name: "Zoom in", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Zoom in", exact: true }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Reset map view", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Zoom out", exact: true }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Preview Sunset sets on map", exact: true })
    .click();
  await page
    .getByRole("link", { name: "View details for Sunset sets", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Sunset sets", exact: true }),
  ).toBeVisible();
});

test("keyboard controls and invalid game URLs are usable", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Soccer", exact: true }).focus();
  await page.keyboard.press("Space");
  await expect(cards(page)).toHaveCount(1);
  const response = await page.goto("/games/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "This game isn’t on the map." }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Back to Discover" }).click();
  await expect(cards(page)).toHaveCount(8);
});

test("layout reflows without horizontal overflow", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  const map = await page.getByTestId("map-panel").boundingBox();
  const filters = await page.getByTestId("filter-bar").boundingBox();
  const list = await page
    .getByRole("region", { name: "Nearby game results" })
    .boundingBox();
  expect(map).not.toBeNull();
  expect(filters).not.toBeNull();
  expect(list).not.toBeNull();
  if (testInfo.project.name === "mobile") {
    expect(map!.y + map!.height).toBeLessThan(filters!.y);
    expect(filters!.y + filters!.height).toBeLessThan(list!.y);
    await page.setViewportSize({ width: 320, height: 740 });
  } else {
    expect(map!.x + map!.width).toBeLessThan(list!.x);
    expect(filters!.y).toBeLessThan(map!.y);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  await page.goto("/games/corec-evening-hoops");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
});

test("Discover, details, and My games pass axe WCAG A/AA checks", async ({
  page,
}) => {
  for (const path of ["/", "/games/corec-evening-hoops", "/my-games"]) {
    await page.goto(path);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      result.violations,
      JSON.stringify(result.violations, null, 2),
    ).toEqual([]);
  }
});

test("capture assignment screenshots", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  if (testInfo.project.name === "desktop") {
    await page.screenshot({
      path: "docs/screenshots/02-discover-desktop.png",
      fullPage: true,
      animations: "disabled",
    });
    await page.getByRole("button", { name: "Basketball", exact: true }).click();
    await page.getByLabel("Distance", { exact: true }).selectOption("2");
    await expect(cards(page)).toHaveCount(1);
    await page.screenshot({
      path: "docs/screenshots/03-active-filters.png",
      fullPage: true,
      animations: "disabled",
    });
    await page
      .getByRole("link", { name: "View After-class hoops", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: "After-class hoops", exact: true }),
    ).toBeVisible();
    await page.screenshot({
      path: "docs/screenshots/04-game-details.png",
      fullPage: true,
      animations: "disabled",
    });
  } else {
    await page.getByRole("button", { name: "Basketball", exact: true }).click();
    await expect(cards(page)).toHaveCount(2);
    await page.screenshot({
      path: "docs/screenshots/05-discover-mobile.png",
      fullPage: true,
      animations: "disabled",
    });
  }
});
