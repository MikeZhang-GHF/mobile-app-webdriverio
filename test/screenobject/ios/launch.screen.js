class LaunchScreen {
	get welcomeMessage() {
		return $('//*[@label="Welcome let\'s get you signed in!"]');
	}

	get loginButton() {
		return $('//*[@label="LOGIN"]');
	}

	get signupButton() {
		return $('//*[@label="SIGN UP"]');
	}

	get allowLocationButton() {
		return $('//*[@label="Allow While Using App"]');
	}

	get locationTitleText() {
		return $('//*[@label="Nearest Station"]');
	}

	get addressLineText() {
		return $('//*[@label=" 215 MONUMENT PLACE S.E., CALGARY"]');
	}

	async setGeoLocation({ latitude, longitude, altitude }) {
		await driver.setGeoLocation({ latitude, longitude, altitude });
	}
}

export default new LaunchScreen();
