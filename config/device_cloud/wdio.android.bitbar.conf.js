require('dotenv').config();
const { config } = require('./wdio.shared.bitbar.js');
const path = require('path');

//
// ==================
// Specify Test Files
// ==================
config.specs = [
	path.join(
		process.cwd(),
		'./test/specs/android/android.bitbar.connection.spec.js'
	),
];

// ============
// Capabilities
// ============
config.capabilities = [
	{
		'bitbar:options': {
			'apiKey': process.env.BITBAR_API_KEY,
			'device': 'Google Pixel 6 Android 13 -US',
			'appiumVersion': '2.0',
		},
		'appium:bitbar_app': '188649335',
		'appium:bitbar_project': 'SuperPass',
		'appium:bitbar_testrun': 'Login',
		'appium:platformName': 'Android',
		'appium:automationName': 'UiAutomator2',
		'appium:appPackage': 'com.petrocanada.commercial_drivers.android',
		'appium:autoGrantPermissions': true,
	},
];

exports.config = config;
