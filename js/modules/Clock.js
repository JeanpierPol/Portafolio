export default class Clock {
  constructor(clockEl) {
    this.clockEl = clockEl;
    if (this.clockEl) {
      this.update();
      setInterval(() => this.update(), 1000);
    }
  }

  update() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    this.clockEl.textContent = `${hours}:${minutes}`;
  }
}


