const fs = require('fs');
const path = require('path');
const reportportal = require('wdio-reportportal-reporter');
const allure = require('@wdio/allure-reporter');

const rpConf = JSON.parse(fs.readFileSync('./reportportal.config.json'));
rpConf.reportPortalClientConfig.launch = testData.BUILD_ID;
rpConf.reportPortalClientConfig.token = process.env.REPORTPORTAL_CI_ACCOUNT_TOKEN;
const allureReporter = allure.default;
import {LT_USER, LT_KEY} from './LT.user.key'

exports.config = {
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called.

  specs: [
    "./tests/specs/single_test.js",
    "./tests/specs/test2.js",
    "./tests/specs/test3.js",
  ],

  // The number of times to retry the entire specfile when it fails as a whole
  // specFileRetries: 1,

  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here

  //
  // Set specific log levels per logger
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevels: {
    browser: "warn",
    webdriver: "info",
    webdriverio: "info",
    "mocha-framework": "warn",
    "@wdio/local-runner": "warn",
    "@wdio/cli": "info",
    "browserstack-service": "warn",
  },
  outputDir: "./Logs",

  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,

  /**
   * Set a base URL in order to shorten url command calls.
   * If `url` parameter starts with `/`, the base url gets prepended, not including the path portion of your baseUrl.
   * If `url` parameter starts without a scheme or `/` (like `some/path`), the base url gets prepended directly.
   */

  baseUrl: testData.ENV_VALUES.URL,

  // Default timeout for all waitFor* commands.
  waitforTimeout: 10000,
  //
  // Default timeout in milliseconds for request
  // if Selenium Grid doesn't send response
  connectionRetryTimeout: 90000,
  //
  // Default request retries count
  connectionRetryCount: 3,

  // Framework you want to run your specs with.
  // Make sure you have the wdio adapter package for the specific framework installed before running any tests.
  framework: "mocha",
  // Options to be passed to Mocha. See the full list at http://mochajs.org/

  mochaOpts: {
    ui: "bdd",
    timeout: 600000,
    compilers: ["js:@babel/register"],
  },

  //----------------------------------------------
  // Test reporter that produce test results file
  //----------------------------------------------
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "./allure_test_results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
        disableMochaHooks: true,
      },
    ],
    [reportportal, rpConf],
  ],

  // Determine where to save screenshots when failure occurs in the step.
  screenshotPath: "./Screenshots/",

  /**
   * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   * @param {Object} test test details
   */
  beforeTest(test) {
    console.log(`STARTING: "${test.parent} - ${test.title}"`);
  },

  afterTest(test, context, result) {
    // if test passed, ignore, else take and save screenshot.
    if (result.passed) {
      console.log(`PASSED: "${test.parent} - ${test.title}"`);
    } else {
      const sessionId = browser.sessionId;
      console.log(`FAILED: "${test.parent} - ${test.title}"`);

      // Replace all the space with -.
      let title = test.title.replace(/\s+/g, "-");

      // Remove all special characters from the test title.
      title = title.replace(/[,'&]/g, "");

      // Prepare test title to be used as URI.
      title = encodeURIComponent(title);
      const browserName = browser.options.capabilities.browser;
      const timestamp = new Date().toJSON().replace(/:/g, "-");
      const filename = `${browserName}_${title}_${timestamp}.png`;
      const filePath = path.join(this.screenshotPath, filename);
      // save screenshot
      const screenshot = browser.saveScreenshot(filePath);
      console.error("\tSaved screenshot: ", filePath);
      reportportal.sendFileToTest(
        test,
        "info",
        filename,
        screenshot,
        "image/png"
      );

      // Only makes a call to the BrowserStack or LambdaTest when runner is not local.
      const testHostName = browser.options.hostname;
      let videoLink = "";

      // If tests are running on BrowserStack, then get the BrowserStack data.
      if (testHostName === "hub-cloud.browserstack.com") {
        videoLink = utility.GetBrowserStackSessionURL(sessionId, "videolink");

        // If tests are running on LambdaTest, then get the LambdaTest data.
      } else if (testHostName === "hub.lambdatest.com") {
        videoLink = utility.GetLambdaTestSessionData(sessionId, "videolink");
      } else {
        // If tests are running local, then don't do anything.
        console.log("-> tests running locally, no video link to retrieve");
      }
      allureReporter.addArgument("VideoLink", videoLink);
      reportportal.sendLogToTest(test, "info", `VideoLink: ${videoLink}`);
      allureReporter.addArgument("BS_SessionUrl", "");
    }
  },
};
