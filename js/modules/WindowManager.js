export default class WindowManager {
  constructor(taskbar) {
    this.taskbar = taskbar;
    this.windows = Array.from(document.querySelectorAll('.window'));
    this.minWidth = 200;
    this.minHeight = 150;
    this.edgeTolerance = 10;
    this.taskbarHeight = 34;

    this.isDragging = false;
    this.isResizing = false;
    this.currentWindow = null;
    this.resizeDir = { top: false, bottom: false, left: false, right: false };
    this.dragOffset = { x: 0, y: 0 };

    this.installWindowEvents();
    this.installGlobalEvents();
  }

  getNextZIndex() {
    const zIndexes = this.windows
      .filter(w => w.style.display !== 'none')
      .map(w => parseInt(w.style.zIndex, 10) || 10);
    return (zIndexes.length ? Math.max(...zIndexes) : 9) + 1;
  }

  open(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;
    win.style.display = 'flex';
    win.style.zIndex = this.getNextZIndex();
    const title = win.querySelector('.window-title-bar span')?.textContent || windowId;
    this.taskbar?.addButton(windowId, title, () => {
      win.style.display = 'flex';
      win.style.zIndex = this.getNextZIndex();
    });
  }

  minimize(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;
    win.style.display = 'none';
  }

  close(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;
    win.style.display = 'none';
    this.taskbar?.removeButton(windowId);
  }

  installWindowEvents() {
    this.windows.forEach(win => {
      const titleBar = win.querySelector('.window-title-bar');
      const closeBtn = win.querySelector('.close');
      const minimizeBtn = win.querySelector('.minimize');
      const maximizeBtn = win.querySelector('.maximize');

      if (titleBar) {
        titleBar.addEventListener('mousedown', e => {
          e.preventDefault();
          this.isDragging = true;
          this.currentWindow = win;
          this.currentWindow.style.zIndex = this.getNextZIndex();
          this.dragOffset.x = e.clientX - this.currentWindow.offsetLeft;
          this.dragOffset.y = e.clientY - this.currentWindow.offsetTop;
        });
      }

      win.addEventListener('mousedown', e => {
        if (e.target.closest('.window-content') || e.target.closest('.window-title-bar')) return;
        e.preventDefault();
        this.isResizing = true;
        this.currentWindow = win;
        this.currentWindow.style.zIndex = this.getNextZIndex();
        const rect = this.currentWindow.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        this.resizeDir.top = Math.abs(mouseY - rect.top) < this.edgeTolerance;
        this.resizeDir.bottom = Math.abs(mouseY - rect.bottom) < this.edgeTolerance;
        this.resizeDir.left = Math.abs(mouseX - rect.left) < this.edgeTolerance;
        this.resizeDir.right = Math.abs(mouseX - rect.right) < this.edgeTolerance;
      });

      closeBtn && closeBtn.addEventListener('click', () => this.close(win.id));
      minimizeBtn && minimizeBtn.addEventListener('click', () => this.minimize(win.id));
      maximizeBtn && maximizeBtn.addEventListener('click', () => win.classList.toggle('maximized'));
    });
  }

  installGlobalEvents() {
    document.addEventListener('mousemove', e => {
      // drag
      if (this.isDragging && this.currentWindow) {
        let newLeft = e.clientX - this.dragOffset.x;
        let newTop = e.clientY - this.dragOffset.y;
        const rect = this.currentWindow.getBoundingClientRect();
        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - rect.width));
        newTop = Math.max(0, Math.min(newTop, window.innerHeight - rect.height - this.taskbarHeight));
        this.currentWindow.style.left = `${newLeft}px`;
        this.currentWindow.style.top = `${newTop}px`;
      }

      // resize
      if (this.isResizing && this.currentWindow) {
        const rect = this.currentWindow.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        if (this.resizeDir.right) {
          const newWidth = mouseX - rect.left;
          if (newWidth >= this.minWidth) this.currentWindow.style.width = `${newWidth}px`;
        }
        if (this.resizeDir.bottom) {
          const newHeight = mouseY - rect.top;
          if (newHeight >= this.minHeight && (rect.top + newHeight) <= (window.innerHeight - this.taskbarHeight)) {
            this.currentWindow.style.height = `${newHeight}px`;
          }
        }
        if (this.resizeDir.left) {
          const newLeft = mouseX;
          const newWidth = rect.right - newLeft;
          if (newWidth >= this.minWidth && newLeft >= 0) {
            this.currentWindow.style.left = `${newLeft}px`;
            this.currentWindow.style.width = `${newWidth}px`;
          }
        }
        if (this.resizeDir.top) {
          const newTop = mouseY;
          const newHeight = rect.bottom - newTop;
          if (newHeight >= this.minHeight && newTop >= 0) {
            this.currentWindow.style.top = `${newTop}px`;
            this.currentWindow.style.height = `${newHeight}px`;
          }
        }
      }

      // cursor
      let resizeCursor = 'default';
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      for (let i = 0; i < this.windows.length; i += 1) {
        const win = this.windows[i];
        const rect = win.getBoundingClientRect();
        const overRight = Math.abs(mouseX - rect.right) < this.edgeTolerance;
        const overBottom = Math.abs(mouseY - rect.bottom) < this.edgeTolerance;
        const overLeft = Math.abs(mouseX - rect.left) < this.edgeTolerance;
        const overTop = Math.abs(mouseY - rect.top) < this.edgeTolerance;
        if (win.style.display !== 'none' && parseInt(win.style.zIndex, 10) === this.getNextZIndex() - 1) {
          if (overRight && overBottom) resizeCursor = 'se-resize';
          else if (overRight && overTop) resizeCursor = 'ne-resize';
          else if (overLeft && overBottom) resizeCursor = 'sw-resize';
          else if (overLeft && overTop) resizeCursor = 'nw-resize';
          else if (overRight) resizeCursor = 'e-resize';
          else if (overLeft) resizeCursor = 'w-resize';
          else if (overBottom) resizeCursor = 's-resize';
          else if (overTop) resizeCursor = 'n-resize';
          if (resizeCursor !== 'default') break;
        }
      }
      document.body.style.cursor = resizeCursor;
    });

    document.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.isResizing = false;
      this.currentWindow = null;
      this.resizeDir = { top: false, bottom: false, left: false, right: false };
      document.body.style.cursor = 'default';
    });
  }
}


