let mobile;

function isTouchDevice() {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) ||(navigator.msMaxTouchPoints > 0));
}

if (isTouchDevice()) {
    const swipeArea = document.getElementById('main-content');
    const hammer = new Hammer(swipeArea);

    mobile = true;
    // document.getElementById('animated-text').style.fontSize = '0.8rem';

    function simulateKeyAction(key) {
        const event = new KeyboardEvent('keydown', {
            key: key,
            code: key === 'ArrowUp' ? 'ArrowUp' : key === 'ArrowDown' ? 'ArrowDown' : 'Enter',
            keyCode: key === 'ArrowUp' ? 38 : key === 'ArrowDown' ? 40 : 13,
            which: key === 'ArrowUp' ? 38 : key === 'ArrowDown' ? 40 : 13,
            bubbles: true
        });

        document.dispatchEvent(event);
    }

    function handleSwipe(event) {
        if (event.direction === Hammer.DIRECTION_UP) {
            simulateKeyAction('ArrowUp');
        } else if (event.direction === Hammer.DIRECTION_DOWN) {
            simulateKeyAction('ArrowDown');
        }
    }

    function handleTap() {
        simulateKeyAction('Enter');
    }

    hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

    hammer.on('swipeup', handleSwipe);
    hammer.on('swipedown', handleSwipe);
    hammer.on('tap', handleTap);
}