import { swipe } from '../../util/gesture';

class SingupScreen {
	appID = '//*[@resource-id="com.petrocanada.commercial_drivers.android:id/';
	smsAppID = '//*[@resource-id="com.google.android.gms:id/';

	get iHaveCardButton() {
		return $(this.appID + 'yesButton"]');
	}

	get cardNumberInput() {
		return $(this.appID + 'cardNumberInput"]');
	}

	get pinNumberInput() {
		return $(this.appID + 'pinNumberInput"]');
	}

	get phoneInput() {
		return $(this.appID + 'phoneInput"]');
	}

	get confirmButton() {
		return $(this.appID + 'button"]');
	}

	get allowOTPButton() {
		return $(this.smsAppID + 'positive_button"]');
	}

	get addressLineText() {
		return $(this.appID + 'addressLine"]');
	}

	get passwordInput() {
		return $(this.appID + 'passwordInput"]');
	}

	get confirmInput() {
		return $(this.appID + 'confirmInput"]');
	}

	get successTitle() {
		return $(this.appID + 'title"]');
	}

	async singup({ userName, cardNumber, pinNumber, phoneNumber, password }) {
		await this.iHaveCardButton.click();
    await this.nameInput.setValue(userName);
    // swipe up to show the card number input
    await swipe({ direction: 'up', start: {x: 0.5, y: 0.5}, end: {x: 0.5, y: 0.1}, speed: 1000 });
		await this.cardNumberInput.setValue(cardNumber);
		await this.pinNumberInput.setValue(pinNumber);
		await this.confirmButton.click();
    // wait for the OTP and input the OTP
    driver.pause(3000);
		await this.phoneInput.setValue(phoneNumber);
		await this.confirmButton.click();
    // wait for the OTP
    const timeForOTP = 7000;
    await driver.pause(timeForOTP);
		await this.allowOTPButton.click();
		await this.confirmButton.click();
    driver.pause(3000);
    // input password and confirm password
		await this.passwordInput.setValue(password);
		await this.confirmInput.setValue(password);
    // submit the form and wait for the success message
    const maxRetry = 100;
    let successTextView = '';
		for (let i = 0; i < maxRetry; i++) {
			await this.confirmButton.click();
			successTextView = await this.successTitle.getText();
			if (successTextView.includes('Success')) 
        break;
			driver.pause(500);
		}

		await this.confirmButton.click();
    driver.pause(3000);
	}
}

export default new SingupScreen();
