// Description: Gesture utilities for Appium, such as, swiping, pinching, zooming, etc.

// swipe gesture
export const swipe = async (start, end, speed = 1000) => {
	// Validate the input
	if (start.x > 1 || start.x < 0 || start.y < 0 || start.y > 1) {
		return console.error('start.x and start.y must be between 0 and 1');
	}
	if (end.x > 1 || end.x < 0 || end.y < 0 || end.y > 1) {
		return console.error('end.x and end.y must be between 0 and 1');
	}

	if (speed < 0) {
		return console.error('speed must be a positive number');
	}

	const { width, height } = await driver.getWindowRect();
	const pressX = width * start.x, pressY = height * start.y;
	const moveToX = width * end.x, moveToY = height * end.y;

	await driver.touchPerform([
		{ action: 'press', options: { x: pressX, y: pressY } },
		{ action: 'wait', options: { ms: speed } },
		{ action: 'moveTo', options: { x: moveToX, y: moveToY } },
		{ action: 'release' },
	]);
};

