export default class Taskbar {
  constructor(buttonsContainerEl) {
    this.buttonsContainerEl = buttonsContainerEl;
  }

  addButton(windowId, title, onClick) {
    let btn = document.getElementById(`taskbar-btn-${windowId}`);
    if (btn) return btn;
    btn = document.createElement('div');
    btn.id = `taskbar-btn-${windowId}`;
    btn.className = 'taskbar-button';
    btn.textContent = title;
    btn.addEventListener('click', () => onClick && onClick());
    this.buttonsContainerEl && this.buttonsContainerEl.appendChild(btn);
    return btn;
  }

  removeButton(windowId) {
    const btn = document.getElementById(`taskbar-btn-${windowId}`);
    if (btn) btn.remove();
  }
}


