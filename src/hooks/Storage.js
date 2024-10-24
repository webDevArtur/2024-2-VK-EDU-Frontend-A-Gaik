export function saveMessageToLocalStorage(message, chatId) {
  const messageCount =
    parseInt(localStorage.getItem(`messageCount_${chatId}`)) || 0;
  const newMessageKey = `message_${chatId}_${messageCount + 1}`;

  localStorage.setItem(newMessageKey, JSON.stringify(message));
  localStorage.setItem(`messageCount_${chatId}`, messageCount + 1);
}

export function loadMessagesFromLocalStorage(chatId) {
  const messageCount =
    parseInt(localStorage.getItem(`messageCount_${chatId}`)) || 0;
  const messages = [];

  for (let i = 1; i <= messageCount; i++) {
    const message = localStorage.getItem(`message_${chatId}_${i}`);
    if (message) {
      messages.push(JSON.parse(message));
    }
  }

  return messages;
}
