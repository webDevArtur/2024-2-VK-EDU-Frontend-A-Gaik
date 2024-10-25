import React from "react";
import styles from "./Header.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = React.memo(
  ({ showBackArrow = false, searchValue = "", onSearch, onBack }) => {
    return (
      <header className={styles.chatHeader}>
        <div className={styles.chatTitle}>
          {showBackArrow && (
            <ArrowBackIcon className={styles.backArrowIcon} onClick={onBack} />
          )}
          VKchat
          <SendIcon className={styles.chatTitleIcon} />
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            id="searchInput"
            placeholder="Поиск"
            className={styles.searchInput}
            value={searchValue}
            onChange={onSearch}
          />

          <div className={styles.userInfo}>
            <AccountCircleIcon className={styles.userInfoIcon} />
            <span className={styles.userName}>Иван Иванов</span>
          </div>
        </div>
      </header>
    );
  },
);

export default Header;
