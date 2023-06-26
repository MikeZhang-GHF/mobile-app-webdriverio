/**
 *  This is a basic keyword-driven test for SuperPass App, whichi is a starting point.
 *  A better structure and design will be demonstrated in *.refactored.spec.js.
 *  A best practice is to use Page Object Model (POM) to organize the test code, which is 
 *  demonstrated in *.screen.spec.js.
 */

import axios from 'axios';

describe('SuperPass App Android Geolocation Test', () => {
	const baseUrl = 'https://wma-dev.petro-canada.ca/backendapi';
	const appID =
		'//*[@resource-id="com.petrocanada.commercial_drivers.android:id/';

	it('should show the nearest gas station', async () => {
		// coordinate data
		const latitude = '51.05635397469224';
		const longitude = '-113.92802024655464';
		const altitude = '0';

		// mock the geolocation
		await driver.setGeoLocation({ latitude, longitude, altitude });

		// Call the geolocation service API and get the gas station info
		const {
			data: { result },
		} = await axios.get(
			`${baseUrl}/stations/locations/nearest?latitude=${latitude}&longitude=${longitude}`
		);
		const expectedAddressLine = result.location.addressLine;

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

describe.skip('SuperPass App Auth Test', () => {
	const baseUrl = 'https://wma-dev.petro-canada.ca/backendapi';
	const appID =
		'//*[@resource-id="com.petrocanada.commercial_drivers.android:id/';
	// Test data for e2e testing
	const cardNumber = '99354414030064';
	const username = 'DevOpsTester';
	const pinNumber = '6666';
	const phoneNumber = '9786053340';
	const password = 'Test1234*';

	after(async () => {
		// Teardown the test data
		const response = await axios.delete(
			`${baseUrl}/users/delete/${cardNumber}?pin=${pinNumber}`
		);
		console.log(response.data);
	});

	it.skip('should signup', async () => {
		// const permissionID = '//*[@resource-id="com.android.permissioncontroller:id/';
		// click signup button
		await $(appID + 'signup"]').click();
		await $(appID + 'yesButton"]').click();
		await $(appID + 'nameInput"]').setValue(username);
		// swipe up
		const { width, height } = await driver.getWindowSize();
		const start = { x: width * 0.5, y: height * 0.5 };
		const end = { x: width * 0.5, y: height * 0.1 };

		await driver.touchPerform([
			{ action: 'press', options: start },
			{ action: 'wait', options: { ms: 1000 } },
			{ action: 'moveTo', options: end },
			{ action: 'release' },
		]);

		// input card number and pin number
		await $(appID + 'cardNumberInput"]').setValue(cardNumber);
		await $(appID + 'pinNumberInput"]').setValue(pinNumber);
		await $(appID + 'button"]').click();

		// wait for the OTP and input the OTP
		driver.pause(3000);
		await $(appID + 'phoneInput"]').setValue(phoneNumber);
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

		// logout for the next test case
		await $('//*[@content-desc="Account"]').click();
		await $('//*[@text="Sign out"]').click();
		await $('//*[@text="SIGN OUT"]').click();
	});

	it.skip('should login', async () => {
		// click login button
		await $(appID + 'login"]').click();

		// Type in the username and password
		// await $(appID + 'cardInput"]').setValue(cardNumber);
		await $(appID + 'passwordInput"]').setValue(password);

		// click sign in buton
		await $(appID + 'login"]').click();
		driver.pause(2000);

		// assert
		const welcomeText = await $(appID + 'greeting"]').getText();
		console.log(welcomeText);
		expect(welcomeText).toContain('Good');

		// logout
		await $('//*[@content-desc="Account"]').click();
		await $('//*[@text="Sign out"]').click();
		await $('//*[@text="SIGN OUT"]').click();
	});
});
