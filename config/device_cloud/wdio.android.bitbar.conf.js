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
		'./test/specs/android/android.keywords.superpass.spec.js'
	),
];

// ============
// Capabilities
// ============
config.capabilities = [
	{
		'appium:bitbar_apiKey': process.env.BITBAR_API_KEY,
		// 'bitbar:options': {
		// 	source: 'appiumdesktop',
		// 	apiKey: process.env.BITBAR_API_KEY,
		// },
		'appium:bitbar_device': 'Samsung Galaxy S20 SM-G981U1 12.0 -US',
		'appium:bitbar_app': '188649335',
		'appium:bitbar_project': 'SuperPass',
		'appium:bitbar_testrun': 'Login',
		'appium:platformName': 'Android',
		'appium:automationName': 'Appium',
		'appium:appPackage': 'com.petrocanada.commercial_drivers.android',
		'appium:autoGrantPermissions': true,
	},
];

exports.config = config;
