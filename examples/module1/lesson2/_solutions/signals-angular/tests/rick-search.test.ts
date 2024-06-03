import { test, expect } from '@playwright/test';

test('Rick Search', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill('rick');
  await expect(page.getByRole('img', { name: 'Rick Sanchez' })).toBeVisible();
});
