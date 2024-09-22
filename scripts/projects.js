let localization;

document.addEventListener("DOMContentLoaded", async () => {
    localization = await getLocalization();
    let textElement = document.getElementById("animated-text");

    localStorage.setItem("preBoot", "true");
    localStorage.setItem("previousParameter", 1);

    textElement.textContent = '';
    const span = document.createElement('span');
    span.className = 'pwd';
    textElement.appendChild(span);

    let currentMenuIndex = 0;
    let parameterSelected = parseInt(localStorage.getItem("previousProject")) || 0;
    let select = false;
    let command = true;
    let skip = false;
    let ud = false;
    const menuSpeed = 5;

    function projects(span) {
        let text = "";
        let mob = "";

        text = "./projects\n";
        text += mobile ? "\n" + localization.mob_nav + "\n\n" : "\n" + localization.nav + "\n\n";
        text += parameterSelected == 0 ? "> " + localization.project.portfolio.alias + " <\n" : localization.project.portfolio.alias + "\n";
        text += parameterSelected == 1 ? "> " + localization.project.economybot.alias + " <\n" : localization.project.economybot.alias + "\n";
        text += parameterSelected == 2 ? "> " + localization.project.rpoxubot.alias + " <\n" : localization.project.rpoxubot.alias + "\n";
        text += parameterSelected == 3 ? "> " + localization.project.tictactoe.alias + " <\n" : localization.project.tictactoe.alias + "\n";
        text += parameterSelected == 4 ? "> " + localization.project.subnetcalc.alias + " <\n\n" : localization.project.subnetcalc.alias + "\n\n";
        text += parameterSelected == 5 ? "> " + localization.back + " <" : localization.back;
        textElement.scrollTop = parameterSelected * 20;

        if (skip) {
            text = "<span class='pwd'>./projects</span>\n";
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
            text += parameterSelected == 0 ? "<span class='select'>> " + localization.project.portfolio.alias + " <</span>\n" : localization.project.portfolio.alias + "\n";
            text += parameterSelected == 1 ? "<span class='select'>> " + localization.project.economybot.alias + " <</span>\n" : localization.project.economybot.alias + "\n";
            text += parameterSelected == 2 ? "<span class='select'>> " + localization.project.rpoxubot.alias + " <</span>\n" : localization.project.rpoxubot.alias + "\n";
            text += parameterSelected == 3 ? "<span class='select'>> " + localization.project.tictactoe.alias + " <</span>\n" : localization.project.tictactoe.alias + "\n";
            text += parameterSelected == 4 ? "<span class='select'>> " + localization.project.subnetcalc.alias + " <</span>\n\n" : localization.project.subnetcalc.alias + "\n\n";
            text += parameterSelected == 5 ? "<span class='select'>> " + localization.back + " <" : localization.back;
            textElement.innerHTML = text;
        } else {
            let index = 0;
            let mobCorrect = localization.lang == "en" ? (mobile ? 2 : 0) : (mobile ? 1 : 0);
            if (parameterSelected == 0) {
                index = localization.lang == "en" ? 59 - mobCorrect : 74 - mobCorrect;
            } else if (parameterSelected == 1) {
                index = localization.lang == "en" ? 69 - mobCorrect : 84 - mobCorrect;
            } else if (parameterSelected == 2) {
                index = localization.lang == "en" ? 81 - mobCorrect : 100 - mobCorrect;
            } else if (parameterSelected == 3) {
                index = localization.lang == "en" ? 96 - mobCorrect : 117 - mobCorrect;
            } else if (parameterSelected == 4) {
                index = localization.lang == "en" ? 108 - mobCorrect : 133 - mobCorrect;
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
                setTimeout(() => projects(span), menuSpeed);
            } else {
                command = true;
                skip = true;
            }
        }
    }

    projects(span);

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
                parameterSelected = (parameterSelected - 1 + 6) % 6;
                projects(span);
                break;
            case 'ArrowDown':
                parameterSelected = (parameterSelected + 1) % 6;
                projects(span);
                break;
            case 'Enter':
                let localhost = false;
                switch (parameterSelected) {
                    case 0:
                        window.location.href = localhost ? '/projects/portfolio.html' : '/projects/portfolio';
                        break;
                    case 1:
                        window.location.href = localhost ? '/projects/economybot.html' : '/projects/economybot';
                        break;
                    case 2:
                        window.location.href = localhost ? '/projects/rpoxubot.html' : '/projects/rpoxubot';
                        break;
                    case 3:
                        window.location.href = localhost ? '/projects/tictactoe.html' : '/projects/tictactoe';
                        break;
                    case 4:
                        window.location.href = localhost ? '/projects/subnetcalc.html' : '/projects/subnetcalc';
                        break;
                    case 5:
                        document.removeEventListener('keydown', handleKeydown);
                        localStorage.setItem("previousProject", 0);
                        window.location.href = '/';
                        break
                }

        }
    }
});

