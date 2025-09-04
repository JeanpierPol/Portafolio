export default class ContactForm {
  constructor(modalManager) {
    this.modalManager = modalManager;
    this.form = document.getElementById('contact-form');
    this.messageBox = document.getElementById('message-box');
    this.messageText = document.getElementById('message-box-text');
    this.install();
  }

  install() {
    if (!this.form) return;
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      const subject = `Mensaje de Portafolio de ${name}`;
      const body = `De: ${name} <${email}>\n\n${message}`;
      const mailtoLink = `mailto:jeanpiernunezsanchez@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
      if (this.messageText && this.messageBox) {
        this.messageText.textContent = '¡Mensaje enviado con éxito!';
        this.messageBox.style.display = 'block';
      }
      this.form.reset();
    });
  }
}


