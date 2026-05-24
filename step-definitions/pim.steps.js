const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PIMPage = require('../pages/PIMPage');

const firstNames = ['Aiden', 'Maya', 'Nina', 'Evan', 'Zoey', 'Liam', 'Emma', 'Noah', 'Ava'];
const lastNames = ['Baker', 'Chase', 'Diaz', 'Roth', 'Shaw', 'Kim', 'Lopez', 'Gray', 'Patel'];

function getRandomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

When('I navigate to the PIM section', async function () {
  this.pimPage = new PIMPage(this.page);
  await this.pimPage.navigateToPIM();
  await expect(this.page).toHaveURL(/.*pim.*/);
});

When('I click on the Add Employee button', async function () {
  this.pimPage = this.pimPage || new PIMPage(this.page);
  await this.pimPage.clickAddEmployee();
});

When('I add a random PIM employee', async function () {
  const firstName = getRandomItem(firstNames);
  const lastName = getRandomItem(lastNames);
  this.addedEmployeeName = `${firstName} ${lastName}`;
  this.addedEmployeeData = { firstName, lastName };

  await this.pimPage.fillEmployeeName(firstName, lastName);
  await this.pimPage.saveEmployee();
});

Then('I should be redirected to the PIM Employee List', async function () {
  const currentUrl = this.page.url();

  if (await this.pimPage.isOnEmployeeDetailsPage()) {
    await this.pimPage.navigateToEmployeeList();
  } else if (currentUrl.includes('/pim/addEmployee')) {
    // If save did not immediately redirect, retry navigating to the list.
    await this.pimPage.navigateToEmployeeList();
  }

  await expect(this.page).toHaveURL(/.*pim\/viewEmployeeList.*/);
  expect(await this.pimPage.isOnEmployeeListPage()).toBe(true);
});
