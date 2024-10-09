import './Modal.css';

export function Modal() {
  return `
    <div class="modal-overlay">
      <div class="modal">
        <h2 class="modal-title">Добавить новый контакт</h2>

        <form id="chatForm">
          <div class="modal-field">
            <label class="modal-label" for="name">Имя:</label>

            <input class="modal-input" type="text" id="name" required />
          </div>

          <div class="modal-field">
            <label class="modal-label" for="avatar">URL аватара:</label>

            <input class="modal-input" type="text" id="avatar" required />
          </div>

          <button class="modal-button" type="submit">Добавить</button>
          
          <button class="modal-button modal-button-close" type="button" id="closeModal">Закрыть</button>
        </form>
      </div>
    </div>
  `;
}
