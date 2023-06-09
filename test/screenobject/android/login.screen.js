class LoginScreen {
	appID = '//*[@resource-id="com.petrocanada.commercial_drivers.android:id/';

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
		await this.cardNumberInput.setValue(cardNumber);
		await this.passwordInput.setValue(password);
		await this.signinButton.click();
	}
}

export default new LoginScreen();
