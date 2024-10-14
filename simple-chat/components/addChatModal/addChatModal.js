import { Modal } from '../Modal/Modal.js';

export function addChatModal() {
  const content = `
    <form id="chatForm">
      <div class="modal-field">
        <label class="modal-label" for="name">Имя:</label>
        <input class="modal-input" type="text" id="name" required />
      </div>
      <div class="modal-field">
        <label class="modal-label" for="avatarFile">Аватар (загрузка):</label>
        <input type="file" id="avatarFile" accept="image/*" />
      </div>
      <button class="modal-button" type="submit">Добавить</button>
    </form>
  `;

  const modalHTML = Modal({
    title: 'Добавить новый контакт',
    content: content,
  });

  const app = document.querySelector('.app');
  app.insertAdjacentHTML('beforeend', modalHTML);
}
