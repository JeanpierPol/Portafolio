export default class BootScreen {
  constructor(bootScreenEl, bootTextEl, desktopContainerEl) {
    this.bootScreenEl = bootScreenEl;
    this.bootTextEl = bootTextEl;
    this.desktopContainerEl = desktopContainerEl;

    this.messages = [
      'MS-DOS v6.22',
      'Copyright (C) Os 1981-1994.',
      'C:> Loading OS...',
      'Loading SYSTEM32.DLL... OK',
      'Loading KERNEL.EXE... OK',
      'Initializing graphical interface... OK',
      'Welcome to Os 95!',
      'C:>'
    ];

    this.messageIndex = 0;
    this.charIndex = 0;

    if (this.bootScreenEl && this.bootTextEl) {
      const params = new URLSearchParams(window.location.search);
      const fast = params.get('fast') === '1' || window.localStorage.getItem('skipBoot') === '1';
      if (fast) {
        // saltar animación de boot para desarrollo
        this.finishBootImmediately();
      } else {
        this.typeNextChar();
      }
    }
  }

  typeNextChar() {
    if (this.messageIndex < this.messages.length) {
      const current = this.messages[this.messageIndex];
      if (this.charIndex < current.length) {
        this.bootTextEl.textContent += current.charAt(this.charIndex);
        this.charIndex += 1;
        setTimeout(() => this.typeNextChar(), 50);
      } else {
        this.bootTextEl.textContent += '\n';
        this.messageIndex += 1;
        this.charIndex = 0;
        setTimeout(() => this.typeNextChar(), 500);
      }
    } else {
      setTimeout(() => {
        if (this.bootScreenEl) this.bootScreenEl.style.display = 'none';
        if (this.desktopContainerEl) this.desktopContainerEl.style.display = 'flex';
      }, 1000);
    }
  }

  finishBootImmediately() {
    if (this.bootScreenEl) this.bootScreenEl.style.display = 'none';
    if (this.desktopContainerEl) this.desktopContainerEl.style.display = 'flex';
  }
}


