import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import styles from "./MessageForm.module.scss";

const MessageForm = ({ onSubmit }) => {
  const [messageText, setMessageText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (messageText.trim()) {
      onSubmit(messageText);
      setMessageText("");
    }
  };

  return (
    <div className={styles.inputContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.formInput}
          name="messageText"
          placeholder="Введите сообщение"
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />

        <button type="submit" className={styles.sendButton}>
          <SendIcon className={styles.chatTitleIcon} />
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
