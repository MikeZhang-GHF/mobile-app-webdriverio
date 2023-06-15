// Screen UI Objects
import LaunchScreen from '../../screenobject/android/launch.screen';
import LoginScreen from '../../screenobject/ios/login.screen';
import HomeScreen from '../../screenobject/android/home.screen';
import SingupScreen from '../../screenobject/android/signup.screen';
// Backend API Request Functions
import {
	getNearestStationAddress,
	deleteTestCard,
} from '../../../util/apiRequest';
// Load Test Data Functions
import {
	loadSignupData,
	loadNearestStationLocation,
} from '../../../util/loadData';

describe('SuperPass App Android Geolocation Test', () => {
	it('should show the nearest gas station', async () => {
		// Arrange the test data
		const { latitude, longitude, altitude } = loadNearestStationLocation();
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
		expect(addressLineText.toLowerCase()).toContain(expectedAddressLine);
	});
});

describe('SuperPass App Android Auth Test', () => {
	// Arrange the test data
	// Arrange the test data
	const { userName, cardNumber, pinNumber, phoneNumber, password } =
		loadSignupData('perfecto', 'android');

	after(async () => {
		// Actions
		await deleteTestCard(cardNumber, pinNumber);
	});

	it('should signup', async () => {
		// Actions
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
		// Actions
		await HomeScreen.signout();

		// Assert
		expect(await LaunchScreen.loginButton.isDisplayed()).toBe(true);
	});

	it('should login', async () => {
		// Actions
		await LaunchScreen.loginButton.click();
		await LoginScreen.login(cardNumber, password);

		// Assert
		const welcomeText = await HomeScreen.greetingMessage.getText();
		expect(welcomeText).toContain('Good');
	});
});
