let currentTranslations = {}; 

const DEFAULT_LANG = 'fr';

async function loadLanguage(lang) {
    try {
    const response = await fetch(`${lang}.json`);
    if (!response.ok) throw new Error(`Could not load ${lang}.json`);

    currentTranslations = await response.json(); 

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (currentTranslations[key]) {
        element.textContent = currentTranslations[key];
        }
    });

    document.documentElement.lang = lang;
    localStorage.setItem('preferredLanguage', lang);
    updateToggleButton(lang);

    if (typeof draw === 'function') {
        draw();
    }

    } catch (error) {
    console.error("Error swapping languages:", error);
    }
}

function toggleLanguage() {
    const currentLang = localStorage.getItem('preferredLanguage') || DEFAULT_LANG;
    const nextLang = currentLang === 'fr' ? 'en' : 'fr';
    loadLanguage(nextLang);
}

function updateToggleButton(activeLang) {
    const flagSpan = document.getElementById('lang-toggle-flag');
    const textSpan = document.getElementById('lang-toggle-text');

    if (!flagSpan || !textSpan) return;

    if (activeLang === 'fr') {
    flagSpan.className = 'fp fp-fr';
    textSpan.textContent = 'FR';
    } else {
    flagSpan.className = 'fp fp-gb';
    textSpan.textContent = 'EN';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || DEFAULT_LANG;
    loadLanguage(savedLang);
});