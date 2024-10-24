import React, { useEffect, useState } from "react";
import MessageList from "../../components/MessageList/MessageList";
import MessageForm from "../../components/MessageForm/MessageForm";
import {
  loadMessagesFromLocalStorage,
  saveMessageToLocalStorage,
} from "../../hooks/Storage";
import { mockMessages } from "../../assets/messages";
import styles from "./PageChat.module.scss";

const PageChat = ({ chatId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const friendMessages = mockMessages.filter(
      (message) => message.chatId === chatId,
    );
    const localMessages = loadMessagesFromLocalStorage(chatId) || [];
    setMessages([...friendMessages, ...localMessages]);
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

  return (
    <div className={styles.chatList}>
      <MessageList messages={messages} />

      <MessageForm onSubmit={handleMessageSubmit} />
    </div>
  );
};

export default PageChat;
