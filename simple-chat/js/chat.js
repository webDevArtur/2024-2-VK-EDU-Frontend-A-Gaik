import { Header } from '../components/Header/Header.js';
import { MessageList } from '../components/MessageList/MessageList.js';
import { MessageForm } from '../components/MessageForm/MessageForm.js';
import {
  saveMessageToLocalStorage,
  loadMessagesFromLocalStorage,
} from '../hooks/Storage.js';
import { mockMessages } from '../public/messages.js';

function loadMessages(chatId) {
  const messagesList = loadMessagesFromLocalStorage(chatId);
  const friendMessages = mockMessages.filter(
    (message) => message.chatId === chatId
  );
  const messages = [...friendMessages, ...messagesList];

  document.querySelector('.app').insertAdjacentHTML('afterbegin', Header(true));
  document
    .querySelector('.app')
    .insertAdjacentHTML('beforeend', MessageList(messages));
  document.querySelector('.app').insertAdjacentHTML('beforeend', MessageForm());
}

export function Chat(chatId) {
  loadMessages(chatId);

  const form = document.querySelector('form');
  const input = document.querySelector('.formInput');
  const messagesContainer = document.querySelector('.messages');

  form.addEventListener('submit', handleSubmit);
  form.addEventListener('keypress', handleKeyPress);

  function handleSubmit(event) {
    event.preventDefault();
    const messageText = input.value.trim();
    if (messageText === '') return;

    const message = {
      text: messageText,
      sender: 'Иван Иванов',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    addMessageToDOM(message);
    saveMessageToLocalStorage(message, chatId);
    input.value = '';
    input.focus();
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  function addMessageToDOM(message) {
    const noMessagesElement = document.querySelector('.noMessages');
    if (noMessagesElement) {
      noMessagesElement.remove();
    }

    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('messageWrapper');

    const senderElement = document.createElement('div');
    senderElement.classList.add('messageSender');
    senderElement.innerText = message.sender;

    const textElement = document.createElement('div');
    textElement.classList.add('messageText');
    textElement.innerText = message.text;

    const timestampElement = document.createElement('div');
    timestampElement.classList.add('messageTimestamp');
    timestampElement.innerText = message.timestamp;

    messageWrapper.appendChild(senderElement);
    messageWrapper.appendChild(textElement);
    messageWrapper.appendChild(timestampElement);

    messagesContainer.appendChild(messageWrapper);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}
