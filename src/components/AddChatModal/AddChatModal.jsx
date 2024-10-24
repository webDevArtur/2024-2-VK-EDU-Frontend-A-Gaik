import React, { useState } from "react";
import styles from "./AddChatModal.module.scss";

const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const AddChatModal = ({ onClose, onAddChat }) => {
  const [name, setName] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let avatarUrl = "public/defaultAvatar.png";
    if (avatarFile) {
      avatarUrl = await convertFileToBase64(avatarFile);
    }

    const newChat = {
      id: String(Date.now()),
      avatar: avatarUrl,
      title: name,
      message: "",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      unreadCount: 0,
      isRead: true,
    };

    onAddChat(newChat);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.modalTitle}>Добавить новый контакт</h2>

          <button className={styles.modalClose} onClick={onClose}>
            &times;
          </button>
        </div>
        <form id="chatForm" onSubmit={handleSubmit}>
          <div className={styles.modalField}>
            <label className={styles.modalLabel} htmlFor="name">
              Имя:
            </label>

            <input
              className={styles.modalInput}
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.modalField}>
            <label className={styles.modalLabel} htmlFor="avatarFile">
              Аватар (загрузка):
            </label>

            <input
              className={styles.modalInput}
              type="file"
              id="avatarFile"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files[0])}
            />
          </div>

          <button className={styles.modalButton} type="submit">
            Добавить
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddChatModal;
