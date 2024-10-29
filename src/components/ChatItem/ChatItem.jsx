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
}) => {
  return (
    <>
      <div className={styles.chatItem} onClick={() => onClick(id)}>
        <div className={styles.avatarWrapper}>
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
    </>
  );
};

export default ChatItem;
