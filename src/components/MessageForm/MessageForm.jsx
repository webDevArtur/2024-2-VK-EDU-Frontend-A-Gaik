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
  const [imageAttachments, setImageAttachments] = useState([]);

  const handleEmojiClick = (emoji) => {
    setMessageText((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const base64Image = await getBase64(file);
        setImageAttachments([base64Image]);
      }
    }
  };

  const handleRemoveImage = () => {
    setImageAttachments([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (messageText.trim() || imageAttachments.length > 0) {
      onSubmit(messageText, imageAttachments);
      setMessageText("");
      setImageAttachments([]);
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

      {imageAttachments.length > 0 && (
        <div className={styles.imagePreviewContainerWrapper}>
          <div className={styles.imagePreviewContainer}>
            <img
              src={imageAttachments[0]}
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
