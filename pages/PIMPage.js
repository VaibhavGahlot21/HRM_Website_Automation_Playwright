const locators = require('./locators');

class PIMPage {
  constructor(page) {
    this.page = page;

    this.pimNavLink = page.locator(locators.pim.pimNavLink.selector, { hasText: locators.pim.pimNavLink.text });
    this.addEmployeeButton = page.locator(locators.pim.addEmployeeButton.selector, { hasText: locators.pim.addEmployeeButton.text });
    this.firstNameInput = page.locator(locators.pim.firstNameInput);
    this.lastNameInput = page.locator(locators.pim.lastNameInput);
    this.saveButton = page.locator(locators.pim.saveButton.selector, { hasText: locators.pim.saveButton.text });
    this.employeeListHeader = page.locator(locators.pim.employeeListHeader.selector, { hasText: locators.pim.employeeListHeader.text });
  }

  async navigateToPIM() {
    await this.pimNavLink.click();
    await this.page.waitForURL('**/pim/**', { waitUntil: 'networkidle' });
  }

  async clickAddEmployee() {
    await this.addEmployeeButton.click();
    await this.page.waitForURL('**/pim/addEmployee', { waitUntil: 'domcontentloaded' });
  }

  async fillEmployeeName(firstName, lastName) {
    await this.firstNameInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
  }

  async saveEmployee() {
    await this.saveButton.waitFor({ state: 'visible', timeout: 15000 });
    await Promise.all([
      this.page.waitForNavigation({
        waitUntil: 'networkidle',
        timeout: 15000,
      }).catch(() => null),
      this.saveButton.click(),
    ]);
    await this.page.waitForLoadState('networkidle');
  }

  async isOnEmployeeListPage() {
    return this.page.url().includes('/pim/viewEmployeeList');
  }

  async isOnEmployeeDetailsPage() {
    return this.page.url().includes('/pim/viewPersonalDetails/');
  }

  async navigateToEmployeeList() {
    await this.pimNavLink.click();
    await this.page.waitForURL('**/pim/viewEmployeeList', { waitUntil: 'networkidle' });
  }
}

module.exports = PIMPage;
