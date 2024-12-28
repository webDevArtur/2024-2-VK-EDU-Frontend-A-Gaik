import React, { useState, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker from "emoji-picker-react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./MessageForm.module.scss";

const MessageForm = ({ onSubmit }) => {
  const [messageText, setMessageText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imageAttachments, setImageAttachments] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const handleEmojiClick = (emoji) => {
    setMessageText((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImageAttachments(files);
    }
  };

  const handleRemoveImage = () => {
    setImageAttachments([]);
  };

  const handleSendLocation = () => {
    if (!navigator.geolocation) {
      alert("Геолокация не поддерживается вашим браузером.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationMessage = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        setMessageText((prev) => prev + locationMessage);
      },
      (error) => {
        alert("Не удалось получить координаты. Проверьте настройки геолокации.");
        console.error(error);
      }
    );
  };

  const handleStartRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          mediaRecorderRef.current = new MediaRecorder(stream);
          mediaRecorderRef.current.start();

          audioChunks.current = [];
          mediaRecorderRef.current.ondataavailable = (e) => {
            audioChunks.current.push(e.data);
          };

          mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
            setAudioFile(new File([audioBlob], "recording.wav", { type: "audio/wav" }));
          };          

          setIsRecording(true);
        })
        .catch((err) => console.error("Error accessing microphone:", err));
    } else {
      alert("Ваш браузер не поддерживает запись аудио.");
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleRemoveAudio = () => {
    setAudioFile(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (messageText.trim() || imageAttachments.length > 0 || audioFile) {
      const formData = new FormData();
      if (messageText.trim()) {
        formData.append("text", messageText); 
      }

      imageAttachments.forEach((file) => {
        formData.append("files", file);
      });

      if (audioFile) {
        formData.append("voice", audioFile);
      }

      onSubmit(formData);
      setMessageText("");
      setImageAttachments([]);
      setAudioFile(null);
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

        <button
          type="button"
          className={styles.iconButton}
          onClick={handleSendLocation}
        >
          <MyLocationIcon />
        </button>

        {isRecording ? (
          <button
            type="button"
            className={styles.iconButton}
            onClick={handleStopRecording}
          >
            <StopIcon />
          </button>
        ) : (
          <button
            type="button"
            className={styles.iconButton}
            onClick={handleStartRecording}
          >
            <MicIcon />
          </button>
        )}

        {showEmojiPicker && (
          <div className={styles.emojiPicker}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        <button type="submit" className={styles.sendButton}>
          <SendIcon className={styles.chatTitleIcon} />
        </button>
      </form>

      {audioFile && (
        <div className={styles.audioPreviewContainer}>
          <audio controls src={URL.createObjectURL(audioFile)} />
          <button
            type="button"
            onClick={handleRemoveAudio}
            className={styles.removeAudioButton}
          >
            <CloseIcon />
          </button>
        </div>
      )}

      {imageAttachments.length > 0 && (
        <div className={styles.imagePreviewContainerWrapper}>
          <div className={styles.imagePreviewContainer}>
            <img
              src={URL.createObjectURL(imageAttachments[0])}
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
