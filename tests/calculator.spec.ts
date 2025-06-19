import { expect, test } from '@playwright/test';

test('calculator', async ({ page }) => {
  await page.goto('/');

  expect(await page.locator('a.navbar-brand').textContent()).toBe('股票交易計算器');

  await page.getByLabel('交易類別').selectOption('ETF');
  await page.getByLabel('買入價格').fill('12');
  await page.getByLabel('賣出價格').fill('34');
  await page.getByLabel('交易股數').fill('100');

  await page.getByRole('button', { name: 'tune' }).click();
  await page.getByLabel('手續費折扣').fill('6');
  await page.getByLabel('最低手續費').fill('10');
  await page.getByRole('button', { name: 'Close Config Modal' }).click();

  await page.getByRole('button', { name: 'more_vert' }).click();
  await page.getByRole('button', { name: '增加小數位數' }).click();
  await page.getByRole('button', { name: '增加小數位數' }).click();
  await page.locator('body').click();

  const expected = {
    4: ['33.99', '2,175.60', '177.83%', '10.00 (1.03)', '10.00 (2.91)', '3.40', '1,223.40', '1,200.00', '3,399.00'],
    5: ['34.00', '2,176.60', '177.91%', '10.00 (1.03)', '10.00 (2.91)', '3.40', '1,223.40', '1,200', '3,400'],
    6: ['34.01', '2,177.60', '178.00%', '10.00 (1.03)', '10.00 (2.91)', '3.40', '1,223.40', '1,200.00', '3,401.00'],
  };

  for (const [rowIndex, values] of Object.entries(expected)) {
    const rowColumns = page.locator('table > tbody > tr').nth(Number(rowIndex)).locator('td');

    for (let i = 0; i < values.length; i++) {
      expect(await rowColumns.nth(i).textContent()).toContain(values[i]);
    }
  }
});
