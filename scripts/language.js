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
    const menuSpeed = 5;

    function language(span) {
        let text = "";

        text = `./language - [${localization.lang}]\n`;
        text += mobile ? "\n" + localization.mob_nav + "\n\n" : "\n" + localization.nav + "\n\n";
        text += lang == 'en' ? "> English <\n" : "English\n";
        text += lang == 'uk' ? "> Українська <\n" : "Українська\n";

        if (skip) {
            text = `<span class='pwd'>./language - [${localization.lang}]</span>\n`;
            text += mobile ? "\n" + localization.mob_nav + "\n\n" : "\n" + localization.nav + "\n\n";
            text += lang == 'en' ? "<span class='select'>> English <</span>\n" : "English\n";
            text += lang == 'uk' ? "<span class='select'>> Українська <</span>\n" : "Українська\n";
            textElement.innerHTML = text;
        } else {
            let index = 0;
            let mobCorrect = localization.lang == "en" ? (mobile ? 2 : 0) : (mobile ? 1 : 0);
            if (lang == "en") {
                index = 62 - mobCorrect;
            } else {
                index = localization.lang == "en" ? 71 - mobCorrect : 85 - mobCorrect;
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
                    textElement.innerHTML += text[currentMenuIndex];
                }
                if (text[currentMenuIndex] == "\n") {
                    select = false
                }
                currentMenuIndex++;
                setTimeout(() => language(span), menuSpeed);
            } else {
                command = true;
            }
        }

    }

    language(span);

    document.addEventListener('keydown', handleKeydown);

    async function handleKeydown(event) {
        const span = document.createElement('span');
        span.className = 'pwd';
        textElement.appendChild(span);
        skip = true;
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

