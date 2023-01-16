const { execSync } = require('child_process');
const rp = require('request-promise');
const allure = require('@wdio/allure-reporter');
const rportal = require('wdio-reportportal-reporter');

const allureReporter = allure.default;

class Utilities {
  /**
   * Common attributes of the test scenario to produce test report.
   */
  addReportingParameters(params) {
    const CINumber = process.env.CI_BUILD_NUMBER || 'AdHoc';
    const browserVersion = browser.capabilities.browserName.toLowerCase() === 'chrome'
      ? browser.capabilities.browserVersion
      : browser.capabilities.browserVersion;

    rportal.addAttribute({ key: 'Product', value: params.product });
    rportal.addAttribute({ key: 'IsSmokeTest', value: params.isSmokeTest });
    rportal.addAttribute({ key: 'Type', value: params.testType });
    if (params.feature.length > 0) {
      rportal.addAttribute({ key: 'Feature', value: params.feature });
    }

    rportal.addAttribute({ key: 'Platform', value: 'Web Application' });
    rportal.addAttribute({ key: 'Test_SessionID', value: browser.sessionId });
    rportal.addAttribute({ key: 'CINumber', value: CINumber });
    rportal.addAttribute({ key: 'Browser', value: browser.capabilities.browserName });
    rportal.addAttribute({ key: 'BrowserVersion', value: browserVersion });

    allureReporter.addFeature(params.feature);
    allureReporter.addLabel('Product', params.product);
    allureReporter.addArgument('Test_SessionID', browser.sessionId);
    allureReporter.addArgument('CINumber', CINumber);
    allureReporter.addEnvironment('Browser', browser.capabilities.browserName);
    allureReporter.addEnvironment('Browser Version', browserVersion);
    allureReporter.addEnvironment('OS', browser.capabilities.os);
    allureReporter.addEnvironment('Platform', 'Web Application');
  }
}
module.exports = Utilities;
