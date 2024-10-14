import { Chat } from './chat.js';
import { Chats } from './chats.js';

const app = document.querySelector('.app');

const router = () => {
  const path = window.location.pathname;

  app.innerHTML = '';

  const chatIdMatch = path.match(/\/chat\/(\d+)/);
  if (chatIdMatch) {
    Chat(chatIdMatch[1]);
  } else {
    Chats();
  }
};

const navigateTo = (path) => {
  history.pushState(null, null, path);
  router();
};

document.body.addEventListener('click', (e) => {
  const linkElement = e.target.closest('.link');

  if (linkElement) {
    navigateTo(linkElement.getAttribute('data-link'));
  }
});

window.addEventListener('popstate', router);

router();
