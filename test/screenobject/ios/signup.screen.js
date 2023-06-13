class SingupScreen {
	get iHaveCardButton() {
		return $('//*[@label="YES, I HAVE A CARD"]');
	}

	get nameInput() {
		return $(
			'//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]'
		);
	}

	get cardNumberInput() {
		return $(
			'//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeTextField[2]'
		);
	}

	get pinNumberInput() {
		return $(
			'//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeTextField[3]'
		);
	}

	get phoneInput() {
		return $('//XCUIElementTypeTextField');
	}

	get confirmButton() {
		return $('//*[@label="CONTINUE"]');
	}

	get allowOTPButton() {
		return $('//*[@label="suggestion"]');
	}

	get passwordInput() {
		return $(
			'//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[1]'
		);
	}

	get confirmInput() {
		return $(
			'//XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[2]'
		);
	}

	get successTitle() {
		return $('//*[@label="Success! You\'re all set!"]');
	}

	async singup({ userName, cardNumber, pinNumber, phoneNumber, password }) {
		await this.iHaveCardButton.click();
		await this.nameInput.setValue(userName);
		await this.cardNumberInput.setValue(cardNumber);
		await this.pinNumberInput.setValue(pinNumber);
		await this.confirmButton.click();
		// wait for the OTP and input the OTP
		driver.pause(2000);
		await this.phoneInput.setValue(phoneNumber);
		await this.confirmButton.click();
		// wait for the OTP
		const timeForOTP = 7000;
		await driver.pause(timeForOTP);
		await this.allowOTPButton.click();
		await this.confirmButton.click();
		driver.pause(2000);
		// input password and confirm password
		await this.passwordInput.setValue(password);
		await this.confirmInput.setValue(password);
		// submit the form and wait for the success message
		const maxRetry = 100;
		let successTextView = '';
		for (let i = 0; i < maxRetry; i++) {
			successTextView = await this.successTitle.getText();
			if (successTextView.includes('Success')) break;
			driver.pause(500);
		}

		await this.confirmButton.click();
		driver.pause(2000);
	}
}

export default new SingupScreen();
