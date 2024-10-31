import React from "react";
import emptyPage from "../../../public/emptyPage.png";
import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <img
        src={emptyPage}
        className={styles.notFoundImage}
        alt="Страница не найдена"
      />

      <h2>Страница не найдена</h2>
    </div>
  );
};

export default NotFoundPage;
