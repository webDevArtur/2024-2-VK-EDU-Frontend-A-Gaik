import { Header } from '../components/Header/Header.js';
import { ChatItem } from '../components/ChatItem/ChatItem.js';
import { FloatingActionButton } from '../components/FloatingActionButton/FloatingActionButton.js';
import { Modal } from '../components/Modal/Modal.js';
import { chats } from '../public/mocks.js';

let filteredChats = chats;
let searchValue = '';

function addChat() {
  const modalHTML = Modal();
  const app = document.querySelector('.app');
  app.insertAdjacentHTML('beforeend', modalHTML);

  const form = document.getElementById('chatForm');
  const closeModalButton = document.getElementById('closeModal');

  form.addEventListener('submit', handleSubmit);
  closeModalButton.addEventListener('click', closeModalHandler);
}

function closeModalHandler() {
  const modal = document.querySelector('.modal-overlay');
  if (modal) {
    modal.remove();
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const avatar = document.getElementById('avatar').value;

  if (name && avatar) {
    const newChat = {
      id: String(chats.length + 1),
      avatar: avatar,
      title: name,
      message: '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unreadCount: 0,
      isRead: true,
    };

    chats.push(newChat);
    filteredChats = chats.filter(chat => chat.title.toLowerCase().includes(searchValue.toLowerCase()));
    Chats();
    closeModalHandler();
  }
}

function handleSearch(event) {
  searchValue = event.target.value.trim();
  filteredChats = chats.filter(chat => chat.title.toLowerCase().includes(searchValue.toLowerCase()));

  const chatListContainer = document.querySelector('.chatList');
  
  const chatItemsHtml = filteredChats.map(chat => ChatItem(chat)).join('');
  chatListContainer.innerHTML = chatItemsHtml;
}

export function Chats() {
  const chatList = document.querySelector('.app');
  chatList.innerHTML = '';

  chatList.insertAdjacentHTML('afterbegin', Header());

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = searchValue;
    searchInput.addEventListener('input', handleSearch);
  }

  const chatItemsHtml = filteredChats.map(chat => ChatItem(chat)).join('');
  const chatListContainer = `<div class="chatList">${chatItemsHtml}</div>`;

  chatList.insertAdjacentHTML('beforeend', chatListContainer);
  chatList.appendChild(FloatingActionButton(addChat));
}
