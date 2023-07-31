require('dotenv').config();
const { config } = require('./wdio.shared.perfecto.js');
const path = require('path');

//
// ==================
// Specify Test Files
// ==================
config.specs = [
	// path.join(process.cwd(), './test/specs/ios/ios.keywords.superpass.spec.js'),
	path.join(process.cwd(), './test/specs/ios/ios.screen.superpass.spec.js'),
];

// ============
// Capabilities
// ============
config.capabilities = [
	{
		platformName: 'iOS',
		'appium:deviceName': '00008110-00090CD90161801E',
		'appium:platformVersion': '15.1.1',
		'perfecto:iOSResign': true,
		'appium:app': 'PRIVATE:WholesaleSurpass.ipa',
		'appium:locationServicesEnabled': true,
		'appium:autoAcceptAlerts': true,
		'appium:autoGrantPermissions': true,
		'perfecto:securityToken': process.env.PERFECTO_SECURITY_TOKEN,
	},
];

exports.config = config;
