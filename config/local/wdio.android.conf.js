const { config } = require('./wdio.shared.conf');
const path = require('path');

// run cmd npx wdio config/wdio.android.conf.js to run all the android tests

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
// config.specs = [path.join(process.cwd(), './test/specs/android/*native.spec.js')];
// config.specs = [path.join(process.cwd(), './test/specs/android/*superpass.spec.js')];
config.specs = [
	path.join(process.cwd(), './test/specs/android/*superpass.spec.js'),
];

// ============
// Capabilities
// ============
config.capabilities = [
	{
		'appium:platformName': 'Android',
		'appium:platformVersion': '12',
		'appium:deviceName': 'Pixel 6',
		'appium:automationName': 'UIAutomator2',
		'appium:app': path.join(
			process.cwd(),
			// 'app/android/ColorNote Notepad.apk'
			// 'app/android/ApiDemos-debug.apk'
			'app/android/sp.apk'
		),
		'appium:autoGrantPermissions': true,
	},
];

// Test runner services run locally
// Services take over a specific job you don't want to take care of. They enhance
// your test setup with almost no effort. Unlike plugins, they don't add new
// commands. Instead, they hook themselves up into the test process.
// services: ['chromedriver','appium'],
config.services = ['appium'];

exports.config = config;
