function project(span) {
    if (loaded) {
        textElement.innerHTML = `<span class='pwd'>./projects/${project_name} - [${page}/${totalPages}]</span>\n\n`;
        let text = pages[page - 1];
        bold = false;
        link = false;
        ud = false;
        let formattedText = "";

        for (let i = 0; i < text.length; i++) {
            if (text[i] == "|" && !bold) {
                formattedText += "<span class='folder'>";
                bold = true;
            } else if (text[i] == "|" && bold) {
                formattedText += "</span>";
                bold = false;
            } else if (text[i] == "~" && !link) {
                formattedText += "<span class='file'>";
                link = true;
            } else if (text[i] == "~" && link) {
                formattedText += "</span>";
                link = false;
            } else if (text[i] == "_" && !ud) {
                formattedText += "<span class='ud'>";
                ud = true;
            } else if (text[i] == "_" && ud) {
                formattedText += "</span>";
                ud = false;
            } else {
                formattedText += text[i];
            }
        }

        bold = false;
        link = false;
        ud = false;
        textElement.innerHTML += formattedText;
    } else {
        let text = pages[page - 1];
    
        if (currentMenuIndex < text.length) {
            if (text[currentMenuIndex] === "|" && !bold) {
                span = document.createElement('span');
                span.className = 'folder';
                textElement.appendChild(span);
                bold = true;
            } else if (text[currentMenuIndex] === "|" && bold) {
                bold = false
            }
            if (text[currentMenuIndex] === "~" && !link) {
                span = document.createElement('span');
                span.className = 'file';
                textElement.appendChild(span);
                link = true;
            } else if (text[currentMenuIndex] === "~" && link) {
                link = false
            }
            if (text[currentMenuIndex] === "_" && !ud) {
                span = document.createElement('span');
                span.className = 'ud';
                textElement.appendChild(span);
                ud = true;
            } else if (text[currentMenuIndex] === "_" && ud) {
                ud = false
            }
            if (bold) {
                span.innerHTML += text[currentMenuIndex] === "|" ? "" : text[currentMenuIndex];
            } else if (link) {
                span.innerHTML += text[currentMenuIndex] === "~" ? "" : text[currentMenuIndex];
            } else if (ud) {
                span.innerHTML += text[currentMenuIndex] === "_" ? "" : text[currentMenuIndex];
            } else {
                textElement.innerHTML += ["~", "|", "_"].includes(text[currentMenuIndex]) ? "" : text[currentMenuIndex];
            }
            currentMenuIndex++;
            setTimeout(() => project(span), menuSpeed);
        } else {
            loaded = true;
        }
    }
}