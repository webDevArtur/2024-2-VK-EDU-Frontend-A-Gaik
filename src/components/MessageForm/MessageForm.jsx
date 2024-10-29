import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker from "emoji-picker-react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./MessageForm.module.scss";

const MessageForm = ({ onSubmit }) => {
  const [messageText, setMessageText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imageAttachment, setImageAttachment] = useState(null);

  const handleEmojiClick = (emoji) => {
    setMessageText((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageAttachment(file);
    }
  };

  const handleRemoveImage = () => {
    setImageAttachment(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (messageText.trim() || imageAttachment) {
      onSubmit(messageText, imageAttachment);
      setMessageText("");
      setImageAttachment(null);
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

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.fileInput}
          id="imageInput"
        />
        <label htmlFor="imageInput" className={styles.iconButton}>
          <AttachFileIcon />
        </label>

        <button
          type="button"
          className={styles.iconButton}
          onClick={() => setShowEmojiPicker((prev) => !prev)}
        >
          <InsertEmoticonIcon />
        </button>

        {showEmojiPicker && (
          <div className={styles.emojiPicker}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        <button type="submit" className={styles.sendButton}>
          <SendIcon className={styles.chatTitleIcon} />
        </button>
      </form>

      {imageAttachment && (
        <div className={styles.imagePreviewContainerWrapper}>
          <div className={styles.imagePreviewContainer}>
            <img
              src={URL.createObjectURL(imageAttachment)}
              alt="attachment preview"
              className={styles.imagePreview}
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className={styles.removeImageButton}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageForm;
