/**
 * Refactored Superpass Test
 * 1. Extracted the test data from the test case
 * 2. Extracted the request to the backend API to util functions
 * 3. Extracted the gesture to util gesture functions
 *
 * - Ultimate refactoring, the test case is more readable and maintainable. We will decouple the UI elements
 *   from the equation. We will get the Then we will get the *.screen.*.spec.js POM design pattern.
 * 4. If we extract the UI Elements to a screen(page) object, we can reuse the page object in other test cases.
 *    We will apply the best practice design pattern POM(page object model).
 */

import {
	getNearestStationAddress,
	deleteTestCard,
} from '../../../util/apiRequest';
import { swipe } from '../../../util/gesture';

describe('SuperPass App iOS Geolocation Test', () => {
	it('should show the nearest gas station', async () => {
		// Arrange the test data
		const {
			nearestStation: { latitude, longitude, altitude },
		} = require('../../test_data/geolocation.data.json');
    
		await $('//*[@label="Allow While Using App"]').click();
		// Actions
		// mock the geolocation
		await driver.setGeoLocation({ latitude, longitude, altitude });
		// Call the geolocation service API and get the gas station info
		const expectedAddressLine = await getNearestStationAddress(
			latitude,
			longitude
		);
		// Get the nearest gas station info from the app
		const addressTileText = await $(
			'//*[@label="Nearest Station"]'
		).getText();

		// Assert address text tile shows up
		expect(addressTileText).toContain('Nearest Station');
		// Assert the gas station address
		const addressLineText = await $('//*[@label=" 215 MONUMENT PLACE S.E., CALGARY"]').getText();
		expect(addressLineText).toContain(expectedAddressLine.toUpperCase());
	});
});

describe('SuperPass App iOS Auth Test', () => {
	// Arrange the test data
	const {
		cardNumber,
		userName,
		pinNumber,
		password,
	} = require('../../test_data/signup.data.json');
	const {
		perfecto: { iosPhoneNumber },
	} = require('../../test_data/phone.data.json');

	// Tear down the test data
	// after(async () => {
	// 	// Actions
	// 	const response = await deleteTestCard(cardNumber, pinNumber);
	// 	// Assert
	// 	expect(response.status).toBe(200);
	// 	// expect(response.result.cardNumber).toEqual(cardNumber);
	// });

	it('should signup', async () => {
		// Actions
		await $('//*[@label="SIGN UP"]').click();
		await $('//*[@label="YES, I HAVE A CARD"]').click();
		await $('//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]').setValue(userName);

		// input card number and pin number
		await $('//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeTextField[2]').setValue(cardNumber);
		await $('//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeTextField[3]').setValue(pinNumber);
		await $('//*[@label="CONTINUE"]').click();
		// wait for the OTP and input the OTP
		await driver.pause(2000);
		await $('//XCUIElementTypeTextField').setValue(iosPhoneNumber);
		await $('//*[@label="CONTINUE"]').click();
		const timeForOTP = 7000;
		await driver.pause(timeForOTP);
		await $('//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeStaticText[3]').click();
		await $('//*[@label="suggestion"]').click();
		await $('//*[@label="CONTINUE"]').click();
		await driver.pause(2000);
		// input password and confirm password
		await $(appID + 'passwordInput"]').setValue(password);
		await $(appID + 'confirmInput"]').setValue(password);
		// submit the form and wait for the success message
		const maxRetry = 100;
		let successTextView = '';
		for (let i = 0; i < maxRetry; i++) {
			await $(appID + 'button"]').click();
			successTextView = await $(appID + 'title"]').getText();
			if (successTextView.includes('Success')) break;
			driver.pause(500);
		}
		// click continue button
		await $(appID + 'button"]').click();
		driver.pause(3000);

		// Assert the welcome screen
		const welcomeText = await $(appID + 'greeting"]').getText();
		expect(welcomeText).toContain('Good');
	});

	it.skip('should signout', async () => {
		// Actions
		await $('//*[@content-desc="Account"]').click();
		await $('//*[@text="Sign out"]').click();
		await $('//*[@text="SIGN OUT"]').click();

		// Assert
	});

	it.skip('should login', async () => {
		// Actions
		await $('//*[@label="LOGIN"]').click();
		// Type in the username and password
		// await $(appID + 'cardInput"]').setValue(cardNumber);
		await $(appID + 'passwordInput"]').setValue(password);
		// click sign in buton
		await $(appID + 'login"]').click();
		driver.pause(2000);

		//Assert
		const welcomeText = await $(appID + 'greeting"]').getText();
		console.log(welcomeText);
		expect(welcomeText).toContain('Good');
	});
});
