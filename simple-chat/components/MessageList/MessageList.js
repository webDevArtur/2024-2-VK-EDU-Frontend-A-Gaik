import './MessageList.css'

export function MessageList(messages) {
  const messageListHTML = messages.length
    ? messages
        .map(
          (message) => `
        <div class="messageWrapper">
          <div class="messageSender">${message.sender}</div>
          <div class="messageText">${message.text}</div>
          <div class="messageTimestamp">${message.timestamp}</div>
        </div>
      `,
        )
        .join('')
    : `
        <div class="noMessages">
          <img src="public/noMessage.png" alt="Нет сообщений" class="noMessagesImage" />
          <div class="noMessagesText">Здесь будет выводиться список<br>Ваших сообщений.</div>
        </div>
      `

  return `
    <div class="messages">${messageListHTML}</div>
  `
}
