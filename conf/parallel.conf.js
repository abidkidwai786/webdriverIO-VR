exports.config = {
  services: [
    [
      "lambdatest",
      {
        tunnel: false,
        lambdatestOpts: {
          logFile: "tunnel.log",
        },
      },
    ],
  ],
  user: process.env.LT_USERNAME,
  key: process.env.LT_ACCESS_KEY,
  specs: ["./tests/vr.js"],
  exclude: [],

  maxInstances: 10,
  commonCapabilities: {
    name: "Parallel Sample Test",
    build: "Visual Regression Build 10",
    "smartUI.project": "Wdio-Visual-demo1", // Visual regression project name
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
      browserName: "Internet Explorer",
      version: "latest",
    },
  ],

  logLevel: "info",
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  path: "/wd/hub",
  hostname: "beta-smartui-hub.lambdatest.com",
  port: 80,
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 99999999
  },
  reporterSyncInterval: 1000,
};

// Code to support common capabilities
exports.config.capabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities)
    caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
