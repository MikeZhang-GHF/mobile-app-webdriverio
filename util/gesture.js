export const swipe = (direction, speed, percent) => {
    const { width, height } = driver.getWindowRect();
    const pressX = width * 0.5;
    const pressY = height * 0.5;
    let moveToX = pressX;
    let moveToY = pressY;
    switch (direction) {
        case 'up':
            moveToY = pressY - (height * percent);
            break;
        case 'down':
            moveToY = pressY + (height * percent);
            break;
        case 'left':
            moveToX = pressX - (width * percent);
            break;
        case 'right':
            moveToX = pressX + (width * percent);
            break;
        default:
            break;
    }
    driver.touchPerform([
        { action: 'press', options: { x: pressX, y: pressY } },
        { action: 'wait', options: { ms: speed } },
        { action: 'moveTo', options: { x: moveToX, y: moveToY } },
        'release'
    ]);
}