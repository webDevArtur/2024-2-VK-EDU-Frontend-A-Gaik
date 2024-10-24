import React from "react";
import styles from "./Modal.module.scss";

const Modal = ({ title, content, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.modalTitle}>{title}</h2>
        <div className={styles.modalContent}>{content}</div>
      </div>
    </div>
  );
};

export default Modal;
