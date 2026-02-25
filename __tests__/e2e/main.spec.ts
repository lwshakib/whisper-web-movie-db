import { test, expect } from "@playwright/test";

/**
 * Core E2E Navigation and Functional Tests.
 * Ensures that critical user paths (Home, Search, Routing) are operational.
 */
test.describe("Navigation", () => {
  /**
   * Verifies that all primary header links correctly update the URL
   * and display the intended branding.
   */
  test("main navigation links work", async ({ page }) => {
    await page.goto("/");

    // Verify presence of the global brand name in the Navbar
    await expect(page.locator("nav")).toContainText("WHISPER");

    // Click 'Movies' and verify transition to the cinema-focused catalog
    await page.click("text=Movies");
    await expect(page).toHaveURL(/.*movies/);

    // Click 'TV Shows' and verify transition to the episodic-content catalog
    await page.click("text=TV Shows");
    await expect(page).toHaveURL(/.*tv/);
  });
});

test.describe("Search Functionality", () => {
  /**
   * Validates the integrated header search bar and its transition to the search results page.
   */
  test("can search for a movie", async ({ page }) => {
    await page.goto("/");

    // Locate the dynamic search trigger and input
    const searchInput = page.getByPlaceholder(/search\.\.\./i);
    await searchInput.fill("Inception");
    await searchInput.press("Enter");

    // Ensure the application correctly formats the query parameter
    await expect(page).toHaveURL(/.*search\?q=Inception/);

    // Verify that the UI displays the current search term prominently
    const resultsTitle = page.locator("h1");
    await expect(resultsTitle).toContainText("Inception");
  });

  /**
   * Validates the multi-category search capability (Movies vs TV Shows toggle).
   */
  test("can switch between Movie and TV search results", async ({ page }) => {
    await page.goto("/search?q=Marvel&type=movie");

    // Test the tab switching logic within the search interface
    const tvTab = page.getByRole("link", { name: /TV Series/i });
    await tvTab.click();

    // Verify the URL updates to reflect the new category filter
    await expect(page).toHaveURL(/.*type=tv/);
  });
});
