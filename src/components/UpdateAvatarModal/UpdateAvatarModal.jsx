import React, { useState } from "react";
import styles from "./UpdateAvatarModal.module.scss";
import Modal from "../Modal/Modal";

const UpdateAvatarModal = ({ onClose, onUpdate }) => {
  const [avatarFile, setAvatarFile] = useState(null);

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (avatarFile) {
      const avatarUrl = await convertFileToBase64(avatarFile);
      onUpdate(avatarUrl);
      onClose();
    }
  };

  return (
    <Modal title="Обновление аватара" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className={styles.modalField}>
          <label className={styles.modalLabel} htmlFor="avatarFile">
            Выберите новый аватар:
          </label>
          <input
            className={styles.modalInput}
            type="file"
            id="avatarFile"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files[0])}
            required
          />
        </div>
        <button className={styles.modalButton} type="submit">
          Обновить
        </button>
      </form>
    </Modal>
  );
};

export default UpdateAvatarModal;
