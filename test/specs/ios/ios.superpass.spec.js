import axios from 'axios';

describe('Superpass Test', () => {
	
	it('Singup Test', async () => {
		const cardNumber = '99354414030064';
		const username = 'DevOpsTester';
		const pinNumber = '6666';
		const phoneNumber = '3399997480';
		const password = 'Test1234*';
		
		// bring up the location permission popup
		// await $('//*[@label="Carousel1"]').click();
		// allow location permission
		driver.pause(5000);
		await $('//*[@label="Allow While Using App"]').click();
		// click signup button
		await $('//*[@label="SIGN UP"]').click();
		await $('//*[@label="YES, I HAVE A CARD"]').click();
		// input username
		await $('//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]').setValue(username);
		// input card number
		await $('//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeTextField[2]').setValue(cardNumber);
		// input pin number
		await $('//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeTextField[3]').setValue(pinNumber);
		// Click continue button
		await $('//*[@label="CONTINUE"]').click();
		// wait for the process
		const timeForProcess = 3000;
		await driver.pause(timeForProcess);
		// input phone number
		await $('//XCUIElementTypeTextField').setValue(phoneNumber);
		await $('//*[@label="CONTINUE"]').click();
		// wait for the OTP
		const timeForOTP = 7000;
		await driver.pause(timeForOTP);
		// autofill the OTP
		// click the keyboard to let the OTP show up
		await $('//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeStaticText[3]').click();
		// click the OTP and autofill it
		await $('//*[@label="suggestion"]').click();
		// click continue button
		await $('//*[@label="CONTINUE"]').click();
		// wait for the process of OTP confirmation
		await driver.pause(timeForProcess);
		// input password
		await $('//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[1]').setValue(password);
		// click done button in order to hide the keyboard and easy
		await $('//*[@label="Done"]').click();
		// input confirm password
		await $('//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[2]').setValue(password);
		// click continue button
		await $('//*[@label="CONTINUE"]').click();
		// wait for the process of signup at backend
		await driver.pause(6000);
		await $('//*[@label="CONTINUE"]').click();

		// assert
		// const welcomeText = await $(appID + 'greeting"]').getText();
		// console.log(welcomeText);
		// expect(welcomeText).toContain('Good');
		// logout
		await $('//*[@label="profile"]').click();
		await $('//*[@label="Sign out"]').click();
		// await $('//XCUIElementTypeButton[@label="Sign out"]').click();
		// teardown the test, delete the user registered with the phone number
		const response = await axios.delete('https://wma-dev.petro-canada.ca/backendapi/users/delete/99354414030064?pin=6666');
		console.log(response.data);
	});


	it.skip('Login Test', async () => {
		// click login button
		await $('//*[@text="LOGIN"]').click();
		// input username
		// const username = '99354414030064';
		// await $(
		// 	'//*[@resource-id="com.petrocanada.commercial_drivers.android:id/cardInput"]'
		// ).setValue(username);
		// input password
		// const password = 'Test1234*';
		// await $(
		// 	'//*[@resource-id="com.petrocanada.commercial_drivers.android:id/passwordInput"]'
		// ).setValue(password);

		// // click sign in buton
		// await $('//*[@text="SIGN IN"]').click();
		// // assert
		// const appID = '//*[@resource-id="com.petrocanada.commercial_drivers.';
		// const welcomeText = await $(appID + 'greeting"]').getText();
		// console.log(welcomeText);
		// expect(welcomeText).toContain('Good');
		
		// // logout
		// // click Account button
		// await $('//*[@content-desc="Account"]').click();
		// // click logout button
		// await $('//*[@text="Sign out"]').click();
		// // click confirm button
		// await $('//*[@text="SIGN OUT"]').click();
	});
});
