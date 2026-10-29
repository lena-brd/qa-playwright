const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.creaditCardNumber = page.locator('[value="4542 9931 9292 2293"]');
    this.expiryMonth = page.locator('.input.ddl');
    this.expiryYear = page.locator('.input.ddl');
    this.cvvCode = page.locator('.field.small > .input.txt');
    this.name = page.locator('.field .input.input.txt');
    this.country = page.locator('[placeholder="Select Country"]');
    this.submitButton = page.locator('.action__submit');
  }

  async personalInformation(creaditCardNumber, expiryMonth, expiryYear, cvv, name) {
    await this.creaditCardNumber.fill(creaditCardNumber);
    await this.expiryMonth.first().selectOption(expiryMonth);
    await this.expiryYear.last().selectOption(expiryYear);
    await this.cvvCode.first().fill(cvv);
    await this.name.nth(2).fill(name);
  }

  async shippingInformation(country, countryName) {
    await this.country.pressSequentially(country, { delay: 100 });
    const dropdown = this.page.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator('button').count();
    let countrySelected = false;
    for (let i = 0; i < optionsCount; i++) {
      const text = await dropdown.locator('button').nth(i).textContent();
      if (text?.trim() === countryName.trim()) {
        await dropdown.locator('button').nth(i).click();
        countrySelected = true;
        break;
      }
    }
    if (!countrySelected) {
      throw new Error(`Country "${countryName}" was not found in the suggestions`);
    }
  }

  async submitOrder() {
    await this.submitButton.click();
    await expect(this.page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
  }
}

module.exports = { CheckoutPage };
