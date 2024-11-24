import React from "react";
import {useLocation} from "react-router-dom";
import styles from "./ChatItem.module.scss";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DeleteIcon from "@mui/icons-material/Delete";

const ChatItem = ({
  id,
  avatar,
  title,
  message,
  time,
  unreadCount,
  isRead,
  onClick,
  onDelete,
}) => {
  const isUserItem = useLocation().pathname === "/add-chat";

  return (
    <div className={styles.chatItem} onClick={() => onClick(id)}>
      <div className={styles.avatarWrapper}>
        <img src={avatar} alt="Avatar" className={styles.avatar} />
      </div>
      <div className={styles.chatDetails}>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>

      {!isUserItem && (
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

        <button 
          className={styles.deleteButton} 
          onClick={(e) => { 
            e.stopPropagation();
            onDelete(id);
          }}
        >
          <DeleteIcon fontSize="small" />
        </button>
      </div>
      )}
    </div>
  );
};

export default ChatItem;
