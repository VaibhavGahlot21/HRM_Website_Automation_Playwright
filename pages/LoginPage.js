// pages/LoginPage.js
const locators = require('./locators');

class LoginPage {
  constructor(page) {
    this.page = page;
    // Locators
    this.usernameInput   = page.locator(locators.login.usernameInput);
    this.passwordInput   = page.locator(locators.login.passwordInput);
    this.loginButton     = page.locator(locators.login.loginButton);
    this.errorMessage    = page.locator(locators.login.errorMessage);
    this.dashboardHeader = page.locator(locators.login.dashboardHeader);
  }

  async navigate() {
    await this.page.goto(
      `${process.env.BASE_URL}/web/index.php/auth/login`,
      { waitUntil: 'domcontentloaded' }
    );
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    // Wait for navigation
    await this.page.waitForLoadState('networkidle');
  }

  async getErrorMessage() {
    await this.errorMessage.waitFor({ state: 'visible' });
    return this.errorMessage.textContent();
  }

  async isOnDashboard() {
    return this.page.url().includes('/dashboard');
  }
}

module.exports = LoginPage;
