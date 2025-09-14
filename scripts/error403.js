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

    let text1 = localization.error403 + "\n";
    let text2 = localization.code403 + "\n"
    let text3 = localization.message403 + "\n\n";
    let text4 = mobile ? localization.back_mob_error : localization.back_error;

    terminal.innerHTML = '<span class="fail">./error</span>\n\n';

        // ...existing code...
    function printText(text, element, delay = 25) {
        return new Promise((resolve) => {
            let i = 0;
            let currentSpan = null;
            // helper to open span of given class
            const openSpan = (cls) => {
                currentSpan = document.createElement('span');
                currentSpan.className = cls;
                element.appendChild(currentSpan);
            };
            // helper to close current span
            const closeSpan = () => {
                currentSpan = null;
            };
    
            function printChar() {
                if (i < text.length) {
                    const ch = text[i];
    
                    if (ch === '|' ) { // toggle folder
                        if (!currentSpan || currentSpan.className !== 'folder') {
                            openSpan('folder');
                        } else {
                            closeSpan();
                        }
                    } else if (ch === '~') { // toggle file
                        if (!currentSpan || currentSpan.className !== 'file') {
                            openSpan('file');
                        } else {
                            closeSpan();
                        }
                    } else if (ch === '_') { // toggle ud
                        if (!currentSpan || currentSpan.className !== 'ud') {
                            openSpan('ud');
                        } else {
                            closeSpan();
                        }
                    } else {
                        if (currentSpan) {
                            currentSpan.innerHTML += ch;
                        } else {
                            element.innerHTML += ch;
                        }
                    }
    
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
        let slice = 0;
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
    // ...existing code...

    printSequentially();

    document.addEventListener('keydown', handleKey);

    document.addEventListener('dblclick', function(event) {
        event.preventDefault();
    }, { passive: false });
});