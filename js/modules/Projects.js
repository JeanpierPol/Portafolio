export default class Projects {
  constructor(modalManager) {
    this.modalManager = modalManager;
    this.projects = {
      'blog': {
        title: 'Mi Blog Personal',
        description: 'Desarrollo de un blog personal utilizando HTML, CSS y JavaScript para mostrar artículos y noticias. Incluye un diseño responsive y una interfaz de usuario limpia.',
        link: 'https://github.com/JeanpierPol/proyecto'
      },
      'landing': {
        title: 'Clon de Landing Page',
        description: 'Clon de una página de aterrizaje popular, recreada con las últimas tecnologías de frontend, como React y SASS, para practicar la replicación de diseños complejos y optimización de rendimiento.',
        link: 'https://github.com/JeanpierPol/otro-proyecto'
      }
    };

    this.modal = document.getElementById('project-modal');
    this.modalTitle = document.getElementById('modal-title');
    this.modalDescription = document.getElementById('modal-description');
    this.modalLink = document.getElementById('modal-link');
    this.closeModals = document.querySelectorAll('.close-modal');
    this.viewListBtn = document.getElementById('view-list-btn');
    this.viewIconsBtn = document.getElementById('view-icons-btn');
    this.projectFilesContainer = document.getElementById('project-files-container');

    this.install();
  }

  install() {
    document.querySelectorAll('.project-file').forEach(file => {
      file.addEventListener('click', () => {
        const projectId = file.getAttribute('data-project-id');
        const project = this.projects[projectId];
        if (!project) return;
        this.modalTitle.textContent = project.title;
        this.modalDescription.textContent = project.description;
        this.modalLink.href = project.link;
        this.modalManager.open(this.modal);
      });
    });

    this.closeModals.forEach(button => {
      button.addEventListener('click', () => this.modalManager.close(this.modal));
    });

    window.addEventListener('click', event => {
      if (event.target === this.modal) this.modalManager.close(this.modal);
    });

    if (this.viewListBtn && this.viewIconsBtn && this.projectFilesContainer) {
      this.viewListBtn.addEventListener('click', () => {
        this.projectFilesContainer.classList.remove('view-icons');
        this.projectFilesContainer.classList.add('view-list');
        this.viewIconsBtn.classList.remove('active');
        this.viewListBtn.classList.add('active');
      });

      this.viewIconsBtn.addEventListener('click', () => {
        this.projectFilesContainer.classList.remove('view-list');
        this.projectFilesContainer.classList.add('view-icons');
        this.viewListBtn.classList.remove('active');
        this.viewIconsBtn.classList.add('active');
      });
    }
  }
}


