import './ChatItem.css';

export function ChatItem({
  id,
  avatar,
  title,
  message,
  time,
  unreadCount,
  isRead,
}) {
  const chatItem = document.createElement('div');
  chatItem.dataset.link = `/2024-2-VK-EDU-Frontend-A-Gaik/chat/${id}`;
  chatItem.className = 'chatItem link';

  chatItem.insertAdjacentHTML(
    'beforeend',
    `
    <img src="${avatar}" alt="Avatar" class="avatar">
    <div class="chatDetails">
        <h2>${title}</h2>
        <p>${message}</p>
    </div>
    <div class="chatMeta">
        <span class="time">${time}</span>
        ${unreadCount > 0 ? `<span class="badge">${unreadCount}</span>` : `<icon class="material-icons readIcon">${isRead ? 'done' : 'done_all'}</icon>`}
    </div>
  `
  );

  return chatItem;
}
