import LaunchScreen from '../../screenobject/android/launch.screen';
import loginScreen from '../../screenobject/android/login.screen';
import HomeScreen from '../../screenobject/android/home.screen';
import SingupScreen from '../../screenobject/android/signup.screen';
import {
	getNearestStationAddress,
	deleteTestCard,
} from '../../../util/apiRequest';

describe('Superpass Test', () => {
	// Crendential data for e2e testing
	const cardNumber = '99354414030064';
	const userName = 'DevOpsTester';
	const pinNumber = '6666';
	const phoneNumber = '9786053340';
	const password = 'Test1234*';

	after(async () => {
		// Teardown the test data
		const response = await deleteTestCard(cardNumber, pinNumber);
		console.log(response.data);
	});

	it.skip('Geolocation Test - nearest stateion', async () => {
		// coordinate data
		const latitude = '51.05635397469224';
		const longitude = '-113.92802024655464';
		const altitude = '0';

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
		// signup process
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

	it.skip('Login Test', async () => {
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
