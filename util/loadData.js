export const loadNearestStationLocation = () => {
	const { nearestStation } = require('../test/test_data/geolocation.data.json');
	return nearestStation;
};

export const loadSignupData = (deviceCloud, os) => {
	const signupData = require('../test/test_data/signup.data.json');
	const phoneData = require('../test/test_data/phone.data.json');
	signupData.phoneNumber = phoneData[deviceCloud][os];
	return signupData;
};
