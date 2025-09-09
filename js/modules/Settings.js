export default class Settings {
  constructor() {
    this.langKey = 'pref_lang';
    this.themeKey = 'pref_theme';
    this.supportedLangs = ['es', 'en'];
    this.translations = {
      es: {
        start: 'Inicio',
        shutdown: 'Apagar',
        restart: 'Reiniciar',
        myProfile: 'Mi Perfil',
        myCv: 'Mi CV.pdf',
        projects: 'Proyectos',
        contact: 'Contacto',
        contactTitle: 'Enviar un Mensaje',
        name: 'Tu Nombre:',
        email: 'Tu Correo Electrónico:',
        message: 'Mensaje:',
        send: 'Enviar',
        sendMessage: 'Enviar mensaje',
        aboutMe: 'Sobre mí',
        socials: 'Redes sociales',
        experience: 'Experiencia',
        settings: 'Configuraciones',
        theme: 'Tema',
        light: 'Claro',
        dark: 'Oscuro',
        language: 'Idioma',
        spanish: 'Español',
        english: 'Inglés',
        confirmShutdown: '¿Estás seguro de que quieres apagar el sistema?',
        confirmRestart: '¿Estás seguro de que quieres reiniciar el sistema?',
      },
      en: {
        start: 'Start',
        shutdown: 'Shutdown',
        restart: 'Restart',
        myProfile: 'My Profile',
        myCv: 'My Resume.pdf',
        projects: 'Projects',
        contact: 'Contact',
        contactTitle: 'Send a Message',
        name: 'Your Name:',
        email: 'Your Email:',
        message: 'Message:',
        send: 'Send',
        sendMessage: 'Send message',
        aboutMe: 'About me',
        socials: 'Socials',
        experience: 'Experience',
        settings: 'Settings',
        theme: 'Theme',
        light: 'Light',
        dark: 'Dark',
        language: 'Language',
        spanish: 'Spanish',
        english: 'English',
        confirmShutdown: 'Are you sure you want to shut down?',
        confirmRestart: 'Are you sure you want to restart?',
      }
    };
  }

  applySavedPreferences() {
    const savedLang = window.localStorage.getItem(this.langKey) || this.getDefaultLang();
    const savedTheme = window.localStorage.getItem(this.themeKey) || 'light';
    this.setLanguage(savedLang);
    this.setTheme(savedTheme);
    this.installUI(savedLang, savedTheme);
  }

  getDefaultLang() {
    const nav = (navigator.language || 'es').slice(0, 2).toLowerCase();
    return this.supportedLangs.includes(nav) ? nav : 'es';
  }

  setLanguage(lang) {
    if (!this.supportedLangs.includes(lang)) return;
    window.localStorage.setItem(this.langKey, lang);
    const dict = this.translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
    // Update attributes like html lang
    const html = document.documentElement;
    if (html) html.setAttribute('lang', lang);
  }

  setTheme(theme) {
    const allowed = ['light', 'dark'];
    if (!allowed.includes(theme)) return;
    window.localStorage.setItem(this.themeKey, theme);
    document.documentElement.dataset.theme = theme;
  }

  installUI(currentLang, currentTheme) {
    const langSelect = document.getElementById('settings-language');
    const themeSelect = document.getElementById('settings-theme');
    if (langSelect) {
      langSelect.value = currentLang;
      langSelect.addEventListener('change', () => this.setLanguage(langSelect.value));
    }
    if (themeSelect) {
      themeSelect.value = currentTheme;
      themeSelect.addEventListener('change', () => this.setTheme(themeSelect.value));
    }
  }
}

