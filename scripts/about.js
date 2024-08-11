let localization;

document.addEventListener("DOMContentLoaded", async () => {
    localization = await getLocalization();
    let textElement = document.getElementById("animated-text");
    textElement.style.overflow = 'hidden';

    localStorage.setItem("preBoot", "true");
    localStorage.setItem("previousParameter", 0);

    setHorizontal();

    textElement.textContent = '';
    const span = document.createElement('span');
    span.className = 'pwd';
    textElement.appendChild(span);

    let currentMenuIndex = 0;
    let page = 1;
    let totalPages = 1;
    let loaded = false
    let pages;
    const menuSpeed = 5;

    function getLineHeight(element) {
        const computedStyle = window.getComputedStyle(element);
        return parseFloat(computedStyle.lineHeight);
    }
    
    function getNumberOfLines() {
        const height = textElement.clientHeight;
        const lineHeight = getLineHeight(textElement);
        return Math.floor(height / lineHeight) - 2;
    }

    function getNumberOfCharactersPerLine() {
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.whiteSpace = 'pre-wrap';
        tempSpan.style.width = textElement.clientWidth + 'px';
        tempSpan.style.fontSize = window.getComputedStyle(textElement).fontSize;
        tempSpan.style.lineHeight = getLineHeight(textElement) + 'px';
        document.body.appendChild(tempSpan);

        tempSpan.textContent = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const characterWidth = tempSpan.scrollWidth / tempSpan.textContent.length;
        document.body.removeChild(tempSpan);

        return Math.floor(textElement.clientWidth / characterWidth);
    }

    function paginateText(text,) {
        const lines = text.split('\n');
        const pages = [];
        let currentPage = '';
        let charsPerLine = getNumberOfCharactersPerLine();
        let linesPerPage = getNumberOfLines();

        lines.forEach(line => {
            while (line.length > charsPerLine) {
                let breakPoint = line.lastIndexOf(' ', charsPerLine);
                if (breakPoint === -1) breakPoint = charsPerLine;
                
                let currentLine = line.slice(0, breakPoint).trim();
                line = line.slice(breakPoint).trim();
                currentPage += currentLine + '\n';
    
                if (currentPage.split('\n').length >= linesPerPage) {
                    pages.push(currentPage.trim() + "\n...");
                    currentPage = '';
                }
            }
            currentPage += line + '\n';

            if (currentPage.split('\n').length >= linesPerPage) {
                pages.push(currentPage.trim() + "\n...");
                currentPage = '';
            }
        });

        if (currentPage) {
            pages.push(currentPage.trim());
        }

        totalPages = pages.length;

        return pages;
    }  

    function about(span) {
        if (loaded) {
            textElement.innerHTML = `<span class='pwd'>./about - [${page}/${totalPages}]</span>\n\n`;
            textElement.innerHTML += pages[page - 1];
        } else {
            let text = pages[page - 1];
        
            if (currentMenuIndex < text.length) {
                textElement.innerHTML += text[currentMenuIndex];
                currentMenuIndex++;
                setTimeout(() => about(span), menuSpeed);
            } else {
                loaded = true;
            }
        }
    }

    function updateHeader() {
        textElement.textContent = '';
        let text = localization.page_hint + "\n\n"
        text += localization.about_me + "\n\n";
        text += localization.passion + "\n\n";
        text += localization.certs + "\n" + localization.cert_list + "\n\n";
        text += localization.languages + "\n" + localization.lang_list + "\n\n";
        text += localization.ending;
        text += mobile ? "\n\n" + localization.mob_exit : "\n\n" + localization.exit;
        pages = paginateText(String(text));
        const span = document.createElement('span');
        span.className = 'pwd';
        textElement.appendChild(span);
        span.textContent = `./about - [${page}/${totalPages}]\n\n`;
        currentMenuIndex = 0;
        loaded = false;
        about(span);
    }

    updateHeader();

    document.addEventListener('keydown', handleKeydown);

    function handleKeydown(event) {
        if (!loaded) {
            loaded = true;
            return;
        }
        if (event.key === 'Enter') {
            document.removeEventListener('keydown', handleKeydown);
            window.location.href = '/';
        }
        if (event.key == "ArrowRight") {
            if (page < totalPages) {
                page++;
                updateHeader();
            }
        } else if (event.key == "ArrowLeft") {
            if (page > 1) {
                page--;
                updateHeader();
            }
        }
    }
});