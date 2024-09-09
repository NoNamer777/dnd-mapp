import { expect, test } from 'playwright/test';

test('Authentication Server Portal launches', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('DnD-Mapp Authentication Server Portal works')).toBeVisible();
});
