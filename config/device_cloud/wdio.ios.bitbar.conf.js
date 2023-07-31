require('dotenv').config();
const { config } = require('./wdio.shared.perfecto.js');
const path = require('path');


//
// ==================
// Specify Test Files
// ==================
config.specs = [path.join(process.cwd(), './test/specs/ios/*superpass.spec.js')];

// ============
// Capabilities
// ============
config.capabilities = [
	{
		'bitbar:options': {
			'apiKey': process.env.BITBAR_API_KEY,
			'device': 'Apple iPhone 13 Pro A2638 15.2.1 -SU',
			'appiumVersion': '2.0',
		},
		'platformName': 'iOS',
		'appium:bitbar_app': '188649335',
		'appium:autoGrantPermissions': true,
		'appium:autoAcceptAlerts': true,
	},
];


exports.config = config;
