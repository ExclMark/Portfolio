let localization;

document.addEventListener("DOMContentLoaded", async () => {
    localization = await getLocalization();
    let textElement = document.getElementById("animated-text");

    textElement.textContent = '';
    const span = document.createElement('span');
    span.className = 'pwd';
    textElement.appendChild(span);

    let currentMenuIndex = 0;
    let command = true;
    const menuSpeed = 5;

    function about(span) {
        let text = "./about\n\n";
        text += localization.redacted;
        text += mobile ? localization.mob_exit : localization.exit;
    
        if (currentMenuIndex < text.length) {
            loaded = false;
            if (text[currentMenuIndex] == "\n") {
                command = false;
            }
            if (command) {
                span.innerHTML += text[currentMenuIndex];
            } else {
                textElement.innerHTML += text[currentMenuIndex];
            }
            currentMenuIndex++;
            setTimeout(() => about(span), menuSpeed);
        } else {
            loaded = true;
            command = true;
        }
    }

    about(span);

    document.addEventListener('keydown', handleKeydown);

    function handleKeydown(event) {
        if (event.key === 'Enter') {
            document.removeEventListener('keydown', handleKeydown);
            window.location.href = '/';
        }
    }
});

