// Description: Gesture utilities for Appium, such as, swiping, pinching, zooming, etc.

// swipe gesture
export const swipe = (direction, start, end, speed = 1000) => {
  // Validate the input
  if (start.x > 1 || start.x < 0 || start.y < 0 ||start.y > 1) {
    return console.error('start.x and start.y must be between 0 and 1');
  }
  if (end.x > 1 || end.x < 0 || end.y < 0 ||end.y > 1) {
    return console.error('end.x and end.y must be between 0 and 1');
  }

  if (speed < 0) {  
    return console.error('speed must be a positive number');
  }

	const { width, height } = driver.getWindowRect();
	const { xStartPercent, yStartPercent, xEndPercent, yEndPercent } =
		start || end
			? {
					xStartPercent: start.x,
					yStartPercent: start.y,
					xEndPercent: end.x,
					yEndPercent: end.y,
			}
			: {
					xStartPercent: 0.5,
					yStartPercent: 0.5,
					xEndPercent: 0.5,
					yEndPercent: 0.5,
			};
	const pressX = width * xStartPercent;
	const pressY = height * yStartPercent;
	const moveToX = width * xEndPercent;
	const moveToY = height * yEndPercent;

	switch (direction) {
		case 'up':
			moveToY;
			break;
		case 'down':
			moveToY;
			break;
		case 'left':
			moveToX;
			break;
		case 'right':
			moveToX;
			break;
		default:
			break;
	}

	driver.touchPerform([
		{ action: 'press', options: { x: pressX, y: pressY } },
		{ action: 'wait', options: { ms: speed } },
		{ action: 'moveTo', options: { x: moveToX, y: moveToY } },
		{ action: 'release' },
	]);
};
