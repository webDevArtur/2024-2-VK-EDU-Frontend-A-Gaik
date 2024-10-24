import React, { useState } from "react";
import ChatItem from "../../components/ChatItem/ChatItem";
import { initialChats } from "../../assets/mocks";
import FloatingActionButton from "../../components/FloatingActionButton/FloatingActionButton";
import AddChatModal from "../../components/AddChatModal/AddChatModal";
import styles from "./PageChatList.module.scss";

const PageChatList = ({ navigateToChat, searchValue }) => {
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem("chats");
    return savedChats ? JSON.parse(savedChats) : initialChats;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const addChat = (newChat) => {
    const updatedChats = [...chats, newChat];
    setChats(updatedChats);
    localStorage.setItem("chats", JSON.stringify(updatedChats));
    setIsModalOpen(false);
  };

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div className={styles.chatList}>
      {filteredChats.map((chat) => (
        <ChatItem
          key={chat.id}
          {...chat}
          onClick={() => navigateToChat(chat.id)}
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
