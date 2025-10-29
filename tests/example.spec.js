// @ts-check
import { test, expect } from '@playwright/test';



test.describe.serial('Playwright site checks', () => {
  test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });

    // wait for a stable element instead of a blind timeout
    await page.waitForSelector('title');
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/', { waitUntil: 'networkidle' });

    // wait for the link to be visible, click and wait for navigation
    await page.waitForSelector('a:has-text("Get started")', { state: 'visible' });
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.getByRole('link', { name: 'Get started' }).click(),
    ]);

    await page.waitForSelector('h1, h2, [role="heading"]', { state: 'visible' });
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
});
