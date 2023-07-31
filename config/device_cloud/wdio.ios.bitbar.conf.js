require('dotenv').config();
const { config } = require('./wdio.shared.bitbar.js');
const path = require('path');


//
// ==================
// Specify Test Files
// ==================
config.specs = [path.join(process.cwd(), './test/specs/ios/ios.bitbar.connection.spec.js')];

// ============
// Capabilities
// ============
config.capabilities = [
	{
		'bitbar:options': {
			'apiKey': process.env.BITBAR_API_KEY,
			'device': 'Apple iPhone 13 Pro A2638 15.2.1 -SU',
			'app': '194699252',
			'project': 'SuperPass',
			'testrun': 'Login',
			'appiumVersion': '2.0',
		},
		'appium:platformName': 'iOS',
		'appium:automationName': 'XCUITest',
		'appium:autoGrantPermissions': true,
		'appium:autoAcceptAlerts': true,
	},
];


exports.config = config;
