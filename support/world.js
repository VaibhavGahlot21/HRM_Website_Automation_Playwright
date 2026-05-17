// support/world.js
const { setWorldConstructor, setDefaultTimeout, Before, After, BeforeAll, AfterAll, Status } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
require('dotenv').config();

setDefaultTimeout(60 * 1000);

class CustomWorld {
  constructor({ attach, parameters }) {
    this.attach = attach;
    this.parameters = parameters;
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async openBrowser() {
    const browserType = process.env.BROWSER || 'chromium';
    const headless = process.env.HEADLESS !== 'false';
    const slowMo = parseInt(process.env.SLOW_MO || '0');

    const browsers = { chromium, firefox, webkit };
    this.browser = await browsers[browserType].launch({ headless, slowMo });
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 800 },
      ignoreHTTPSErrors: true,
    });
    this.page = await this.context.newPage();
  }

  async closeBrowser() {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  await this.openBrowser();
});

After(async function (scenario) {
  // Take screenshot on failure
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  }
  await this.closeBrowser();
});
