let parameterSelected = 0;
let localization;

async function loadLocalization(language) {
    try {
        const response = await fetch('localization.json');
        const localizationData = await response.json();
        return localizationData[language];
    } catch (error) {
        console.error('Error loading localization data:', error);
    }
}

async function setLocalization(language) {
    localization = await loadLocalization(language);
}

document.addEventListener("DOMContentLoaded", async function() {
    const textElement = document.getElementById('animated-text');

    let userLang = navigator.language || navigator.userLanguage;
    userLang = userLang.split('-')[0]

    let defLang = ['ru', 'ua'].includes(userLang) ? 'ua' : 'en';
    let localLang = localStorage.getItem('lang') || defLang;

    await setLocalization(localLang);

    const boot = [
        "[    <span class='timestamp'>0.000000</span>] Booting Linux 5.15.0-70-generic...",
        "[    <span class='timestamp'>0.000000</span>] Command line: BOOT_IMAGE=/vmlinuz-5.15.0-70-generic root=/dev/mapper/ubuntu--vg-root ro quiet splash",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] Booting CPUs",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] CPU0: online",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] CPU1: online",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] CPU2: online",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] CPU3: online",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] Memory: 16384MB",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] ACPI: ACPI Table Initialization",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] ACPI: Interpreter enabled",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] ACPI: IOAPIC for interrupt routing",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] PCI: Using configuration type 1",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] PCI: MMCONFIG enabled",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] PCI: Bus 0000:00",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] ACPI: Added _OSI(Module Device)",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] ACPI: Added _OSI(Processor Device)",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] ACPI: Added _OSI(3.0 _SCP Extensions)",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] ACPI: Added _OSI(Processor Aggregator Device)",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] ACPI: Added _OSI(Linux-Dell-Video)",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] ACPI: Executed AML code",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] ACPI: BIOS _OSI(Linux) query ignored",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] ACPI: (S0 S3 S4 S5)",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] ACPI: HPET table found",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] ACPI: DMAR table found",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] PCI: Bus 0000:00 - 0000:1f",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] PCI: Initialized",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] Network: eth0 initialized",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] Filesystems: ext4, xfs",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] Mounting root filesystem",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] Root filesystem mounted",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] Systemd: Starting services",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] Systemd: All services started successfully",
        "[    <span class='timestamp'>0.000000</span>] [  <span class='ok'>OK</span>  ] System: Kernel is ready"
    ];

    const commands = [
        "ls",
        "<span class='folder'>Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos  ExclMark</span",
        "cd ExclMark",
        "ls",
        "<span class='file'>style.css  index.html  script.js  exclmark.py  about.txt  projects.txt  contact.txt  language.txt  localization.json</span> <span class='folder'>logs</span>",
        "python3 exclmark.py",
    ];

    const baseTypingSpeed = 100;
    const variation = 70; 
    const commandPause = 500;
    const bootPause = 400;
    const bootSpeed = 2;
    const bootVariation = 5;
    const menuSpeed = 5;

    let currentCharIndex = 0;
    let currentCommandIndex = 0;
    let currentBootIndex = 0;
    let currentMenuIndex = 0;

    let inPage = false;
    let loaded = false;
    let command = true;
    let select = false;
    let logo = true;
    let skip = false;
    let skip_boot = false;
    let booted = false;
    let langSelecton = false;
    let contactSelection = false;
    let mobile = false;

    let lang = localLang;

    function typeBoot() {
        if (currentBootIndex < boot.length) {
            const currentBoot = boot[currentBootIndex];

            textElement.innerHTML += currentBoot + '\n';
            currentBootIndex++;
            textElement.scrollTop = textElement.scrollHeight
            if (skip_boot) {
                textElement.innerHTML = '';
                booted = true;
                menu(true);
            } else {
                setTimeout(typeBoot, bootSpeed + Math.random() * variation);
            }
        } else {
            setTimeout(clearText, bootPause);
        }
    }

    function clearText() {
        textElement.innerHTML = '<span class="prefix">root@null</span>:<span class="pwd">/</span># ';
        setTimeout(typeText, 400);
    }

    function menu(init = true) {
        textElement.style.fontSize = '1.2rem';
        let selectSpan;
        if (init == false || skip) {
            let text = "<span class='logo'>";
            text += " _____          _ __  __            _    \n";
            text += "| ____|_  _____| |  \\/  | __ _ _ __| | __\n";
            text += "|  _| \\ \\/ / __| | |\\/| |/ _` | '__| |/ /\n";
            text += "| |___ >  < (__| | |  | | (_| | |  |   < \n";
            text += "|_____/_/\\_\\___|_|_|  |_|\\__,_|_|  |_|\\_\\</span>\n";
            text += mobile ? localization.mob_nav : localization.nav;
            text += parameterSelected == 0 ? "<span class='select'>> " + localization.about + " <</span>\n" : localization.about + "\n";
            text += parameterSelected == 1 ? "<span class='select'>> " + localization.projects + " <</span>\n" : localization.projects + "\n";
            text += parameterSelected == 2 ? "<span class='select'>> " + localization.contact + " <</span>\n\n" : localization.contact + "\n\n";
            text += parameterSelected == 3 ? "<span class='select'>> " + localization.language + " <\n" : localization.language + "\n";
            textElement.innerHTML = text;
            // textElement.textContent += parameterSelected == 3 ? "> Contact\n" : "Contact\n";
            loaded = true;
            skip = false;
        } else {
            let text = "";
            text += " _____          _ __  __            _    \n";
            text += "| ____|_  _____| |  \\/  | __ _ _ __| | __\n";
            text += "|  _| \\ \\/ / __| | |\\/| |/ _` | '__| |/ /\n";
            text += "| |___ >  < (__| | |  | | (_| | |  |   < \n";
            text += "|_____/_/\\_\\___|_|_|  |_|\\__,_|_|  |_|\\_\\\n";
            text += mobile ? localization.mob_nav : localization.nav;
            text += parameterSelected == 0 ? "> " + localization.about + " <\n" : localization.about + "\n";
            text += parameterSelected == 1 ? "> " + localization.projects + " <\n" : localization.projects + "\n";
            text += parameterSelected == 2 ? "> " + localization.contact +" <\n\n" : localization.contact + "\n\n";
            text += parameterSelected == 3 ? "> " + localization.language +" <\n" : localization.language + "\n";

            let index = 0;
            let mobCorrect = lang == "en" ? mobile ? 3 : 0 : mobile ? 1 : 0;
            if (parameterSelected === 0) {
                index = lang == "en" ? 254 - mobCorrect : 269 - mobCorrect;
            } else if (parameterSelected === 1) {
                index = lang == "en" ? 260 - mobCorrect : 278 - mobCorrect;
            } else if (parameterSelected === 2) {
                index = lang == "en" ? 269 - mobCorrect : 286 - mobCorrect;
            } else {
                index = lang == "en" ? 278 - mobCorrect : 296 - mobCorrect;
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
                } else if (currentMenuIndex === 0) {
                    logoSpan = document.createElement('span');
                    logoSpan.className = 'logo';
                    textElement.appendChild(logoSpan);
                }
                if (logo) {
                    logoSpan.innerHTML += text[currentMenuIndex];
                    if (currentMenuIndex == 208) {
                        logo = false;
                    }
                } else {
                    if (select) {
                        selectSpan.innerHTML += text[currentMenuIndex];
                    } else {
                        textElement.innerHTML += text[currentMenuIndex];
                    }
                }
                if (text[currentMenuIndex] == "\n") {
                    select = false
                }
                currentMenuIndex++;
                if (currentMenuIndex < 210) {
                    setTimeout(menu, 0);
                } else {
                    setTimeout(menu, menuSpeed);
                }
            } else {
                loaded = true;
                logo = true;
            }
        }
    }

    function about(span) {
        let text = "./about\n\n";
        text += "[REDACTED]\n\n";
        text += localization.exit;

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

    function projects(span) {
        let text = "./projects\n\n";
        text += "[REDACTED]\n\n";
        text += localization.exit;

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
            setTimeout(() => projects(span), menuSpeed);
        } else {
            loaded = true;
            command = true; 
        }
    }

    function contact(span, init = false) {
        let text = "";

        text = "./contact\n";
        text += localization.nav;
        text += parameterSelected == 0 ? "> GitHub <\n" : "GitHub\n";
        text += parameterSelected == 1 ? "> Discord <\n\n" : "Discord\n";
        text += parameterSelected == 2 ? "> info@3xcl.dev <\n\n" : "info@3xcl.dev\n\n";
        text += parameterSelected == 3 ? "> " + localization.back + " <" : localization.back;

        if (init) {
            text = "<span class='pwd'>./contact</span>\n";
            text += localization.nav;
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

    function language(span, init = false) {
        let text = "";

        text = "./language\n";
        text += localization.nav;
        text += lang == 'en' ? "> English <\n" : "English\n";
        text += lang == 'uk' ? "> Українська <\n" : "Українська\n";

        if (init) {
            text = "<span class='pwd'>./language</span>\n";
            text += localization.nav;
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
    
    function typeText() {
        if (currentCommandIndex >= commands.length) {
            return;
        }

        const currentCommand = commands[currentCommandIndex];
        let commandSpan;

        if (skip_boot) {
            textElement.innerHTML = '';
            booted = true;
            menu(true);
            return;
        }
    
        if (currentCharIndex === 0) {
            commandSpan = document.createElement('span');
            commandSpan.className = 'command';
            textElement.appendChild(commandSpan);
        } else {
            commandSpan = textElement.querySelector('span.command:last-child');
        }
        
        if (currentCharIndex < currentCommand.length) {
            if ([1, 4].includes(currentCommandIndex)) {
                textElement.innerHTML += currentCommand;
                currentCharIndex = currentCommand.length;
                setTimeout(typeText, 0);
            } else {
                if (currentCharIndex === 0) {
                    textElement.appendChild(commandSpan);
                }
                if (currentCommand[currentCharIndex] == " ") {
                    command = false
                }
                if (command) {
                    commandSpan.textContent += currentCommand[currentCharIndex];
                } else {
                    textElement.innerHTML += currentCommand[currentCharIndex];
                }
                currentCharIndex++;           
                setTimeout(typeText, baseTypingSpeed + Math.random() * bootVariation);
            }
        } else {
            currentCommandIndex++;
            currentCharIndex = 0;
            command = true;
            if (currentCommandIndex == 2) {
                textElement.innerHTML += '<br><span class="prefix">root@null</span>:<span class="pwd">/</span># ';
            } else if ([3, 5].includes(currentCommandIndex)) {
                textElement.innerHTML += '<br><span class="prefix">root@null</span>:<span class="pwd">ExclMark</span># ';
            } else {
                textElement.innerHTML += '<br>';
            }
            if ([2, 3, 5, 6].includes(currentCommandIndex)) {
                setTimeout(typeText, commandPause);
            }
            else {
                setTimeout(typeText, 0);
            }
            if (currentCommandIndex == 6) {
                // return;
                textElement.innerHTML = '';
                booted = true;
                setTimeout(menu, 200);
            }
        }
    }

    typeBoot();
    // typeText();
    // menu();

    document.addEventListener('keydown', handleKeydown);

    document.addEventListener('dblclick', function(event) {
        event.preventDefault();
    }, { passive: false });

    async function handleKeydown(event) {
        if (!loaded && !skip) {
            if (booted) {
                skip = true;
            } else {
                skip_boot = true;
            }
            return;
        } else if (!loaded) {
            return;
        }
        switch (event.key) {
            case 'ArrowUp':
                if (!inPage) {
                    parameterSelected = Math.max(0, parameterSelected - 1);
                    menu(false);
                }
                if (inPage && langSelecton) {
                    lang = lang === 'en' ? 'uk' : 'en';
                    textElement.textContent = '';
                    currentMenuIndex = 0;
                    const span = document.createElement('span');
                    span.className = 'pwd';
                    textElement.appendChild(span);
                    language(span, true);
                } else if (inPage && contactSelection) {
                    parameterSelected = Math.max(0, parameterSelected - 1);
                    const span = document.createElement('span');
                    span.className = 'pwd';
                    textElement.appendChild(span);
                    contact(span, true);
                }
                break;
            case 'ArrowDown':
                if (!inPage) {
                    parameterSelected = Math.min(3, parameterSelected + 1);
                    menu(false);
                }
                if (inPage && langSelecton) {
                    lang = lang === 'en' ? 'uk' : 'en';
                    textElement.textContent = '';
                    currentMenuIndex = 0;
                    const span = document.createElement('span');
                    span.className = 'pwd';
                    textElement.appendChild(span);
                    language(span, true);
                } else if (inPage && contactSelection) {
                    parameterSelected = Math.min(3, parameterSelected + 1);
                    const span = document.createElement('span');
                    span.className = 'pwd';
                    textElement.appendChild(span);
                    contact(span, true);
                }
                break;
            case 'Enter':
                if (inPage) {
                    if (langSelecton) {
                        langSelecton = false;
                        if (lang != localization.lang) {
                            localStorage.setItem('lang', lang);
                            await setLocalization(lang);
                        }
                        textElement.textContent = '';
                        inPage = false;
                        loaded = false;
                        currentMenuIndex = 0;
                        menu();
                    } else if (contactSelection) {
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
                                contactSelection = false;
                                textElement.textContent = '';
                                inPage = false;
                                loaded = false;
                                parameterSelected = 2;
                                currentMenuIndex = 0;
                                menu();
                                break
                        }
                    } else {
                        textElement.textContent = '';
                        inPage = false;
                        loaded = false;
                        currentMenuIndex = 0;
                        menu();
                    }
                    break;
                }

                textElement.textContent = '';
                const span = document.createElement('span');
                span.className = 'pwd';
                textElement.appendChild(span);

                switch (parameterSelected) {
                    case 0:
                        inPage = true;
                        currentMenuIndex = 0;
                        about(span);
                        break;
                    case 1:
                        inPage = true;
                        currentMenuIndex = 0;
                        projects(span);
                        break;
                    case 2:
                        inPage = true;
                        contactSelection = true;
                        parameterSelected = 0;
                        currentMenuIndex = 0;
                        contact(span);
                        break;
                    case 3:
                        inPage = true;
                        langSelecton = true;
                        currentMenuIndex = 0;
                        language(span);
                        break;
                }
                break;
        }
    }

    function isMobileDevice() {
        return /Mobi|Android/i.test(navigator.userAgent);
    }

    if (isMobileDevice()) {
        const swipeArea = document.getElementById('main-content');
        const hammer = new Hammer(swipeArea);

        mobile = true;
        textElement.style.fontSize = '0.8rem';

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
});