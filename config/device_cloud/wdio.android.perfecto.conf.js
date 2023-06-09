require('dotenv').config();
const { config } = require('./wdio.shared.perfecto.js');
const path = require('path');

//
// ==================
// Specify Test Files
// ==================
config.specs = [
	path.join(process.cwd(), './test/specs/android/*.screen.superpass.spec.js'),
];

// ============
// Capabilities
// ============
config.capabilities = [
	{
		platformName: 'Android',
		'appium:deviceName': 'R3CT106TGKH',
		'appium:app': 'PRIVATE:sp-3.apk',
		'appium:appPackage': 'com.petrocanada.commercial_drivers.android',
		'appium:autoGrantPermissions': true,
		'perfecto:securityToken': process.env.PERFECTO_SECURITY_TOKEN,
	},
];

exports.config = config;
