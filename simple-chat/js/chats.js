import { Header } from "../components/Header/Header.js";
import { ChatItem } from "../components/ChatItem/ChatItem.js";
import { FloatingActionButton } from "../components/FloatingActionButton/FloatingActionButton.js";
import { chats } from "../public/mocks.js";
import { addChatModal } from "../components/addChatModal/addChatModal.js";

let filteredChats = chats;
let searchValue = "";

function addChat() {
  addChatModal();

  const form = document.getElementById("chatForm");
  const avatarFileInput = document.getElementById("avatarFile");

  form.addEventListener("submit", (event) =>
    handleSubmit(event, avatarFileInput),
  );
  document
    .querySelector(".modal-close")
    .addEventListener("click", closeModalHandler);
  document
    .querySelector(".modal-overlay")
    .addEventListener("click", closeModalHandler);
}

function closeModalHandler() {
  const modal = document.querySelector(".modal-overlay");
  if (modal) {
    modal.remove();
  }
}

function handleSubmit(event, avatarFileInput) {
  event.preventDefault();
  const name = document.getElementById("name").value;

  if (name) {
    const file = avatarFileInput.files[0];
    const avatar = file
      ? URL.createObjectURL(file)
      : `/2024-2-VK-EDU-Frontend-A-Gaik/defaultAvatar.png`;

    const newChat = {
      id: String(chats.length + 1),
      avatar: avatar,
      title: name,
      message: "",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      unreadCount: 0,
      isRead: true,
    };

    chats.push(newChat);
    filteredChats = chats.filter((chat) =>
      chat.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    Chats();
    closeModalHandler();
  }
}

function handleSearch(event) {
  const newValue = event.target.value.trim();

  if (newValue === searchValue) return;

  searchValue = newValue;

  filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const chatListContainer = document.querySelector(".chatList");

  chatListContainer.innerHTML = "";

  filteredChats.forEach((chat) => {
    const chatItemElement = ChatItem(chat);
    chatListContainer.appendChild(chatItemElement);
  });
}

export function Chats() {
  const chatList = document.querySelector(".app");
  chatList.innerHTML = "";

  chatList.insertAdjacentHTML("afterbegin", Header());

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.value = searchValue;
    searchInput.addEventListener("input", handleSearch);
  }

  const chatListContainer = document.createElement("div");
  chatListContainer.className = "chatList";

  filteredChats.forEach((chat) => {
    const chatItemElement = ChatItem(chat);
    chatListContainer.appendChild(chatItemElement);
  });

  chatList.appendChild(chatListContainer);
  chatList.appendChild(FloatingActionButton(addChat));
}
