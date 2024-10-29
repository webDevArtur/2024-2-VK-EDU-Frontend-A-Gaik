import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MessageList from "../../components/MessageList/MessageList";
import MessageForm from "../../components/MessageForm/MessageForm";
import UpdateAvatarModal from "../../components/UpdateAvatarModal/UpdateAvatarModal";
import {
  loadMessagesFromLocalStorage,
  saveMessageToLocalStorage,
} from "../../helper/Storage";
import { mockMessages } from "../../assets/messages";
import styles from "./PageChat.module.scss";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Skeleton from "@mui/material/Skeleton";

const PageChat = ({ searchValue }) => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [friendName, setFriendName] = useState("");
  const [friendAvatar, setFriendAvatar] = useState("");
  const [chatExists, setChatExists] = useState(true);
  const [storedChats, setStoredChats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const friendMessages = mockMessages.filter(
      (message) => message.chatId === chatId,
    );
    const localMessages = loadMessagesFromLocalStorage(chatId) || [];
    setMessages([...friendMessages, ...localMessages]);

    const chats = JSON.parse(localStorage.getItem("chats"));
    setStoredChats(chats || []);

    const chat = chats?.find((chat) => chat.id === chatId);

    if (chat) {
      setFriendName(chat.title);
      setFriendAvatar(
        chat.avatar || "/2024-2-VK-EDU-Frontend-A-Gaik/defaultAvatar.png",
      );
    } else {
      setChatExists(false);
    }
  }, [chatId]);

  useEffect(() => {
    if (!chatExists) {
      navigate("/404");
    }
  }, [chatExists, navigate]);

  const handleMessageSubmit = (messageText, imageAttachment) => {
    const newMessage = {
      text: messageText,
      sender: "Иван Иванов",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      image: imageAttachment ? URL.createObjectURL(imageAttachment) : null,
    };

    saveMessageToLocalStorage(newMessage, chatId);
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const updatedChats = storedChats.map((chat) =>
      chat.id === chatId
        ? {
            ...chat,
            message: messageText,
            time: newMessage.timestamp,
          }
        : chat,
    );

    localStorage.setItem("chats", JSON.stringify(updatedChats));
    setStoredChats(updatedChats);
  };

  const filteredMessages = messages.filter((message) =>
    message.text?.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const handleUpdateAvatar = (newAvatar) => {
    const updatedChats = storedChats.map((chat) =>
      chat.id === chatId ? { ...chat, avatar: newAvatar } : chat,
    );

    setFriendAvatar(newAvatar);
    setStoredChats(updatedChats);
    localStorage.setItem("chats", JSON.stringify(updatedChats));
    setIsModalOpen(false);
  };

  return (
    <div className={styles.chatList}>
      <div className={styles.header}>
        <div className={styles.avatarWrapper}>
          {friendAvatar && (
            <span
              className={styles.editIcon}
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            >
              <AddPhotoAlternateIcon />
            </span>
          )}

          {friendAvatar ? (
            <img
              src={friendAvatar}
              alt={`${friendName}'s avatar`}
              className={styles.avatar}
            />
          ) : (
            <Skeleton variant="circular" width={60} height={60} />
          )}
        </div>
        {friendName ? (
          <h2 className={styles.friendName}>{friendName}</h2>
        ) : (
          <Skeleton variant="text" width={120} height={30} />
        )}
      </div>

      <MessageList messages={filteredMessages} />
      <MessageForm onSubmit={handleMessageSubmit} />

      {isModalOpen && (
        <UpdateAvatarModal
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdateAvatar}
        />
      )}
    </div>
  );
};

export default PageChat;
