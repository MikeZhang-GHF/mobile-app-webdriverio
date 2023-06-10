import LaunchScreen from '../../screenobject/android/launch.screen';
import loginScreen from '../../screenobject/android/login.screen';
import HomeScreen from '../../screenobject/android/home.screen';
import SingupScreen from '../../screenobject/android/signup.screen';
import {
	getNearestStationAddress,
	deleteTestCard,
} from '../../../util/apiRequest';

describe('Superpass Test', () => {
	// Signup data for e2e testings
	const {
		cardNumber,
		userName,
		pinNumber,
		phoneNumber,
		password,
	} = require('../../test_data/signup.data.json');

	after(async () => {
		// Teardown the test data
		const response = await deleteTestCard(cardNumber, pinNumber);
		console.log(response.data);
	});

	it.skip('Geolocation Test - nearest stateion', async () => {
		// read geo location data from the file
		const {
			latitude,
			longitude,
			altitude,
		} = require('../../test_data/geolocation.data.json');

		// mock the geolocation
		await LaunchScreen.setGeoLocation({ latitude, longitude, altitude });
		// Call the geolocation service API and get the gas station info
		const expectedAddressLine = await getNearestStationAddress(
			latitude,
			longitude
		);
		// Get the nearest gas station info from the app
		const addressTileText = await LaunchScreen.locationTitleText.getText();
		// Assert address text tile shows up
		expect(addressTileText).toContain('Nearest Station');
		// Assert the gas station address
		const addressLineText = await LaunchScreen.addressLineText.getText();
		expect(addressLineText.toLowerCase()).toContain(expectedAddressLine);
	});

	it('Singup Test', async () => {
		// click signup button
		await LaunchScreen.signupButton.click();
		await SingupScreen.singup({
			userName,
			cardNumber,
			pinNumber,
			phoneNumber,
			password,
		});

		// Assert the welcome screen
		const welcomeText = await HomeScreen.greetingMessage.getText();
		expect(welcomeText).toContain('Good');
		// logout for the next test case
		HomeScreen.signout();
	});

	it('Login Test', async () => {
		// click login button
		await LaunchScreen.loginButton.click();
		loginScreen.login(cardNumber, pinNumber);
		// wait for the login process
		driver.pause(2000);

		// assert
		const welcomeText = await HomeScreen.greetingMessage.getText();
		console.log(welcomeText);
		expect(welcomeText).toContain('Good');
		// logout
		await HomeScreen.signout();
	});
});
