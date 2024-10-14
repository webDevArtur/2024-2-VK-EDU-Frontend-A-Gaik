import './Modal.css';

export function Modal({ title, content }) {
  return `
    <div class="modal-overlay" onclick="closeModalHandler()">
      <div class="modal" onclick="event.stopPropagation()">
        <button class="modal-close">&times;</button>
        <h2 class="modal-title">${title}</h2>
        <div class="modal-content">${content}</div>
      </div>
    </div>
  `;
}
