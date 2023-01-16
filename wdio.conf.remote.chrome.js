const merge = require('deepmerge');
const wdconfig = require('./wdio.conf.common');
const testData = require('./testData');

exports.config = merge(wdconfig.config, {
  //
  // =================================================
  // Remote Configuration - LambdaTest Capabilities
  // =================================================
  // Define your LambdaTest capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test sessions.
  // Refer to: https://www.lambdatest.com/capabilities-generator/ for capabilities help
  //
  user: process.env.LT_USERNAME,
  key: process.env.LT_ACCESS_KEY,
  path: '/wd/hub',
  hostname: 'hub.lambdatest.com',
  port: 80,

  services: [
    ['lambdatest', {
      tunnel: false,
    }],
  ],

  maxInstances: 24,

  // The number of times to retry the entire spec file when it fails as a whole
  specFileRetries: 1,

  // Delay in seconds between the spec file retry attempts
  specFileRetriesDelay: 5,

  // Whether or not retried spec files should be retried immediately or deferred to the end of the queue
  specFileRetriesDeferred: false,

  capabilities: [
    {
      build: testData.BUILD_ID,
      platformName: 'Windows 10',
      browserName: 'Chrome',
      browserVersion: 'latest',
      resolution: '2048x1536',
      console: true,
    },
  ],
  /**
     * Gets executed just before initialising the webdriver session and test framework.
     * It allows you to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
  beforeSession(config, capabilities, specs) {
    capabilities.name = (specs && specs[0].split('/').pop()) || undefined;
  },

  afterSession(config, capabilities, specs) {
    capabilities.name = (specs && specs[0].split('/').pop()) || undefined;
  },

  after(result, capabilities, specs) {
    driver.execute('lambda-status='.concat(result === 0 ? 'passed' : 'failed'), undefined);
  },

  /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
  beforeSuite(suite) {
    browser.maximizeWindow();
  },
});
