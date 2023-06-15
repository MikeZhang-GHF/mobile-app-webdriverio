class LoginScreen {
	get cardNumberInput() {
		return $('//*[@type="XCUIElementTypeTextField"]');
	}

	get passwordInput() {
		return $('//*[@type="XCUIElementTypeSecureTextField"]');
	}

	get doneButton() {
		return $('//*[@label="Done"]');
	}

	get signinButton() {
		return $('//*[@label="SIGN IN"]');
	}

	async login(cardNumber, password) {
		const isCardNumberInputEnabled = await this.cardNumberInput.isEnabled();
		// Check if the card number input is enabled
		if (isCardNumberInputEnabled) {
			await this.cardNumberInput.setValue(cardNumber);
		}
		await this.passwordInput.setValue(password);
		await this.doneButton.click();
		await this.signinButton.click();
		await driver.pause(2000);
	}
}

export default new LoginScreen();
