import React from "react";
import styles from "./MessageList.module.scss";
import Skeleton from "@mui/material/Skeleton";

const MessageList = ({ messages, loading }) => {
  const renderMessage = ({ source, sender, text, created_at, image }, index) => (
    <div
      key={index}
      className={
        source === "user" ? styles.outgoingMessage : styles.incomingMessage
      }
    >
      <div className={styles.messageWrapper}>
        <div className={styles.messageSender}>
          {sender && sender.username ? sender.username : "Неизвестный пользователь"}
        </div>
        <div className={styles.messageText}>{text || "Без текста"}</div>
        {image && <img src={image} alt="Изображение" className={styles.messageImage} />}
        <div className={styles.messageTimestamp}>
          {created_at
            ? new Date(created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "Без времени"}
        </div>
      </div>
    </div>
  );  

  if (!loading && (!messages || messages.length === 0)) {
    return (
      <div className={styles.noMessages}>
        <img
          src="/2024-2-VK-EDU-Frontend-A-Gaik/noMessage.png"
          alt="Нет сообщений"
          className={styles.noMessagesImage}
        />
        <div className={styles.noMessagesText}>
          Здесь будет выводиться список
          <br />
          Ваших сообщений.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.messages}>
      {loading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={styles.skeletonWrapperSkeleton}
          >
            <Skeleton variant="rectangular" width={350} height={80} animation="wave" />
          </div>
        ))
      ) : (
        messages.map(renderMessage)
      )}
    </div>
  );
};

export default MessageList;
