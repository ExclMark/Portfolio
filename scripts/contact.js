let localization;

document.addEventListener("DOMContentLoaded", async () => {
    localization = await getLocalization();
    let textElement = document.getElementById("animated-text");

    localStorage.setItem("preBoot", "true");

    textElement.textContent = '';
    const span = document.createElement('span');
    span.className = 'pwd';
    textElement.appendChild(span);

    let currentMenuIndex = 0;
    let parameterSelected = 0;
    let command = true;
    const menuSpeed = 5;

    function contact(span, init = false) {
        let text = "";

        text = "./contact\n";
        text += "\n" + localization.nav + "\n\n";
        text += parameterSelected == 0 ? "> GitHub <\n" : "GitHub\n";
        text += parameterSelected == 1 ? "> Discord <\n\n" : "Discord\n";
        text += parameterSelected == 2 ? "> info@3xcl.dev <\n\n" : "info@3xcl.dev\n\n";
        text += parameterSelected == 3 ? "> " + localization.back + " <" : localization.back;

        if (init) {
            text = "<span class='pwd'>./contact</span>\n";
            text += "\n" + localization.nav + "\n\n";
            text += parameterSelected == 0 ? "<span class='select'>> GitHub <</span>\n" : "GitHub\n";
            text += parameterSelected == 1 ? "<span class='select'>> Discord <</span>\n" : "Discord\n";
            text += parameterSelected == 2 ? "<span class='select'>> info@3xcl.dev <</span>\n\n" : "info@3xcl.dev\n\n";
            text += parameterSelected == 3 ? "<span class='select'>> " + localization.back + " <" : localization.back;
            textElement.innerHTML = text;
            loaded = true;
            return;
        }

        let index = 0;
        if (parameterSelected == 0) {
            index = localization.lang == "en" ? 54 : 69;
        } else if (parameterSelected == 1) {
            index = 63;
        } else if (parameterSelected == 2) {
            index = 72;
        } else {
            index = 81;
        }

        if (currentMenuIndex === index) {
            selectSpan = document.createElement('span');
            selectSpan.className = 'select';
            textElement.appendChild(selectSpan);
            select = true;
        } else {
            selectSpan = textElement.querySelector('span.select:last-child');
        }

        if (currentMenuIndex < text.length) {
            if (currentMenuIndex === index) {
                textElement.appendChild(selectSpan);
            }
            loaded = false;
            if (currentMenuIndex > 9) {
                command = false;
            }
            if (command) {
                span.innerHTML += text[currentMenuIndex];
            } else if (select) {
                selectSpan.innerHTML += text[currentMenuIndex];
            } else {
                textElement.innerHTML += text[currentMenuIndex];
            }
            if (text[currentMenuIndex] == "\n") {
                select = false
            }
            currentMenuIndex++;
            setTimeout(() => contact(span), menuSpeed);
        } else {
            loaded = true;
            command = true;
        }
    }

    contact(span);

    document.addEventListener('keydown', handleKeydown);

    function handleKeydown(event) {
        const span = document.createElement('span');
        span.className = 'pwd';
        textElement.appendChild(span);
        switch (event.key) {
            case 'ArrowUp':
                parameterSelected = (parameterSelected - 1 + 4) % 4;
                contact(span, true);
                break;
            case 'ArrowDown':
                parameterSelected = (parameterSelected + 1) % 4;
                contact(span, true);
                break;
            case 'Enter':
                switch (parameterSelected) {
                    case 0:
                        window.open('https://github.com/ExclMark', '_blank');
                        break;
                    case 1:
                        window.open('https://discordapp.com/users/665234248482947083', '_blank');
                        break;
                    case 2:
                        window.open('mailto:info@3xcl.dev', '_blank');
                        break;
                    case 3:
                        document.removeEventListener('keydown', handleKeydown);
                        window.location.href = '/';
                        break
                }

        }
    }
});

