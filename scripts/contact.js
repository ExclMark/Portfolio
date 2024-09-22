let localization;

document.addEventListener("DOMContentLoaded", async () => {
    localization = await getLocalization();
    let textElement = document.getElementById("animated-text");

    localStorage.setItem("preBoot", "true");
    localStorage.setItem("previousParameter", 2);

    textElement.textContent = '';
    const span = document.createElement('span');
    span.className = 'pwd';
    textElement.appendChild(span);

    let currentMenuIndex = 0;
    let parameterSelected = 0;
    let command = true;
    let skip = false;
    let ud = false;
    const menuSpeed = 5;

    function contact(span) {
        let text = "";
        let mob = "";

        text = "./contact\n";
        text += mobile ? "\n" + localization.mob_nav + "\n\n" : "\n" + localization.nav + "\n\n";
        text += parameterSelected == 0 ? "> GitHub <\n" : "GitHub\n";
        text += parameterSelected == 1 ? "> Discord <\n\n" : "Discord\n";
        text += parameterSelected == 2 ? "> Telegram <\n\n" : "Telegram\n";
        text += parameterSelected == 3 ? "> info@3xcl.dev <\n\n" : "info@3xcl.dev\n\n";
        text += parameterSelected == 4 ? "> " + localization.back + " <" : localization.back;

        if (skip) {
            text = "<span class='pwd'>./contact</span>\n";
            mob = mobile ? "\n" + localization.mob_nav + "\n\n" : "\n" + localization.nav + "\n\n";
            for(let i = 0; i < mob.length; i++) {
                if (mob[i] == "_" && !ud) {
                    text += "<span class='ud'>";
                    ud = true;
                } else if (mob[i] == "_" && ud) {
                    text += "</span>";
                    ud = false;
                } else {
                    text += mob[i];
                }
            }
            text += parameterSelected == 0 ? "<span class='select'>> GitHub <</span>\n" : "GitHub\n";
            text += parameterSelected == 1 ? "<span class='select'>> Discord <</span>\n" : "Discord\n";
            text += parameterSelected == 2 ? "<span class='select'>> Telegram <</span>\n" : "Telegram\n";
            text += parameterSelected == 3 ? "<span class='select'>> info@3xcl.dev <</span>\n\n" : "info@3xcl.dev\n\n";
            text += parameterSelected == 4 ? "<span class='select'>> " + localization.back + " <" : localization.back;
            textElement.innerHTML = text;
        } else {
            let index = 0;
            let mobCorrect = localization.lang == "en" ? (mobile ? 2 : 0) : (mobile ? 1 : 0);
            if (parameterSelected == 0) {
                index = localization.lang == "en" ? 58 - mobCorrect : 73 - mobCorrect;
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
                if (currentMenuIndex > 9) {
                    command = false;
                }
                if (command) {
                    span.innerHTML += text[currentMenuIndex];
                } else if (select) {
                    selectSpan.innerHTML += text[currentMenuIndex];
                } else {
                    if (text[currentMenuIndex] == "_" && !ud) {
                        const udSpan = document.createElement('span');
                        udSpan.className = 'ud';
                        textElement.appendChild(udSpan);
                        ud = true;
                    } else if (text[currentMenuIndex] == "_" && ud) {
                        ud = false;
                    } else {
                        if (ud) {
                            const lastUdSpan = textElement.querySelector('span.ud:last-child');
                            if (lastUdSpan) {
                                lastUdSpan.innerHTML += text[currentMenuIndex];
                            }
                        } else {
                            textElement.innerHTML += text[currentMenuIndex];
                        }
                    }
                }
                if (text[currentMenuIndex] == "\n") {
                    select = false
                }
                currentMenuIndex++;
                setTimeout(() => contact(span), menuSpeed);
            } else {
                command = true;
                skip = true;
            }
        }
    }

    contact(span);

    document.addEventListener('keydown', handleKeydown);

    function handleKeydown(event) {
        const span = document.createElement('span');
        span.className = 'pwd';
        textElement.appendChild(span);
        if (!skip) {
            skip = true;
            return;
        }
        switch (event.key) {
            case 'ArrowUp':
                parameterSelected = (parameterSelected - 1 + 5) % 5;
                contact(span);
                break;
            case 'ArrowDown':
                parameterSelected = (parameterSelected + 1) % 5;
                contact(span);
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
                        window.open('https://t.me/excl_dev', '_blank');
                        break;
                    case 3:
                        window.open('mailto:info@3xcl.dev', '_blank');
                        break;
                    case 4:
                        document.removeEventListener('keydown', handleKeydown);
                        window.location.href = '/';
                        break
                }

        }
    }
});

