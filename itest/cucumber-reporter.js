const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonDir: 'cypress/reports',
  output: 'cypress/reports/hfhs.cucumber.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
};

reporter.generate(options);
