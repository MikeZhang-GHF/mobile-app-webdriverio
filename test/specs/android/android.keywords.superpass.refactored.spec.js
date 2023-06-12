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

describe('SuperPass App Android Geolocation Test', () => {
	const appID =
		'//*[@resource-id="com.petrocanada.commercial_drivers.android:id/';

	it('should show the nearest gas station', async () => {
		// Arrange the test data
		const {
			nearestStation: { latitude, longitude, altitude },
		} = require('../../test_data/geolocation.data.json');

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
			'//*[@text="Nearest Station"]'
		).getText();

		// Assert address text tile shows up
		expect(addressTileText).toContain('Nearest Station');
		// Assert the gas station address
		const addressLineText = await $(appID + 'addressLine"]').getText();
		expect(addressLineText.toLowerCase()).toContain(
			expectedAddressLine.toLowerCase()
		);
	});
});

describe('SuperPass App Android Auth Test', () => {
	const appID =
		'//*[@resource-id="com.petrocanada.commercial_drivers.android:id/';
	// Arrange the test data
	const {
		cardNumber,
		userName,
		pinNumber,
		password,
	} = require('../../test_data/signup.data.json');
	const {
		perfecto: { androidPhoneNumber },
	} = require('../../test_data/phone.data.json');

	// Tear down the test data
	after(async () => {
		// Actions
		const response = await deleteTestCard(cardNumber, pinNumber);
		// Assert
		expect(response.status).toBe(200);
		// expect(response.result.cardNumber).toEqual(cardNumber);
	});

	it('should signup', async () => {
		// Actions
		await $(appID + 'signup"]').click();
		await $(appID + 'yesButton"]').click();
		await $(appID + 'nameInput"]').setValue(userName);
		// swipe up
		await swipe({ x: 0.5, y: 0.5 }, { x: 0.5, y: 0.1 });
		// input card number and pin number
		await $(appID + 'cardNumberInput"]').setValue(cardNumber);
		await $(appID + 'pinNumberInput"]').setValue(pinNumber);
		await $(appID + 'button"]').click();
		// wait for the OTP and input the OTP
		driver.pause(3000);
		await $(appID + 'phoneInput"]').setValue(androidPhoneNumber);
		await $(appID + 'button"]').click();
		const timeForOTP = 7000;
		await driver.pause(timeForOTP);
		const smsAppID = '//*[@resource-id="com.google.android.gms:id/';
		await $(smsAppID + 'positive_button"]').click();
		await $(appID + 'button"]').click();
		driver.pause(3000);
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

	it('should signout', async () => {
		// Actions
		await $('//*[@content-desc="Account"]').click();
		await $('//*[@text="Sign out"]').click();
		await $('//*[@text="SIGN OUT"]').click();

		// Assert
	});

	it('should login', async () => {
		// Actions
		await $(appID + 'login"]').click();
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
