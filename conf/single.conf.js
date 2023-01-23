const reportportal = require("wdio-reportportal-reporter");
const RpService = require("wdio-reportportal-service");
import {LT_USER, LT_KEY} from '../LT.user.key'
//import {LT_USERNAME,LT_ACCESS_KEY } from process


exports.config = {
  
  path: "/wd/hub",  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],

  maxInstances: 10,
    
  
  user: LT_USER,  //LambdaTest Username
  key: LT_KEY,  // Access Key
  specs: ["./tests/vr.js"], // vr.js spec file which has the test case

  commonCapabilities: {
    name: "Parallel Sample Test",
    build: "Visual Regression Build Parallel 1",
    "smartUI.project": "Wdio-Visual-a", // Visual regression project name
    "smartUI.build":"Build 2",
  },

  capabilities: [
    {
      platfrom: "Windows 10",
      browserName: "Chrome",
      version: "latest",
    },
    {
      platform: "Windows 10",
      browserName: "Firefox",
      version: "latest",
    },
    {
      platform: "Windows 10",
      browserName: "MicrosoftEdge",
      version: "latest",
    },
  ],


 
  logLevel: "info",
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  waitforTimeout: 100000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
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

exports.config.capabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities)
    caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
