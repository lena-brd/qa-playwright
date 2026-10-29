const { expect } = require('@playwright/test');

class OrdersPage {
  constructor(page) {
    this.page = page;
    this.myOrdersButton = page.locator('button[routerlink*="myorders"]');
    this.orders = page.locator('tbody');
  }

  async orderIsCompleted() {
    const orderId = await this.page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    await this.myOrdersButton.click();
    await this.orders.waitFor();
    const rows = await this.page.locator('tbody tr');
    for (let i = 0; i < (await rows.count()); ++i) {
      const rowOrderId = await rows.nth(i).locator('th').textContent();
      if (orderId.includes(rowOrderId)) {
        await rows.nth(i).locator('button').first().click();
        break;
      }
    }
    const orderIdDetailsPage = await this.page.locator('.col-text').textContent();
    expect(orderId.includes(orderIdDetailsPage)).toBeTruthy();
  }
}

module.exports = { OrdersPage };
