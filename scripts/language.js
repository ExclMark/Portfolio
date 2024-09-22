let localization;

document.addEventListener("DOMContentLoaded", async () => {
    localization = await getLocalization();
    let textElement = document.getElementById("animated-text");

    localStorage.setItem("preBoot", "true");
    localStorage.setItem("previousParameter", 3);

    textElement.textContent = '';
    const span = document.createElement('span');
    span.className = 'pwd';
    textElement.appendChild(span);

    let currentMenuIndex = 0;
    let select = false;
    let lang = localization.lang;
    let command = true;
    let skip = false;
    let ud = false;
    const menuSpeed = 5;

    function language(span) {
        let text = "";
        let mob = "";

        text = `./language - [${localization.lang}]\n`;
        text += mobile ? "\n" + localization.mob_nav + "\n\n" : "\n" + localization.nav + "\n\n";
        text += lang == 'en' ? "> English <\n" : "English\n";
        text += lang == 'uk' ? "> Українська <\n" : "Українська\n";

        if (skip) {
            text = `<span class='pwd'>./language - [${localization.lang}]</span>\n`;
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
            text += lang == 'en' ? "<span class='select'>> English <</span>\n" : "English\n";
            text += lang == 'uk' ? "<span class='select'>> Українська <</span>\n" : "Українська\n";
            textElement.innerHTML = text;
        } else {
            let index = 0;
            let mobCorrect = localization.lang == "en" ? (mobile ? 2 : 0) : (mobile ? 1 : 0);
            if (lang == "en") {
                index = 66 - mobCorrect;
            } else {
                index = localization.lang == "en" ? 75 - mobCorrect : 89 - mobCorrect;
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
                if (currentMenuIndex > 16) {
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
                setTimeout(() => language(span), menuSpeed);
            } else {
                command = true;
                skip = true;
            }
        }

    }

    language(span);

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('click', handleKeydown);

    async function handleKeydown(event) {
        const span = document.createElement('span');
        span.className = 'pwd';
        textElement.appendChild(span);
        if (!skip) {
            skip = true;
            return;
        }
        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowDown':
                lang = lang === 'en' ? 'uk' : 'en';
                language(span);
                break;
            case 'Enter':
                if (lang != localization.lang) {
                    localStorage.setItem('lang', lang);
                    await setLocalization(lang);
                    localization = await getLocalization();
                }
                document.removeEventListener('keydown', handleKeydown);
                window.location.href = '/';
                break;

        }
    }
});

