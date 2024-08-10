let terminal = document.getElementById('animated-text');
let localization;
let mobile = false;

function handleKey(event) {
    if (event.key === 'Enter') {
        window.location.href = '/';
    }
}

function isTouchDevice() {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) ||(navigator.msMaxTouchPoints > 0));
}

if (isTouchDevice()) {
    const swipeArea = document.getElementById('main-content');
    const hammer = new Hammer(swipeArea);

    mobile = true;

    function handleTap() {
        const event = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true
        });
        document.dispatchEvent(event);
    }

    hammer.on('tap', handleTap);
}

document.addEventListener("DOMContentLoaded", async function() {
    localization = await getLocalization();

    localStorage.setItem("preBoot", "true");

    let text1 = localization.error404 + "\n";
    let text2 = localization.code404 + "\n"
    let text3 = localization.message404 + "\n\n";
    let text4 = mobile ? localization.back_mob404 : localization.back404;

    terminal.innerHTML = '<span class="fail">./error</span>\n\n';

    function printText(text, element, delay = 25) {
        return new Promise((resolve) => {
            let i = 0;
            function printChar() {
                if (i < text.length) {
                    element.innerHTML += text[i];
                    i++;
                    setTimeout(printChar, delay);
                } else {
                    resolve();
                }
            }
            printChar();
        });
    }

    async function printSequentially() {
        let slice = 0
        prefix = document.createElement('span');
        prefix.className = 'prefix';
        terminal.appendChild(prefix);

        slice = localization.lang == 'en' ? 6 : 8;
        await printText(text1.slice(0, slice), prefix);
        await printText(text1.slice(slice), terminal);

        prefix = document.createElement('span');
        prefix.className = 'prefix';
        terminal.appendChild(prefix);

        slice = localization.lang == 'en' ? 5 : 4;
        await printText(text2.slice(0,slice), prefix);
        await printText(text2.slice(slice), terminal);

        prefix = document.createElement('span');
        prefix.className = 'prefix';
        terminal.appendChild(prefix);

        slice = localization.lang == 'en' ? 8 : 13;
        await printText(text3.slice(0, slice), prefix);
        await printText(text3.slice(slice), terminal);

        await printText(text4, terminal);
    }

    printSequentially();

    document.addEventListener('keydown', handleKey);

    document.addEventListener('dblclick', function(event) {
        event.preventDefault();
    }, { passive: false });
});