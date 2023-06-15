class HomeScreen {
	// get greetingMessage() {
	// 	return $('//*[@label=""]');
	// }

  get homeLabel() {
    return $('//*[@label="Home"]');
  }

	get accountButton() {
		return $('//*[@label="profile"]');
	}

	get signoutButton() {
		return $('//*[@label="Sign out"]');
	}

	get confirmSignoutButton() {
		return $('//XCUIElementTypeButton[@label="Sign out"]');
	}

	async signout() {
		await this.accountButton.click();
		await this.signoutButton.click();
		// await this.confirmSignoutButton.click();
	}
}

export default new HomeScreen();
