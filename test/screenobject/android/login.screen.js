class LoginScreen {
	get cardNumberInput() {
		return $(this.appID + 'cardInput"]');
	}

	get passwordInput() {
		return $(this.appID + 'passwordInput"]');
	}

	get signinButton() {
		return $(this.appID + 'login"]');
	}

	async login(cardNumber, password) {
		const isCardNumberInputEnabled = await this.cardNumberInput.isEnabled();
		// Check if the card number input is enabled
		if (isCardNumberInputEnabled) {
			await this.cardNumberInput.setValue(cardNumber);
		}
		await this.passwordInput.setValue(password);
		await this.signinButton.click();
		await driver.pause(2000);
	}
}

export default new LoginScreen();
