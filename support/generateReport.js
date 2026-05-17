// support/generateReport.js
const report = require('multiple-cucumber-html-reporter');
const path = require('path');

report.generate({
  jsonDir: path.join(__dirname, '..', 'reports'),
  reportPath: path.join(__dirname, '..', 'reports', 'html'),
  metadata: {
    browser: { name: 'chromium', version: 'latest' },
    device: 'Local Machine',
    platform: { name: 'Windows / Linux', version: '10' },
  },
  customData: {
    title: 'OrangeHRM Test Run Info',
    data: [
      { label: 'Project', value: 'OrangeHRM Automation' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Cycle', value: 'Regression' },
      { label: 'Execution Start Time', value: new Date().toLocaleString() },
    ],
  },
});
