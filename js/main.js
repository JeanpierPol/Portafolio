import BootScreen from './modules/BootScreen.js';
import Taskbar from './modules/Taskbar.js';
import WindowManager from './modules/WindowManager.js';
import Desktop from './modules/Desktop.js';
import StartMenu from './modules/StartMenu.js';
import ModalManager from './modules/ModalManager.js';
import ContactForm from './modules/ContactForm.js';
import Clock from './modules/Clock.js';
import Projects from './modules/Projects.js';

document.addEventListener('DOMContentLoaded', () => {
  const boot = new BootScreen(
    document.getElementById('boot-screen'),
    document.getElementById('boot-text'),
    document.getElementById('desktop-container')
  );

  const taskbar = new Taskbar(document.getElementById('taskbar-buttons'));

  const wm = new WindowManager(taskbar);

  const desktop = new Desktop(
    document.querySelector('.desktop-icons'),
    wm
  );

  const startMenu = new StartMenu(
    document.getElementById('start-button'),
    document.getElementById('start-menu'),
    wm
  );

  const clock = new Clock(document.getElementById('clock'));

  const modalManager = new ModalManager();

  const projects = new Projects(modalManager);

  const contactForm = new ContactForm(modalManager);

  console.log('Portfolio Win95 inicializado 🚀');
});


