import { Header } from '../components/Header/Header.js'
import { ChatItem } from '../components/ChatItem/ChatItem.js'
import { FloatingActionButton } from '../components/FloatingActionButton/FloatingActionButton.js'
import { chats } from '../public/mocks.js';

export function Chats() {
  const chatList = document.querySelector('.app')

  chatList.insertAdjacentHTML('afterbegin', Header())

  const chatItemsHtml = chats.map(chat => ChatItem(chat)).join('');
  const chatListContainer = `<div class="chatList">${chatItemsHtml}</div>`;

  chatList.insertAdjacentHTML('beforeend', chatListContainer);
  chatList.insertAdjacentHTML('beforeend', FloatingActionButton())
}
