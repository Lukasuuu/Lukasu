import { test, expect } from '@playwright/test';

test.describe('Auth Flow', () => {
  test('login page loads', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveURL(/.*login/);
  });

  test('signup page loads', async ({ page }) => {
    await page.goto('/signup');
    await expect(page).toHaveURL(/.*signup/);
  });

  test('password recovery page loads', async ({ page }) => {
    await page.goto('/forgot-password');
    await expect(page).toHaveURL(/.*forgot-password/);
  });
});
