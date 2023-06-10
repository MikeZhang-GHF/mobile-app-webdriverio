import LaunchScreen from '../../screenobject/android/launch.screen';
import LoginScreen from '../../screenobject/android/login.screen';
import HomeScreen from '../../screenobject/android/home.screen';
import SingupScreen from '../../screenobject/android/signup.screen';
import {
	getNearestStationAddress,
	deleteTestCard,
} from '../../../util/apiRequest';


describe('SuperPass App Android Test Template', () => {
	// Signup data for e2e testings
	const {
		cardNumber,
		userName,
		pinNumber,
		phoneNumber,
		password,
	} = require('../../test_data/signup.data.json');

	after(async () => {
		await deleteTestCard(cardNumber, pinNumber);
	});

	it('should show the nearest gas station', async () => {
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

	it('should signup', async () => {
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
	});

	it('should signout', async () => {
		await HomeScreen.signout();
		expect(await LaunchScreen.loginButton.waitForDisplayed()).toBe(true);
	});

	it('should login', async () => {
		// click login button
		await LaunchScreen.loginButton.click();
		await LoginScreen.login(cardNumber, password);
		// assert
		const welcomeText = await HomeScreen.greetingMessage.getText();
		expect(welcomeText).toContain('Good');
	});
});
