// support/world.js
const { setWorldConstructor, setDefaultTimeout, Before, After, BeforeAll, Status } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const VIDEO_DIR = path.resolve(process.cwd(), 'videos');
setDefaultTimeout(60 * 1000);

async function ensureVideoDirectory() {
  if (!fs.existsSync(VIDEO_DIR)) {
    fs.mkdirSync(VIDEO_DIR, { recursive: true });
  }
}

async function cleanOldRecordings() {
  if (!fs.existsSync(VIDEO_DIR)) {
    return;
  }

  const oldFiles = await fs.promises.readdir(VIDEO_DIR);
  await Promise.all(
    oldFiles.map(file => fs.promises.unlink(path.join(VIDEO_DIR, file)))
  );
}

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

    await ensureVideoDirectory();

    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 800 },
      ignoreHTTPSErrors: true,
      recordVideo: {
        dir: VIDEO_DIR,
        size: { width: 1280, height: 720 },
      },
    });

    this.page = await this.context.newPage();
  }

  async closeBrowser() {
    if (this.page) {
      await this.page.close();
    }
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);

BeforeAll(async function () {
  await cleanOldRecordings();
});

Before(async function () {
  await this.openBrowser();
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');

    const video = this.page.video();
    if (video) {
      const videoPath = await video.path();
      const videoContent = await fs.promises.readFile(videoPath);
      await this.attach(videoContent, 'video/webm');
    }
  }

  await this.closeBrowser();
});
