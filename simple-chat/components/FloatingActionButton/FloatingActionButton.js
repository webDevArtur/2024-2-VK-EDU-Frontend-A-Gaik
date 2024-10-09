import './FloatingActionButton.css';

export function FloatingActionButton(addChatCallback) {
  const button = document.createElement('button');
  button.className = 'fab';
  button.innerHTML = `<i class="material-icons">mode_edit</i>`;

  button.addEventListener('click', () => {
    addChatCallback();  
  });

  return button;
}
