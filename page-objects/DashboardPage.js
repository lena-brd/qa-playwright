class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator('.card-body');
    this.productsText = page.locator('.card-body b');
    this.cartCategory = page.locator('[routerlink*="cart"]');
  }

  async searchProductAndAddingToCart(productName) {
    await this.page.locator('.card-body b').first().waitFor();

    const cardTitles = await this.productsText.allTextContents();
    console.log(cardTitles);
    const count = await this.products.count();
    for (let i = 0; i < count; ++i) {
      if ((await this.products.nth(i).locator('b').textContent()) === productName) {
        // add to cart
        await this.products.nth(i).locator('text= Add To Cart').click();
        break;
      }
    }
  }

  async navigateToCart() {
    await this.cartCategory.click();
  }
}

module.exports = { DashboardPage };
