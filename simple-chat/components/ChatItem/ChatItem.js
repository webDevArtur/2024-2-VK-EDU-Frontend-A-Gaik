import './ChatItem.css'

export function ChatItem({
  avatar,
  title,
  message,
  time,
  unreadCount,
  isRead,
}) {
  return `
        <a href="chat.html" class="chatItem">
            <img src="${avatar}" alt="Avatar" class="avatar">
            <div class="chatDetails">
                <h2>${title}</h2>
                <p>${message}</p>
            </div>
            <div class="chatMeta">
                <span class="time">${time}</span>
                ${unreadCount > 0 ? `<span class="badge">${unreadCount}</span>` : `<icon class="material-icons readIcon">${isRead ? 'done' : 'done_all'}</icon>`}
            </div>
        </a>
    `
}
