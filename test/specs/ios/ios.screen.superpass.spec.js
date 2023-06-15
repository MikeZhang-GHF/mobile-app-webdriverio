// Screen UI Objects
import LaunchScreen from '../../screenobject/ios/launch.screen';
import LoginScreen from '../../screenobject/ios/login.screen';
import HomeScreen from '../../screenobject/ios/home.screen';
import SingupScreen from '../../screenobject/ios/signup.screen';
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
	// Allow the location permission
	before(async () => {
		try {
			await LaunchScreen.allowLocationButton.click();
		} catch (error) {
			console.log('Location permission already allowed');
		}
	});

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
		expect(addressLineText).toContain(expectedAddressLine.toUpperCase());
	});
});

describe('SuperPass App Android Auth Test', () => {
	// Arrange the test data
	const { userName, cardNumber, pinNumber, phoneNumber, password } =
		loadSignupData('perfecto', 'ios');

	after(async () => {
		// Actions
		await driver.removeApp('com.petrocanada.commercial-drivers.iOS');
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
		const welcomeText = await HomeScreen.homeLabel.getText();
		expect(welcomeText).toContain('Home');
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
		const welcomeText = await HomeScreen.homeLabel.getText();
		expect(welcomeText).toContain('Home');
	});
});
