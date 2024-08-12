let mobile;

function isTouchDevice() {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) ||(navigator.msMaxTouchPoints > 0));
}

function setVertical() {
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    hammer.off('swipeleft', handleSwipe);
    hammer.off('swiperight', handleSwipe);
    hammer.on('swipeup', handleSwipe);
    hammer.on('swipedown', handleSwipe);
}

function setHorizontal() {
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
    hammer.on('swipeleft', handleSwipe);
    hammer.on('swiperight', handleSwipe);
    hammer.off('swipeup', handleSwipe);
    hammer.off('swipedown', handleSwipe);
}

function setAll() {
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    hammer.on('swipeleft', handleSwipe);
    hammer.on('swiperight', handleSwipe);
    hammer.on('swipeup', handleSwipe);
    hammer.off('swipedown', handleSwipe);
}

const swipeArea = document.getElementById('main-content');
const hammer = new Hammer(swipeArea);

if (isTouchDevice()) {
    mobile = true;
    // document.getElementById('animated-text').style.fontSize = '0.8rem';

    function simulateKeyAction(key) {
        const event = new KeyboardEvent('keydown', {
            key: key,
            code: key === 'ArrowUp' ? 'ArrowUp' :
                  key === 'ArrowDown' ? 'ArrowDown' :
                  key === 'ArrowLeft' ? 'ArrowLeft' :
                  key === 'ArrowRight' ? 'ArrowRight' : 'Enter',
            keyCode: key === 'ArrowUp' ? 38 :
                     key === 'ArrowDown' ? 40 :
                     key === 'ArrowLeft' ? 37 :
                     key === 'ArrowRight' ? 39 : 13,
            which: key === 'ArrowUp' ? 38 :
                   key === 'ArrowDown' ? 40 :
                   key === 'ArrowLeft' ? 37 :
                   key === 'ArrowRight' ? 39 : 13,
            bubbles: true
        });

        document.dispatchEvent(event);
    }

    function handleSwipe(event) {
        if (event.direction === Hammer.DIRECTION_UP) {
            simulateKeyAction('ArrowUp');
        } else if (event.direction === Hammer.DIRECTION_DOWN) {
            simulateKeyAction('ArrowDown');
        } else if (event.direction === Hammer.DIRECTION_LEFT) {
            simulateKeyAction('ArrowRight');
        } else if (event.direction === Hammer.DIRECTION_RIGHT) {
            simulateKeyAction('ArrowLeft');
        }
    }

    function handleTap() {
        simulateKeyAction('Enter');
    }

    setVertical();

    hammer.on('tap', handleTap);
}