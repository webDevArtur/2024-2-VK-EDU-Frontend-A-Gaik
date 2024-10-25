import React from "react";
import styles from "./Modal.module.scss";

const Modal = ({ title, onClose, children }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.modalTitle}>{title}</h2>

          <button className={styles.modalClose} onClick={onClose}>
            &times;
          </button>
        </div>

        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
