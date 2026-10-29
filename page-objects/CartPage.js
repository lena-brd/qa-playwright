const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('text=Checkout');
  }

  async addedProduct(productName) {
    await this.page.waitForLoadState('networkidle');
    await this.page.locator('div li').first().waitFor();
    const bool = await this.page.locator(`h3:has-text("${productName}")`).isVisible();
    expect(bool).toBeTruthy();
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
