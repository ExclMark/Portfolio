let lang;

async function loadLocalization(language) {
    try {
        const response = await fetch('/src/localization.json');
        const localizationData = await response.json();
        return localizationData[language];
    } catch (error) {
        console.error('Error loading localization data:', error);
    }
}

async function setLocalization(language) {
    lang = await loadLocalization(language);
}

async function getLocalization() {
    let userLang = navigator.languages

    let defLang = userLang.some(lang => ['ru', 'uk'].includes(lang)) ? 'uk' : 'en';
    let localLang = localStorage.getItem('lang') || defLang;

    if (!lang) {
        await setLocalization(localLang);
    }
    return lang;
}