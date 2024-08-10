let localization;

document.addEventListener("DOMContentLoaded", async () => {
    localization = await getLocalization();
    let textElement = document.getElementById("animated-text");

    textElement.textContent = '';
    const span = document.createElement('span');
    span.className = 'pwd';
    textElement.appendChild(span);

    let currentMenuIndex = 0;
    let select = false;
    let lang = localization.lang;
    let command = true;
    const menuSpeed = 5;

    function language(span, init = false) {
        let text = "";

        text = "./language\n";
        text += "\n" + localization.nav + "\n\n";
        text += lang == 'en' ? "> English <\n" : "English\n";
        text += lang == 'uk' ? "> Українська <\n" : "Українська\n";

        if (init) {
            text = "<span class='pwd'>./language</span>\n";
            text += "\n" + localization.nav + "\n\n";
            text += lang == 'en' ? "<span class='select'>> English <</span>\n" : "English\n";
            text += lang == 'uk' ? "<span class='select'>> Українська <</span>\n" : "Українська\n";
            textElement.innerHTML = text;
            loaded = true;
            return;
        }

        let index = 0;
        if (lang == "en") {
            index = 55;
        } else {
            index = localization.lang == "en" ? 64 : 78;
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
            setTimeout(() => language(span), menuSpeed);
        } else {
            loaded = true;
            command = true;
        }
    }

    language(span);

    document.addEventListener('keydown', handleKeydown);

    async function handleKeydown(event) {
        const span = document.createElement('span');
        span.className = 'pwd';
        textElement.appendChild(span);
        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowDown':
                lang = lang === 'en' ? 'uk' : 'en';
                language(span, true);
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

