// step-definitions/login.steps.js
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
require('dotenv').config();

Given('I am on the OrangeHRM login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
  await expect(this.page).toHaveURL(/.*auth\/login.*/);
});

Given('I am logged in as admin', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
  await this.loginPage.login(
    process.env.ADMIN_USERNAME,
    process.env.ADMIN_PASSWORD
  );
  const onDashboard = await this.loginPage.isOnDashboard();
  expect(onDashboard).toBe(true);
});

When('I login with valid admin credentials', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.login(
    process.env.ADMIN_USERNAME,
    process.env.ADMIN_PASSWORD
  );
});

When('I login with username {string} and password {string}', async function (username, password) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.login(username, password);
});

Then('I should be redirected to the Dashboard', async function () {
  await this.page.waitForURL('**/dashboard/**', { timeout: 15000 });
  const isDashboard = await this.loginPage.isOnDashboard();
  expect(isDashboard).toBe(true);
});

Then('I should see an invalid credentials error', async function () {
  const errorMsg = await this.loginPage.getErrorMessage();
  expect(errorMsg).toContain('Invalid credentials');
});
