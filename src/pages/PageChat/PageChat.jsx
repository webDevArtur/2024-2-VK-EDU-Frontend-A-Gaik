import React, { useEffect, useState } from "react";
import MessageList from "../../components/MessageList/MessageList";
import MessageForm from "../../components/MessageForm/MessageForm";
import {
  loadMessagesFromLocalStorage,
  saveMessageToLocalStorage,
} from "../../helper/Storage";
import { mockMessages } from "../../assets/messages";
import { useParams } from "react-router-dom";
import styles from "./PageChat.module.scss";

const PageChat = ({ searchValue }) => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [friendName, setFriendName] = useState("");
  const [friendAvatar, setFriendAvatar] = useState("");

  useEffect(() => {
    const friendMessages = mockMessages.filter(
      (message) => message.chatId === chatId,
    );
    const localMessages = loadMessagesFromLocalStorage(chatId) || [];
    setMessages([...friendMessages, ...localMessages]);

    const storedChats = JSON.parse(localStorage.getItem("chats"));
    const chat = storedChats?.find((chat) => chat.id === chatId);
    setFriendName(chat ? chat.title : "Неизвестный собеседник");
    setFriendAvatar(chat ? chat.avatar : "");
  }, [chatId]);

  const handleMessageSubmit = (messageText) => {
    const newMessage = {
      text: messageText,
      sender: "Иван Иванов",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    saveMessageToLocalStorage(newMessage, chatId);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const filteredMessages = messages.filter((message) =>
    message.text?.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div className={styles.chatList}>
      <div className={styles.header}>
        <img
          src={friendAvatar}
          alt={`${friendName}'s avatar`}
          className={styles.avatar}
        />
        <h2 className={styles.friendName}>{friendName}</h2>
      </div>

      <MessageList messages={filteredMessages} />
      <MessageForm onSubmit={handleMessageSubmit} />
    </div>
  );
};

export default PageChat;
