const reportportal = require("wdio-reportportal-reporter");
const RpService = require("wdio-reportportal-service");
import {LT_USER, LT_KEY} from '../LT.user.key'
//import {LT_USERNAME,LT_ACCESS_KEY } from process






exports.config = {
  
  path: "/wd/hub",  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],

  maxInstances: 1,
    
  
  user: LT_USER,  //LambdaTest Username
  key: LT_KEY,  // Access Key
  specs: ["./tests/vr.js"], // vr.js spec file which has the test case
  buildName: "Webdriver  IO 3",
  capabilities: [
    
    {
      "LT:Options": {
        browserName: "Chrome",
        version: "latest",
        username:LT_USER,
        accessKey:LT_KEY,
        name: "Test WebdriverIO Single",
        build: "WebDriver VR",

        "smartUI.project": "Wdio-Visual-Test", // Visual regression project name
        "smartUI.build":"build1",
      },
    },
  ],
 
  logLevel: "info",
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  waitforTimeout: 100000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 1,
  path: "/wd/hub",
  hostname: "smartui-hub.lambdatest.com",
  port: 80,

  onWorkerStart: function (cid, caps, specs, args, execArgv) {},

  // reporters: [[Reporter, rpConfig]],
  services: [[RpService, {}]],
  //reporters: [[reportportal]],

  
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 99999999
  },

  reporterSyncInterval: 1000,
};
