import './MessageList.css'

export function MessageList(messages) {
  const messageListHTML = messages.length
    ? messages
        .map(
          (message) => `
          <div class="${message.source === 'user' ? 'incomingMessage' : 'outgoingMessage'}">
            <div class="messageWrapper">
              <div class="messageSender">${message.sender}</div>
              <div class="messageText">${message.text}</div>
              <div class="messageTimestamp">${message.timestamp}</div>
            </div>
          </div>
      `,
        )
        .join('')
    : `
        <div class="noMessages">
          <img src="/2024-2-VK-EDU-Frontend-A-Gaik/noMessage.png" alt="Нет сообщений" class="noMessagesImage" />
          <div class="noMessagesText">Здесь будет выводиться список<br>Ваших сообщений.</div>
        </div>
      `

  return `
    <div class="messages">${messageListHTML}</div>
  `
}
