class HomeScreen {
	appID = '//*[@resource-id="com.petrocanada.commercial_drivers.android:id/';

	get greetingMessage() {
		return $(this.appID + 'greeting"]');
	}

  get accountButton() {
    return $('//*[@content-desc="Account"]');
  }

  get signoutButton() {
    return $('//*[@text="Sign out"]');
  }

  get confirmSignoutButton() {
    return $('//*[@text="SIGN OUT"]');
  }

	async signout() {
    await this.accountButton.click();
    await this.signoutButton.click();
    await this.confirmSignoutButton.click();
	}
}

export default new HomeScreen();
