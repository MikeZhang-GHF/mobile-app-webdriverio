const { config } = require('./wdio.shared.conf');
const path = require('path');

// run cmd npx wdio config/wdio.ios.conf.js to run all the ios tests

//
// ====================
// Runner Configuration
// ====================
// WebdriverIO supports running e2e tests as well as unit and component tests.
config.port = 4723;

//
// ==================
// Specify Test Files
// ==================
config.specs = [path.join(process.cwd(), './test/specs/ios/*.js')];

// ============
// Capabilities
// ============
config.capabilities = [
	{
		'appium:platformName': 'ios',
		'appium:platformVersion': '14.5',
		'appium:deviceName': 'iPhone 13',
		'appium:automationName': 'XCUITest',
		'appium:app': path.join(process.cwd(), 'app/ios/MVCTodo.app'),
	},
];

// Test runner services run locally
// Services take over a specific job you don't want to take care of. They enhance
// your test setup with almost no effort. Unlike plugins, they don't add new
// commands. Instead, they hook themselves up into the test process.
// services: ['chromedriver','appium'],
config.services = ['appium'];

exports.config = config;
