import Utilities from '../../common_utilities/utilities';

const assert = require('assert');
const utility = new Utilities();


function setReportingValues() {
  const params = {
    product: 'Product1',
    feature: '',
    isSmokeTest: 'TRUE',
    testType: 'E2E-UI',
  };
  utility.addReportingParameters(params);
}

describe(`Scenario1`, () => {
  before(() => {
    browser.url(baseUrl);
  });

  beforeEach(() => {
    setReportingValues();
  });

  it('1. Check that user CAN load Actions page', () => {
    utility.addTestSpecificParameters({ feature: 'Feature1' });
    // do testing
  });

  it('2. Check that user can create a new action', () => {
    utility.addTestSpecificParameters({ feature: 'Feature2' });
    // do testing
  });
});
