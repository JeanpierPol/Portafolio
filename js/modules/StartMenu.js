export default class StartMenu {
  constructor(startButtonEl, startMenuEl, windowManager) {
    this.startButtonEl = startButtonEl;
    this.startMenuEl = startMenuEl;
    this.windowManager = windowManager;

    this.myProfileBtn = document.getElementById('my-profile-btn');
    this.shutdownBtn = document.getElementById('shutdown-btn');
    this.restartBtn = document.getElementById('restart-btn');
    this.settingsBtn = document.getElementById('settings-btn');
    this.confirmationModal = document.getElementById('confirmation-modal');
    this.confirmationText = document.getElementById('confirmation-text');
    this.confirmYesBtn = document.getElementById('confirm-yes');
    this.confirmNoBtn = document.getElementById('confirm-no');
    this.desktopContainer = document.getElementById('desktop-container');
    this.bootScreen = document.getElementById('boot-screen');
    this.bootText = document.getElementById('boot-text');
    this.currentAction = null;

    this.install();
  }

  install() {
    if (this.startButtonEl) {
      this.startButtonEl.addEventListener('click', e => {
        e.stopPropagation();
        if (this.startMenuEl) {
          this.startMenuEl.style.display = this.startMenuEl.style.display === 'flex' ? 'none' : 'flex';
        }
      });
    }

    document.addEventListener('click', e => {
      if (this.startMenuEl && !e.target.closest('.start-button') && !e.target.closest('.start-menu')) {
        this.startMenuEl.style.display = 'none';
      }
    });

    this.myProfileBtn && this.myProfileBtn.addEventListener('click', () => {
      this.windowManager.open('profile');
      if (this.startMenuEl) this.startMenuEl.style.display = 'none';
    });

    this.settingsBtn && this.settingsBtn.addEventListener('click', () => {
      this.windowManager.open('settings');
      if (this.startMenuEl) this.startMenuEl.style.display = 'none';
    });

    this.shutdownBtn && this.shutdownBtn.addEventListener('click', () => {
      if (!this.confirmationModal) return;
      const lang = window.localStorage.getItem('pref_lang') || 'es';
      const dict = {
        es: '¿Estás seguro de que quieres apagar el sistema?',
        en: 'Are you sure you want to shut down?'
      };
      this.confirmationText.textContent = dict[lang] || dict.es;
      this.confirmationModal.style.display = 'flex';
      this.currentAction = 'shutdown';
      if (this.startMenuEl) this.startMenuEl.style.display = 'none';
    });

    this.restartBtn && this.restartBtn.addEventListener('click', () => {
      if (!this.confirmationModal) return;
      const lang = window.localStorage.getItem('pref_lang') || 'es';
      const dict = {
        es: '¿Estás seguro de que quieres reiniciar el sistema?',
        en: 'Are you sure you want to restart?'
      };
      this.confirmationText.textContent = dict[lang] || dict.es;
      this.confirmationModal.style.display = 'flex';
      this.currentAction = 'restart';
      if (this.startMenuEl) this.startMenuEl.style.display = 'none';
    });

    this.confirmYesBtn && this.confirmYesBtn.addEventListener('click', () => {
      this.confirmationModal.style.display = 'none';
      if (this.currentAction === 'shutdown') {
        if (this.desktopContainer) this.desktopContainer.style.display = 'none';
        if (this.bootScreen) this.bootScreen.style.display = 'flex';
        if (this.bootText) this.bootText.textContent = 'Shutting down... It is now safe to turn off your computer.';
      } else if (this.currentAction === 'restart') {
        window.location.reload();
      }
      this.currentAction = null;
    });

    this.confirmNoBtn && this.confirmNoBtn.addEventListener('click', () => {
      this.confirmationModal.style.display = 'none';
      this.currentAction = null;
    });
  }
}


