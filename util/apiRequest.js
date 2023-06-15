import axios from 'axios';

// const devBaseUrl = 'https://wma-dev.petro-canada.ca/backendapi';
const qutBaseUrl = 'https://wma-qut.petro-canada.ca/backendapi';

export const getNearestStationAddress = async (latitude, longitude) => {
	// Call the geolocation service API and get the gas station info
	const {
		data: { result },
	} = await axios.get(
		`${qutBaseUrl}/stations/locations/nearest?latitude=${latitude}&longitude=${longitude}`
	);
	return result.location.addressLine.toLowerCase();
};

export const deleteTestCard = async (cardNumber, pinNumber) => {
	try {
		await axios.delete(
			`${qutBaseUrl}/users/delete/${cardNumber}?pin=${pinNumber}`
		);
	} catch (error) {
		console.log(error);
	}
};
