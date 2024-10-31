import React, { useState } from "react";
import styles from "./ChatItem.module.scss";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import UpdateAvatarModal from "../UpdateAvatarModal/UpdateAvatarModal";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const ChatItem = ({
  id,
  avatar,
  title,
  message,
  time,
  unreadCount,
  isRead,
  onClick,
  handleImageClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateAvatar = (newAvatar) => {
    handleImageClick(id, newAvatar);
  };

  return (
    <>
      <div className={styles.chatItem} onClick={() => onClick(id)}>
        <div className={styles.avatarWrapper}>
          <span
            className={styles.editIcon}
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            <AddPhotoAlternateIcon />
          </span>

          <img src={avatar} alt="Avatar" className={styles.avatar} />
        </div>
        <div className={styles.chatDetails}>
          <h2>{title}</h2>
          <p>{message}</p>
        </div>

        <div className={styles.chatMeta}>
          <span className={styles.time}>{time}</span>
          {unreadCount > 0 ? (
            <span className={styles.badge}>{unreadCount}</span>
          ) : (
            <span className={styles.readIcon}>
              {isRead ? (
                <DoneIcon fontSize="small" />
              ) : (
                <DoneAllIcon fontSize="small" />
              )}
            </span>
          )}
        </div>
      </div>

      {isModalOpen && (
        <UpdateAvatarModal
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdateAvatar}
        />
      )}
    </>
  );
};

export default ChatItem;
