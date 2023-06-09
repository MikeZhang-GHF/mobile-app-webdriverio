class LaunchScreen {
	appID = '//*[@resource-id="com.petrocanada.commercial_drivers.android:id/';

	get loginButton() {
		return $(this.appID + 'login"]');
	}

	get signupButton() {
		return $(this.appID + 'signup"]');
	}

  get locationTitleText() {
    return $('//*[@text="Nearest Station"]');
  }

  get addressLineText() {
    return $(this.appID + 'addressLine"]');
  }

  async setGeoLocation({ latitude, longitude, altitude }) {
    console.log('setGeoLocation');
    await driver.setGeoLocation({ latitude, longitude, altitude });
  }

}

export default new LaunchScreen();
