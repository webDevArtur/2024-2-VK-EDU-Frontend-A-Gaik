import React from "react";
import styles from "./MessageList.module.scss";

const MessageList = ({ messages }) => {
  const renderMessage = ({ source, sender, text, timestamp, image }, index) => (
    <div
      key={index}
      className={
        source === "user" ? styles.incomingMessage : styles.outgoingMessage
      }
    >
      <div className={styles.messageWrapper}>
        <div className={styles.messageSender}>{sender}</div>

        <div className={styles.messageText}>{text}</div>
        {image && (
          <img
            src={image}
            alt="image preview"
            className={styles.messageImage}
          />
        )}

        <div className={styles.messageTimestamp}>{timestamp}</div>
      </div>
    </div>
  );

  if (messages.length === 0) {
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

  return <div className={styles.messages}>{messages.map(renderMessage)}</div>;
};

export default MessageList;
