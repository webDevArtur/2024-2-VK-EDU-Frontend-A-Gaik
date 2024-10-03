import './index.css';

const form = document.querySelector('form');
const input = document.querySelector('.formInput');
const messagesContainer = document.querySelector('.messages');

window.addEventListener('DOMContentLoaded', loadMessages);

form.addEventListener('submit', handleSubmit);
form.addEventListener('keypress', handleKeyPress);

function handleSubmit(event) {
    event.preventDefault();

    const messageText = input.value.trim();
    
    if (messageText === '') {
        return;
    }

    const message = {
        text: messageText,
        sender: 'Иван Иванов',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    addMessageToDOM(message);
    saveMessageToLocalStorage(message);
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


function saveMessageToLocalStorage(message) {
    const messageCount = parseInt(localStorage.getItem('messageCount')) || 0;
    const newMessageKey = `message_${messageCount + 1}`;

    localStorage.setItem(newMessageKey, JSON.stringify(message));
    localStorage.setItem('messageCount', messageCount + 1);
}

function displayNoMessages() {
    const noMessagesElement = document.createElement('div');
    noMessagesElement.classList.add('noMessages');
        
    const imageElement = document.createElement('img');
    imageElement.src = 'public/noMessage.png';
    imageElement.alt = 'Нет сообщений';
    imageElement.classList.add('noMessagesImage');

    const textElement = document.createElement('div');
    textElement.innerHTML = 'Здесь будет выводиться список<br>Ваших сообщений.';
    textElement.classList.add('noMessagesText');

    noMessagesElement.appendChild(imageElement);
    noMessagesElement.appendChild(textElement);

    messagesContainer.appendChild(noMessagesElement);
}

function loadMessages() {
    messagesContainer.innerHTML = '';

    const messageCount = parseInt(localStorage.getItem('messageCount')) || 0;

    if (messageCount === 0) {
        displayNoMessages();
        return;
    }

    for (let i = 1; i <= messageCount; i++) {
        const message = JSON.parse(localStorage.getItem(`message_${i}`));
        if (message) {
            addMessageToDOM(message);
        }
    }
}



