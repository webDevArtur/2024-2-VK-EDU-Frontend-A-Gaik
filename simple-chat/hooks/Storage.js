export function saveMessageToLocalStorage(message) {
  const messageCount = parseInt(localStorage.getItem('messageCount')) || 0
  const newMessageKey = `message_${messageCount + 1}`

  localStorage.setItem(newMessageKey, JSON.stringify(message))
  localStorage.setItem('messageCount', messageCount + 1)
}

export function loadMessagesFromLocalStorage() {
  const messageCount = parseInt(localStorage.getItem('messageCount')) || 0
  const messages = []

  for (let i = 1; i <= messageCount; i++) {
    const message = JSON.parse(localStorage.getItem(`message_${i}`))
    if (message) {
      messages.push(message)
    }
  }

  return messages
}
