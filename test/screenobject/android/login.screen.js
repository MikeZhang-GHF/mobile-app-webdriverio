class LoginScreen {
	get cardNumberInput() {
		return $('//XCUIElementTypeSecureTextField');
	}

	get passwordInput() {
		return $('//XCUIElementTypeSecureTextField');
	}

	get signinButton() {
		return $('//*[@label="SIGN IN"]');
	}

	async login(cardNumber, password) {
		// await this.cardNumberInput.setValue(cardNumber);
		await this.passwordInput.setValue(password);
		await this.signinButton.click();
	}
}

export default new LoginScreen();
