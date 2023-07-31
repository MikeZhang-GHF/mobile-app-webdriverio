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

describe("Bitbar Connection Test", () => {
	it("should connect to Bitbar", async () => {
		console.log("Connected to backend Appium Server");
		expect(1 + 2).toBe(3)
	});
});


describe.skip('SuperPass App iOS Geolocation Test', () => {
	before(async () => {
		// Allow location permission
		await $('//*[@text="Allow only while using the app"]').click();
	});

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
			'//*[@label="Nearest Station"]'
		).getText();

		// Assert address text tile shows up
		expect(addressTileText).toContain('Nearest Station');
		// Assert the gas station address
		const addressLineText = await $(
			'//*[@label=" 215 MONUMENT PLACE S.E., CALGARY"]'
		).getText();
		expect(addressLineText).toContain(expectedAddressLine.toUpperCase());
	});
});

describe.skip('SuperPass App iOS Auth Test', () => {
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
	after(async () => {
		// Remove the App
		await driver.removeApp('com.petrocanada.commercial-drivers.iOS');
		// Actions
		const response = await deleteTestCard(cardNumber, pinNumber);
		// Assert
		expect(response.status).toBe(200);
		// expect(response.result.cardNumber).toEqual(cardNumber);
	});

	it('should signup', async () => {
		// Actions
		await $('//*[@label="SIGN UP"]').click();
		await $('//*[@label="YES, I HAVE A CARD"]').click();
		await $(
			'//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]'
		).setValue(userName);

		// input card number and pin number
		await $(
			'//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeTextField[2]'
		).setValue(cardNumber);
		await $(
			'//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeTextField[3]'
		).setValue(pinNumber);
		await $('//*[@label="CONTINUE"]').click();
		// wait for the OTP and input the OTP
		await driver.pause(2000);
		await $('//XCUIElementTypeTextField').setValue(iosPhoneNumber);
		await $('//*[@label="CONTINUE"]').click();
		const timeForOTP = 7000;
		await driver.pause(timeForOTP);
		await $(
			'//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeStaticText[3]'
		).click();
		await $('//*[@label="suggestion"]').click();
		await $('//*[@label="CONTINUE"]').click();
		await driver.pause(2000);
		// input password and confirm password
		await $(
			'//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[1]'
		).setValue(password);
		await $(
			'//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[2]'
		).setValue(password);
		// submit the form and wait for the success message
		await $('//*[@label="CONTINUE"]').click();
		const maxRetry = 100;
		let successTextView = '';
		for (let i = 0; i < maxRetry; i++) {
			successTextView = await $(
				'//*[@label="Success! You\'re all set!"]'
			).getText();
			if (successTextView.includes('Success')) break;
			driver.pause(500);
		}
		// click continue button
		await $('//*[@label="CONTINUE"]').click();
		driver.pause(2000);

		// Assert the welcome screen
		expect(await $('//*[@label="Home"]').toBeDisplayed());
	});

	it.skip('should signout', async () => {
		// Actions
		await $('//*[@label="profile"]').click();
		await $('//*[@label="Sign out"]').click();
		await $('//XCUIElementTypeButton[@label="Sign out"]').click();

		// Assert
		expect(
			await $(
				'//*[@label="Welcome let\'s get you signed in!"]'
			).toBeDisplayed()
		);
	});

	it.skip('should login', async () => {
		// Actions
		await $('//*[@label="LOGIN"]').click();
		// Type in the username and password
		// await $(appID + 'cardInput"]').setValue(cardNumber);
		await $('//XCUIElementTypeSecureTextField').setValue(password);
		// click sign in buton
		await $('//*[@label="SIGN IN"]').click();
		driver.pause(2000);

		//Assert
		expect(await $('//*[@label="Home"]').toBeDisplayed());
	});
});
