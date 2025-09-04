export default class ModalManager {
  constructor() {
    this.activeModals = new Set();
  }

  open(modalEl) {
    if (!modalEl) return;
    modalEl.style.display = 'block';
    this.activeModals.add(modalEl);
  }

  close(modalEl) {
    if (!modalEl) return;
    modalEl.style.display = 'none';
    this.activeModals.delete(modalEl);
  }
}


