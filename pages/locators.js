module.exports = {
  login: {
    usernameInput: 'input[name="username"]',
    passwordInput: 'input[name="password"]',
    loginButton: 'button[type="submit"]',
    errorMessage: '.oxd-alert-content-text',
    dashboardHeader: '.oxd-topbar-header-breadcrumb h6',
  },

  admin: {
    adminNavLink: { selector: '.oxd-main-menu-item', text: 'Admin' },
    addButton: { selector: 'button', text: 'Add' },
    searchButton: { selector: 'button[type="submit"]', text: 'Search' },
    usernameFilter: '.oxd-form .oxd-input',
    userRoleDropdown: '.oxd-select-text',
    statusDropdown: '.oxd-select-text',
    employeeNameInput: 'input[placeholder="Type for hints..."]',
    usernameInput: 'input.oxd-input',
    passwordInput: 'input[type="password"]',
    confirmPasswordInput: 'input[type="password"]',
    saveButton: { selector: 'button[type="submit"]', text: 'Save' },
    cancelButton: { selector: 'button', text: 'Cancel' },
    successToast: '.oxd-toast--success',
    errorToast: '.oxd-toast--error',
    validationErrors: '.oxd-input-field-error-message',
    tableRows: '.oxd-table-body .oxd-table-row',
    selectOption: '.oxd-select-dropdown .oxd-select-option',
    suggestionOption: '.oxd-autocomplete-option',
  },

  pim: {
    pimNavLink: { selector: '.oxd-main-menu-item', text: 'PIM' },
    addEmployeeButton: { selector: 'button', text: 'Add' },
    firstNameInput: 'input[placeholder="First Name"]',
    lastNameInput: 'input[placeholder="Last Name"]',
    saveButton: { selector: 'button[type="submit"]', text: 'Save' },
    employeeListHeader: { selector: 'h6', text: 'Employee Information' },
  },
};
