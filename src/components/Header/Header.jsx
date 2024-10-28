import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import { useLocation, useNavigate } from "react-router-dom";

const Header = React.memo(({ searchValue = "", onSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Иван Иванов");
  const [avatar, setAvatar] = useState(
    `/2024-2-VK-EDU-Frontend-A-Gaik/defaultAvatar.png`,
  );
  const showBackArrow =
    location.pathname.startsWith("/chat/") || location.pathname === "/profile";

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setUserName(`${profile.firstName} ${profile.lastName}`);
      setAvatar(profile.avatar);
    }
  }, [location.pathname]);

  return (
    <header className={styles.chatHeader}>
      <div className={styles.chatTitle}>
        {showBackArrow && (
          <ArrowBackIcon
            className={styles.backArrowIcon}
            onClick={handleBackClick}
          />
        )}
        VKchat
        <SendIcon className={styles.chatTitleIcon} />
      </div>

      {location.pathname !== "/profile" && (
        <div className={styles.searchContainer}>
          <input
            type="text"
            id="searchInput"
            placeholder="Поиск"
            className={styles.searchInput}
            value={searchValue}
            onChange={onSearch}
          />

          <div className={styles.userInfo} onClick={() => navigate("/profile")}>
            <img src={avatar} alt="Аватар" className={styles.userInfoIcon} />
            <span className={styles.userName}>{userName}</span>
          </div>
        </div>
      )}
    </header>
  );
});

export default Header;
