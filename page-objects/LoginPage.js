class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInButton = page.locator('#login');
    this.userEmail = page.locator('#userEmail');
    this.userPassword = page.locator('#userPassword');
  }

  async goToLandingPage() {
    await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  }

  async validLogin(email, password) {
    await this.userEmail.fill(email);
    await this.userPassword.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { LoginPage };
