import LaunchScreen from '../../screenobject/ios/launch.screen';
import LoginScreen from '../../screenobject/ios/login.screen';
import HomeScreen from '../../screenobject/ios/home.screen';
import SingupScreen from '../../screenobject/ios/signup.screen';
import {
	getNearestStationAddress,
	deleteTestCard,
} from '../../../util/apiRequest';

describe('SuperPass App Android Geolocation Test', () => {
	// Allow the location permission
	// before( async () => {
	// 	await LaunchScreen.allowLocationButton.click();
	// });

	it('should show the nearest gas station', async () => {
		// Arrange the test data
		const {
			nearestStation: { latitude, longitude, altitude },
		} = require('../../test_data/geolocation.data.json');

		// Actions
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
		expect(addressLineText).toContain(expectedAddressLine.toUpperCase());
	});
});

describe('SuperPass App Android Auth Test', () => {
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

	after(async () => {
		// Actions
		await driver.removeApp('com.petrocanada.commercial-drivers.iOS')
		const response = await deleteTestCard(cardNumber, pinNumber);
		// Assert
		expect(response.status).toBe(200);
		// expect(response.result.cardNumber).toEqual(cardNumber);
	});

	it('should signup', async () => {
		// Actions
		await LaunchScreen.signupButton.click();
		await SingupScreen.singup({
			userName,
			cardNumber,
			pinNumber,
			iosPhoneNumber,
			password,
		});

		// Assert the welcome screen
		const welcomeText = await HomeScreen.homeLabel.getText();
		expect(welcomeText).toContain('Home');
	});

	it.skip('should signout', async () => {
		// Actions
		await HomeScreen.signout();
		// Assert
		expect(await LaunchScreen.welcomeMessage.toBeDisplayed());
	});

	it.skip('should login', async () => {
		// Actions
		await LaunchScreen.loginButton.click();
		await LoginScreen.login(cardNumber, password);

		// Assert
		const welcomeText = await HomeScreen.homeLabel.getText();
		expect(welcomeText).toContain('Home');
	});
});
