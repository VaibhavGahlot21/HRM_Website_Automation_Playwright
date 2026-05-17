# OrangeHRM Playwright BDD Cucumber Automation

End-to-end test automation for OrangeHRM using **Playwright + Cucumber BDD**.

---

## 📁 Project Structure

```
orangehrm-playwright-bdd/
├── features/
│   └── user_management.feature     # BDD scenarios (Gherkin)
├── step-definitions/
│   ├── login.steps.js              # Login step implementations
│   └── admin.steps.js              # Admin/User Management steps
├── pages/
│   ├── LoginPage.js                # Page Object: Login
│   └── AdminPage.js                # Page Object: Admin / Add User
├── support/
│   ├── world.js                    # Cucumber World (Playwright setup)
│   └── generateReport.js           # HTML report generator
├── reports/                        # Auto-generated test reports
├── .env                            # Environment variables (credentials, URL)
├── cucumber.js                     # Cucumber configuration
└── package.json
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
npm run install:browsers
```

### 2. Configure Environment

Edit `.env` to set credentials and base URL:

```env
BASE_URL=https://opensource-demo.orangehrmlive.com
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=admin123

NEW_USER_USERNAME=testuser_01
NEW_USER_PASSWORD=Test@1234!
```

### 3. Run Tests

```bash
# Run all tests (headless)
npm test

# Run with browser visible
npm run test:headed

# Run and generate HTML report
npm run test:report
```

### 4. Run Specific Tags

```bash
# Smoke tests only
npx cucumber-js --tags @smoke

# Regression suite
npx cucumber-js --tags @regression

# Add user scenario
npx cucumber-js --tags @addUser

# Negative tests
npx cucumber-js --tags @negative
```

---

## 🧪 Test Scenarios

| Tag | Scenario | Description |
|-----|----------|-------------|
| `@smoke @login` | Successful admin login | Verifies Admin can log in |
| `@smoke @addUser` | Add new Admin user | Full Add User form flow |
| `@regression @addUser` | Add users with different roles | Data-driven: Admin / ESS / Disabled |
| `@regression @validation` | Required field validation | Empty form submission |
| `@negative @login` | Invalid credentials | Wrong username/password |

---

## 🔧 Design Principles

### Page Object Model (POM)
Each page has its own class (`pages/`) encapsulating all locators and actions. Steps stay clean and readable.

### BDD with Gherkin
Scenarios are written in plain English under `features/`. Business stakeholders can read and contribute.

### Cucumber World
`support/world.js` bootstraps Playwright before every scenario and tears it down after. Screenshots are automatically captured on failure.

### Environment Variables
All sensitive data lives in `.env` — never hardcoded in tests.

---

## 📊 Reports

After `npm run test:report`, open:
```
reports/html/index.html
```

A rich HTML report is generated with pass/fail counts, scenario details, and screenshots for failures.

---

## ⚙️ Configuration Options

| Variable | Default | Description |
|----------|---------|-------------|
| `HEADLESS` | `true` | `false` to watch browser |
| `BROWSER` | `chromium` | `firefox` or `webkit` |
| `SLOW_MO` | `0` | Add delay (ms) between actions |

---

## 🏗️ Extending the Framework

**Add a new feature:**
1. Create `features/my_feature.feature`
2. Write Gherkin scenarios
3. Create `step-definitions/my_feature.steps.js`
4. Add page object in `pages/MyPage.js` if needed

**Add a new page object:**
```js
class MyPage {
  constructor(page) {
    this.page = page;
    this.someElement = page.locator('#my-selector');
  }
  async doSomething() { ... }
}
module.exports = MyPage;
```
