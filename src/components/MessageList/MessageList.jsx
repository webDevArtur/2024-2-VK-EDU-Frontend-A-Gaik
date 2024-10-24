import React from "react";
import styles from "./MessageList.module.scss";

const MessageList = ({ messages }) => {
  const renderMessage = ({ source, sender, text, timestamp }, index) => (
    <div
      key={index}
      className={
        source === "user" ? styles.incomingMessage : styles.outgoingMessage
      }
    >
      <div className={styles.messageWrapper}>
        <div className={styles.messageSender}>{sender}</div>

        <div className={styles.messageText}>{text}</div>

        <div className={styles.messageTimestamp}>{timestamp}</div>
      </div>
    </div>
  );

  if (messages.length === 0) {
    return (
      <div className={styles.noMessages}>
        <img
          src="/noMessage.png"
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
