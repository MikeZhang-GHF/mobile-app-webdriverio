import axios from 'axios';

const baseUrl = 'https://wma-dev.petro-canada.ca/backendapi';

export const getNearestStationAddress = async ( latitude, longitude ) => {
	// Call the geolocation service API and get the gas station info
	const {
		data: { result },
	} = await axios.get(
		`${baseUrl}/stations/locations/nearest?latitude=${latitude}&longitude=${longitude}`
	);
	return result.location.addressLine.toLowerCase();
};

export const deleteTestCard = async ( cardNumber, pinNumber ) => {
  const response = await axios.delete(
    `${baseUrl}/users/delete/${cardNumber}?pin=${pinNumber}`
  );
  return response
}
