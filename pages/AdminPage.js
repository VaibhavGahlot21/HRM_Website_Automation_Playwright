// pages/AdminPage.js
class AdminPage {
  constructor(page) {
    this.page = page;

    // Navigation
    this.adminNavLink     = page.locator('.oxd-main-menu-item', { hasText: 'Admin' });

    // User Management Table
    this.addButton        = page.locator('button', { hasText: 'Add' });
    this.searchButton     = page.locator('button[type="submit"]', { hasText: 'Search' });
    this.usernameFilter   = page.locator('.oxd-form .oxd-input').first();

    // Add User Form
    this.userRoleDropdown     = page.locator('.oxd-select-text').nth(0);
    this.statusDropdown       = page.locator('.oxd-select-text').nth(1);
    this.employeeNameInput    = page.locator('input[placeholder="Type for hints..."]');
    this.usernameInput        = page.locator('input.oxd-input').nth(1);
    this.passwordInput        = page.locator('input[type="password"]').nth(0);
    this.confirmPasswordInput = page.locator('input[type="password"]').nth(1);

    // Buttons
    this.saveButton           = page.locator('button[type="submit"]', { hasText: 'Save' });
    this.cancelButton         = page.locator('button', { hasText: 'Cancel' });

    // Success / Error
    this.successToast         = page.locator('.oxd-toast--success');
    this.errorToast           = page.locator('.oxd-toast--error');
    this.validationErrors     = page.locator('.oxd-input-field-error-message');

    // Table rows
    this.tableRows            = page.locator('.oxd-table-body .oxd-table-row');
  }

  /* ── Navigation ─────────────────────────────────── */

  async navigateToAdmin() {
    await this.adminNavLink.click();
    await this.page.waitForURL('**/admin/**', { waitUntil: 'networkidle' });
  }

  async clickAddUser() {
    await this.addButton.click();
    await this.page.waitForURL('**/saveSystemUser', { waitUntil: 'domcontentloaded' });
  }

  /* ── Form Helpers ────────────────────────────────── */

  async selectDropdownOption(dropdown, optionText) {
    await dropdown.click();
    const option = this.page.locator('.oxd-select-dropdown .oxd-select-option', {
      hasText: optionText,
    });
    await option.waitFor({ state: 'visible' });
    await option.click();
  }

  async selectUserRole(role) {
    await this.selectDropdownOption(this.userRoleDropdown, role);
  }

  async selectStatus(status) {
    await this.selectDropdownOption(this.statusDropdown, status);
  }

  async selectEmployeeName(employeeName) {
    await this.employeeNameInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.employeeNameInput.fill(employeeName);
    // Wait for autocomplete suggestions
    const suggestion = this.page.locator('.oxd-autocomplete-option', {
      hasText: employeeName,
    });
    await suggestion.waitFor({ state: 'visible', timeout: 10000 });
    await suggestion.first().click();
  }

  async fillUsername(username) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async fillConfirmPassword(confirmPassword) {
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async fillAddUserForm({ role, employeeName, status, username, password }) {
    await this.selectUserRole(role);
    if (employeeName) {
      await this.selectEmployeeName(employeeName);
    }
    await this.selectStatus(status);
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.fillConfirmPassword(password);
  }

  async saveUser() {
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async cancelAddUser() {
    await this.cancelButton.click();
  }

  /* ── Assertions ──────────────────────────────────── */

  async isSuccessToastVisible() {
    await this.successToast.waitFor({ state: 'visible', timeout: 8000 });
    return this.successToast.isVisible();
  }

  async getSuccessMessage() {
    await this.successToast.waitFor({ state: 'visible', timeout: 8000 });
    return this.successToast.textContent();
  }

  async getValidationErrors() {
    return this.validationErrors.allTextContents();
  }

  async searchUserByUsername(username) {
    await this.usernameFilter.fill(username);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getUserCountInTable() {
    return this.tableRows.count();
  }
}

module.exports = AdminPage;
