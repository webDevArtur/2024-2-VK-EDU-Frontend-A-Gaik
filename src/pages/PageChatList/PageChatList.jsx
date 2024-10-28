import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatItem from "../../components/ChatItem/ChatItem";
import { initialChats } from "../../assets/mocks";
import FloatingActionButton from "../../components/FloatingActionButton/FloatingActionButton";
import AddChatModal from "../../components/AddChatModal/AddChatModal";
import styles from "./PageChatList.module.scss";

const PageChatList = ({ searchValue }) => {
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem("chats");
    return savedChats ? JSON.parse(savedChats) : initialChats;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const addChat = (newChat) => {
    const updatedChats = [...chats, newChat];
    setChats(updatedChats);
    localStorage.setItem("chats", JSON.stringify(updatedChats));
    setIsModalOpen(false);
  };

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const resetUnreadCount = (chatId) => {
    const updatedChats = chats.map((chat) =>
      chat.id === chatId ? { ...chat, unreadCount: 0 } : chat,
    );
    setChats(updatedChats);
    localStorage.setItem("chats", JSON.stringify(updatedChats));
  };

  const updateChatImage = (chatId, newAvatar) => {
    const updatedChats = chats.map((chat) =>
      chat.id === chatId ? { ...chat, avatar: newAvatar } : chat,
    );
    setChats(updatedChats);
    localStorage.setItem("chats", JSON.stringify(updatedChats));
  };

  return (
    <div className={styles.chatList}>
      {filteredChats.map((chat) => (
        <ChatItem
          key={chat.id}
          {...chat}
          onClick={() => {
            navigate(`/chat/${chat.id}`);
            resetUnreadCount(chat.id);
          }}
          handleImageClick={updateChatImage}
        />
      ))}

      <FloatingActionButton onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <AddChatModal
          onClose={() => setIsModalOpen(false)}
          onAddChat={addChat}
        />
      )}
    </div>
  );
};

export default PageChatList;
