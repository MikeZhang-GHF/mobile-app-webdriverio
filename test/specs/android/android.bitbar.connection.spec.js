describe('Bitbar Connection Test', () => {
	
	it('should connect to Bitbar', async () => {
		console.log('Connected to backend Appium Server');
	});

  it('should display login button', async () => {
		const appID =
			'//*[@resource-id="com.petrocanada.commercial_drivers.android:id/';
		// Assert Loginbutton is displayed
		expect(await $(appID + 'login"]').isDisplayed()).toBe(true);
	});
});
