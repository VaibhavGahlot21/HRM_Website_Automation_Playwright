# HRM Website Automation — Playwright + Cucumber BDD

End-to-end tests for the OrangeHRM demo site using Playwright with Cucumber (Gherkin) step definitions.

---

## 📁 Project structure (key files)

```
HRM_Website_Automation/
├── features/
│   └── login.feature
├── step-definitions/
│   ├── login.steps.js
│   ├── admin.steps.js
│   └── pim.steps.js
├── pages/
│   ├── LoginPage.js
│   ├── AdminPage.js
│   └── PIMPage.js
├── support/
│   ├── world.js
│   └── generateReport.js
├── reports/
│   ├── cucumber-report.html
│   └── cucumber-report.json
├── cucumber.js
└── package.json
```

Refer to the implementation files directly:

- Feature example: [features/login.feature](features/login.feature)
- Login steps: [step-definitions/login.steps.js](step-definitions/login.steps.js)
- Page object: [pages/LoginPage.js](pages/LoginPage.js)
- World (Playwright setup): [support/world.js](support/world.js)
- Report generator: [support/generateReport.js](support/generateReport.js)
- Cucumber config: [cucumber.js](cucumber.js)
- Package manifest: [package.json](package.json)
- Reports: [reports/cucumber-report.html](reports/cucumber-report.html) and [reports/cucumber-report.json](reports/cucumber-report.json)

---

## 🚀 Quick start

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers (if your project needs them):

```bash
npx playwright install
```

3. Run tests:

```bash
# Run all scenarios (headless)
npm test

# Run a specific feature file
npx cucumber-js features/login.feature

# Run scenarios with tags
npx cucumber-js --tags @smoke
```

If your repository defines npm scripts for headed runs or reporting, you can also run them via `npm run <script>`; see [package.json](package.json) for available scripts.

---

## 🧪 Mapping tests to code

- The `login.feature` scenarios are implemented in [step-definitions/login.steps.js](step-definitions/login.steps.js) and use the `LoginPage` page object: [pages/LoginPage.js](pages/LoginPage.js).
- Admin-related scenarios use [step-definitions/admin.steps.js](step-definitions/admin.steps.js) and [pages/AdminPage.js](pages/AdminPage.js).
- PIM scenarios use [step-definitions/pim.steps.js](step-definitions/pim.steps.js) and [pages/PIMPage.js](pages/PIMPage.js).

---

## 📊 Reports

After running tests the framework writes JSON/HTML reports to the `reports/` folder. Open the HTML report locally:

```bash
start reports/cucumber-report.html
```

---

## 🔧 Contributing / Extending

To add a new feature:
1. Add `features/your_feature.feature` with Gherkin scenarios.
2. Implement steps in `step-definitions/your_feature.steps.js`.
3. Add or reuse page objects in `pages/`.

Page object example:

```js
class MyPage {
  constructor(page) {
    this.page = page;
    this.someElement = page.locator('#my-selector');
  }
  async doSomething() {
    await this.someElement.click();
  }
}
module.exports = MyPage;
```

---

If you'd like, I can also:

- Add a short `CONTRIBUTING.md` with run instructions.
- Inspect `package.json` and add or standardize npm scripts for common runs.

---

