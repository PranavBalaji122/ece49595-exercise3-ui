import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const cards = (page: import("@playwright/test").Page) =>
  page.getByTestId("game-card");
const markers = (page: import("@playwright/test").Page) =>
  page.getByRole("button", { name: /Preview .* on map/ });

// A transparent 1x1 PNG. Functional tests serve it instead of real
// OpenStreetMap tiles so they run offline and do not load the tile servers.
const blankTile = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  "base64",
);

test.beforeEach(async ({ page }, testInfo) => {
  if (testInfo.title.startsWith("capture")) return;
  await page.route("https://tile.openstreetmap.org/**", (route) =>
    route.fulfill({ contentType: "image/png", body: blankTile }),
  );
});

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
  await expect(markers(page)).toHaveCount(8);
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
  await page.getByLabel("Distance", { exact: true }).selectOption("1");
  await expect(cards(page)).toHaveCount(1);
  await expect(markers(page)).toHaveCount(1);
  await page
    .getByRole("link", { name: "View After-class hoops", exact: true })
    .click();
  await expect(page).toHaveURL(/\/games\/corec-evening-hoops$/);
  await expect(
    page.getByRole("heading", { name: "After-class hoops", exact: true }),
  ).toBeVisible();
  await expect(page.getByText("Tuesday, October 20, 2026")).toBeVisible();
  await page.getByRole("link", { name: "Back to Discover" }).click();
  await expect(cards(page)).toHaveCount(1);
  await expect(page.getByLabel("Distance", { exact: true })).toHaveValue("1");
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
  await expect(cards(page)).toHaveCount(5);
  const distances = await cards(page).evaluateAll((elements) =>
    elements.map((el) => Number(el.getAttribute("data-distance"))),
  );
  expect(distances.every((distance) => distance <= 2)).toBeTruthy();
  await page
    .getByRole("button", { name: "Flag Football", exact: true })
    .click();
  await expect(cards(page)).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "No games in this corner. Yet." }),
  ).toBeVisible();
  await expect(markers(page)).toHaveCount(0);
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
  await expect(page.getByText("You’re on the roster!")).toBeVisible();
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
  await page.goto("/games/columbian-tennis");
  await expect(
    page.getByRole("button", { name: "Game full", exact: true }),
  ).toBeDisabled();
});

test("every map marker can be selected with the keyboard; reset clears it", async ({
  page,
}) => {
  await page.goto("/");
  await expect(markers(page)).toHaveCount(8);
  // Enter works like a click on Leaflet markers, and avoids nearby markers
  // overlapping each other at the default zoom.
  for (const marker of await markers(page).all()) {
    await marker.press("Enter");
    await expect(marker).toHaveAttribute("aria-pressed", "true");
  }
  await page
    .getByRole("button", { name: "Reset map view", exact: true })
    .click();
  await expect(
    page.getByText("Pick a marker or a game card to preview it here."),
  ).toBeVisible();
  await expect(page.locator('[data-selected="true"]')).toHaveCount(0);
  await page
    .getByRole("button", { name: "Preview Sunset sets on map", exact: true })
    .press("Enter");
  await page
    .getByRole("link", { name: "View details for Sunset sets", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Sunset sets", exact: true }),
  ).toBeVisible();
});

test("clicking a marker highlights the matching card", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  const marker = page.getByRole("button", {
    name: "Preview Sunday serve & social on map",
    exact: true,
  });
  await marker.click();
  await expect(marker).toHaveAttribute("aria-pressed", "true");
  const card = page.locator("#game-card-mccaw-volleyball");
  await expect(card).toHaveAttribute("data-selected", "true");
  await expect(
    card.getByRole("button", { name: "Show on map: Sunday serve & social" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator('[data-selected="true"]')).toHaveCount(1);
  await expect(
    page.getByRole("link", { name: "View details for Sunday serve & social" }),
  ).toBeVisible();
  if (testInfo.project.name === "desktop") {
    // The last card starts below the fold of the results list, so it only
    // becomes visible if the list scrolled to it.
    await expect(card).toBeInViewport();
  }
});

test("Show on map selects the marker and previews the game", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Show on map: Sunset sets" }).click();
  await expect(
    page.getByRole("button", { name: "Preview Sunset sets on map" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#game-card-tapawingo-volleyball")).toHaveAttribute(
    "data-selected",
    "true",
  );
  await expect(page.getByTestId("map-panel")).toBeInViewport();
  await expect(
    page.getByRole("link", { name: "View details for Sunset sets" }),
  ).toBeVisible();
  // Picking a different card moves the selection.
  await page
    .getByRole("button", { name: "Show on map: After-class hoops" })
    .click();
  await expect(
    page.getByRole("button", { name: "Preview Sunset sets on map" }),
  ).toHaveAttribute("aria-pressed", "false");
  await expect(
    page.getByRole("button", { name: "Preview After-class hoops on map" }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("the games API returns project-format records", async ({ request }) => {
  const response = await request.get("/api/games");
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.games).toHaveLength(8);
  for (const record of body.games) {
    expect(typeof record.venue.latitude).toBe("number");
    expect(typeof record.venue.longitude).toBe("number");
    expect(record.starts_at).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/);
    expect(record.current_players).toBeLessThanOrEqual(record.max_players);
  }
});

test.describe("with the user's location", () => {
  // Near Cumberland Park, north of campus.
  test.use({
    geolocation: { latitude: 40.4612, longitude: -86.9201 },
    permissions: ["geolocation"],
  });

  test("Use my location re-measures distances and centers on the user", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(cards(page).first()).toContainText("After-class hoops");
    await expect(page.getByTestId("location-status")).toHaveText(
      "Distances from Purdue Memorial Union",
    );
    await page.getByRole("button", { name: "Use my location" }).click();
    await expect(page.getByTestId("location-status")).toHaveText(
      "Distances from your location",
    );
    await expect(page.getByText("You are here")).toBeVisible();
    // Nearest first now starts with the game closest to the user.
    await expect(cards(page).first()).toContainText("Sunday flag football");
    await expect(cards(page).first()).toHaveAttribute("data-distance", "0.3");
    await page.getByLabel("Distance", { exact: true }).selectOption("1");
    await expect(cards(page)).toHaveCount(1);
    // The location carries over to the details page.
    await page
      .getByRole("link", { name: "View Sunday flag football", exact: true })
      .click();
    await expect(page.getByText("0.3 miles from your location.")).toBeVisible();
  });
});

test("a blocked location falls back to campus distances", async ({ page }) => {
  // Headless Chrome leaves the permission prompt open, so simulate the user
  // pressing "Block" (GeolocationPositionError code 1).
  await page.addInitScript(() => {
    navigator.geolocation.getCurrentPosition = (_success, error) => {
      error?.({ code: 1, message: "User denied Geolocation" } as never);
    };
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Use my location" }).click();
  await expect(page.getByTestId("location-status")).toHaveText(
    "Location unavailable · distances from campus",
  );
  await expect(cards(page).first()).toContainText("After-class hoops");
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
  // Uses real map tiles, so this test needs an internet connection.
  const folder = "docs/screenshots/exercise5";
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(markers(page)).toHaveCount(8);
  await page.waitForLoadState("networkidle");
  if (testInfo.project.name === "desktop") {
    await page.screenshot({
      path: `${folder}/01-real-map-desktop.png`,
      animations: "disabled",
    });
    await page
      .getByRole("button", { name: "Preview Sunday serve & social on map" })
      .click();
    await page.waitForTimeout(1000);
    await page.waitForLoadState("networkidle");
    await page.getByTestId("map-panel").scrollIntoViewIfNeeded();
    await page.screenshot({
      path: `${folder}/02-marker-card-sync.png`,
      animations: "disabled",
    });
    await page.context().grantPermissions(["geolocation"]);
    await page
      .context()
      .setGeolocation({ latitude: 40.4612, longitude: -86.9201 });
    await page.getByRole("button", { name: "Reset map view" }).click();
    await page.getByRole("button", { name: "Use my location" }).click();
    await expect(page.getByText("You are here")).toBeVisible();
    await page.waitForTimeout(1200);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${folder}/03-user-location.png`,
      animations: "disabled",
    });
  } else {
    await page.screenshot({
      path: `${folder}/04-discover-mobile.png`,
      fullPage: true,
      animations: "disabled",
    });
  }
});
