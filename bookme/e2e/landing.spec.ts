import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/BookMe/);
  });

  test('has navigation links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /Entrar/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Criar conta/i })).toBeVisible();
  });

  test('navigates to login', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Entrar/i }).click();
    await expect(page).toHaveURL(/.*login/);
  });
});
