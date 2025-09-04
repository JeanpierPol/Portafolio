export default class Desktop {
  constructor(iconsContainerEl, windowManager) {
    this.iconsContainerEl = iconsContainerEl;
    this.windowManager = windowManager;
    if (!this.iconsContainerEl) return;

    this.installIconOpen();
    this.installDragAndDrop();
  }

  installIconOpen() {
    const icons = this.iconsContainerEl.querySelectorAll('.icon');
    icons.forEach(icon => {
      icon.addEventListener('dblclick', e => {
        e.stopPropagation();
        const windowId = icon.getAttribute('data-window-id');
        if (windowId) this.windowManager.open(windowId);
      });
    });
  }

  installDragAndDrop() {
    let draggedIcon = null;

    this.iconsContainerEl.addEventListener('dragstart', event => {
      const target = event.target.closest('.icon');
      if (target) {
        draggedIcon = target;
        setTimeout(() => draggedIcon.classList.add('is-dragging'), 0);
      }
    });

    this.iconsContainerEl.addEventListener('dragover', event => {
      event.preventDefault();
      const dropTarget = event.target.closest('.icon');
      document.querySelectorAll('.icon').forEach(icon => icon.classList.remove('drag-over-active'));
      if (dropTarget && dropTarget !== draggedIcon) dropTarget.classList.add('drag-over-active');
    });

    this.iconsContainerEl.addEventListener('dragleave', () => {
      document.querySelectorAll('.icon').forEach(icon => icon.classList.remove('drag-over-active'));
    });

    this.iconsContainerEl.addEventListener('drop', event => {
      event.preventDefault();
      const dropTarget = event.target.closest('.icon');
      document.querySelectorAll('.icon').forEach(icon => icon.classList.remove('drag-over-active'));
      if (draggedIcon && draggedIcon !== dropTarget) {
        const parent = this.iconsContainerEl;
        if (dropTarget) {
          const draggedIndex = Array.from(parent.children).indexOf(draggedIcon);
          const dropIndex = Array.from(parent.children).indexOf(dropTarget);
          if (draggedIndex < dropIndex) parent.insertBefore(draggedIcon, dropTarget.nextSibling);
          else parent.insertBefore(draggedIcon, dropTarget);
        } else {
          parent.appendChild(draggedIcon);
        }
      }
      if (draggedIcon) {
        draggedIcon.classList.remove('is-dragging');
        draggedIcon = null;
      }
    });

    this.iconsContainerEl.addEventListener('dragend', () => {
      if (draggedIcon) draggedIcon.classList.remove('is-dragging');
    });
  }
}


