import { expect, test } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('/');

  expect(await page.locator('a.navbar-brand').textContent()).toBe('股票交易計算器');

  await page.getByLabel('交易類別').selectOption('ETF');
  await page.getByLabel('交易股數').fill('100');
  await page.getByLabel('買入價格').fill('12');
  await page.getByLabel('賣出價格').fill('34');

  await page.getByRole('button', { name: 'tune' }).click();
  await page.getByLabel('手續費折扣').fill('6');
  await page.getByLabel('最低手續費').fill('10');
  await page.getByRole('button', { name: 'close' }).click();

  await page.getByRole('button', { name: 'more_vert' }).click();
  await page.getByRole('button', { name: '增加小數位數' }).click();
  await page.getByRole('button', { name: '增加小數位數' }).click();
  await page.locator('body').click();

  const columns = page.locator('table > tbody > tr').nth(5).locator('td');
  expect(await columns.nth(0).textContent()).toContain('34.00');
  expect(await columns.nth(1).textContent()).toContain('1,200');
  expect(await columns.nth(2).textContent()).toContain('3,400');
  expect(await columns.nth(3).textContent()).toContain('10.00 (1.03)');
  expect(await columns.nth(4).textContent()).toContain('10.00 (2.91)');
  expect(await columns.nth(5).textContent()).toContain('3.40');
  expect(await columns.nth(6).textContent()).toContain('1,223.40');
  expect(await columns.nth(7).textContent()).toContain('2,176.60');
  expect(await columns.nth(8).textContent()).toContain('177.91%');
});
