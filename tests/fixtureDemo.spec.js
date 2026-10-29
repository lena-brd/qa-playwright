import { test, expect, request } from '@playwright/test';
import { customTest } from '../utils/fixtures.js';

customTest('Fixtures demo', async ({ authenticatedPage, createOrder, testDataForOrder }) => {
  // login to application, create order and verify if the order is created
  authenticatedPage.goto('https://rahulshettyacademy.com/client/');
  await authenticatedPage.locator('button[routerlink*="myorders"]').click();
  await authenticatedPage.locator('tbody').waitFor();
  await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
  console.log(testDataForOrder.productName);
});
