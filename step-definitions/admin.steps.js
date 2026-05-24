// step-definitions/admin.steps.js
const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const AdminPage = require('../pages/AdminPage');

function getRandomUsername() {
  return `user_${Math.random().toString(36).substring(2, 8)}`;
}

When('I navigate to the Admin section', async function () {
  this.adminPage = new AdminPage(this.page);
  await this.adminPage.navigateToAdmin();
  await expect(this.page).toHaveURL(/.*admin.*/);
});

When('I click on the {string} button', async function (buttonName) {
  this.adminPage = this.adminPage || new AdminPage(this.page);
  if (buttonName === 'Add') {
    await this.adminPage.clickAddUser();
    await expect(this.page).toHaveURL(/.*saveSystemUser.*/);
  }
});

When('I fill in the Add User form for the added employee', async function () {
  this.adminPage = this.adminPage || new AdminPage(this.page);
  if (!this.addedEmployeeName) {
    throw new Error('No random PIM employee name was saved. Ensure the PIM employee creation step ran first.');
  }

  const username = getRandomUsername();
  this.createdUsername = username;
  const password = process.env.NEW_USER_PASSWORD || 'Test@1234!';

  await this.adminPage.fillAddUserForm({
    role: 'Admin',
    employeeName: this.addedEmployeeName,
    status: 'Enabled',
    username,
    password,
  });
});

When('I fill in the Add User form with the following details:', async function (dataTable) {
  this.adminPage = this.adminPage || new AdminPage(this.page);

  // Convert Cucumber DataTable (key-value rows) to object
  const rows = dataTable.rows();   // [ ['Field','Value'], ['UserRole','Admin'], ... ]
  const formData = {};
  for (const [field, value] of rows) {
    if (field !== 'Field') {          // skip header if present
      formData[field] = value;
    }
  }

  const role         = formData['UserRole'] || formData['User Role'];
  const status       = formData['Status'];
  const username     = formData['Username'];
  const password     = formData['Password'];
  const employeeName = formData['EmployeeName'] || formData['Employee Name'];

  if (role) await this.adminPage.selectUserRole(role);
  if (employeeName) await this.adminPage.selectEmployeeName(employeeName);
  if (status) await this.adminPage.selectStatus(status);
  if (username) await this.adminPage.fillUsername(username);
  if (password) {
    await this.adminPage.fillPassword(password);
    await this.adminPage.fillConfirmPassword(password);
  }
});

When('I click the {string} button', async function (buttonName) {
  this.adminPage = this.adminPage || new AdminPage(this.page);
  if (buttonName === 'Save') {
    await this.adminPage.saveUser();
  } else if (buttonName === 'Cancel') {
    await this.adminPage.cancelAddUser();
  }
});

When('I click the {string} button without filling any fields', async function (buttonName) {
  this.adminPage = this.adminPage || new AdminPage(this.page);
  if (buttonName === 'Save') {
    await this.adminPage.saveUser();
  }
});

Then('I should see a success message', async function () {
  const isVisible = await this.adminPage.isSuccessToastVisible();
  expect(isVisible).toBe(true);
});

Then('I should see the newly created admin user in the user list', async function () {
  this.adminPage = this.adminPage || new AdminPage(this.page);
  await this.adminPage.searchUserByUsername(this.createdUsername);
  const rowCount = await this.adminPage.getUserCountInTable();
  expect(rowCount).toBeGreaterThan(0);
});

Then('I should see validation error messages for required fields', async function () {
  const errors = await this.adminPage.getValidationErrors();
  expect(errors.length).toBeGreaterThan(0);
  // OrangeHRM shows "Required" for empty fields
  errors.forEach(error => {
    expect(error).toMatch(/Required|required/);
  });
});

Then('I should be on the User Management list page', async function () {
  await expect(this.page).toHaveURL(/.*viewSystemUsers.*/);
});
