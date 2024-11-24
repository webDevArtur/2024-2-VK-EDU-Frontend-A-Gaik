import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import styles from "./Header.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { getProfile } from "../../services/profile";
import { logout } from "../../services/auth";

const Header = React.memo(({ searchValue = "", onSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("No Name");
  const [avatar, setAvatar] = useState(`/2024-2-VK-EDU-Frontend-A-Gaik/defaultAvatar.png`);

  const showBackArrow =
    location.pathname.startsWith("/chat/") || location.pathname === "/profile" || location.pathname === "/add-chat";

  const handleBackClick = () => {
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      navigate(-1);
    }
  };

  useEffect(() => {
    const fetchUserProfile = () => {
      getProfile()
        .then((response) => {
          setUserName(`${response.first_name} ${response.last_name}`);
          setAvatar(response.avatar || "/2024-2-VK-EDU-Frontend-A-Gaik/defaultAvatar.png");
        })
        .catch((error) => {
          console.error("Ошибка при загрузке данных пользователя:", error);
        });
    };

    if (location.pathname !== "/login" && location.pathname !== "/register") {
      fetchUserProfile();
    }
  }, [location.pathname]);

  const isLoginOrRegisterPage =
    location.pathname === "/login" || location.pathname === "/register";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={styles.chatHeader}>
      <div className={styles.chatTitle}>
        {showBackArrow && !isLoginOrRegisterPage && (
          <ArrowBackIcon
            className={styles.backArrowIcon}
            onClick={handleBackClick}
          />
        )}

        {!isLoginOrRegisterPage ? (
          <Link to="/" className={styles.chatTitleLink}>
            VKchat
            <SendIcon className={styles.chatTitleIcon} />
          </Link>
        ) : (
          <span className={styles.chatTitleLink}>
            VKchat
            <SendIcon className={styles.chatTitleIcon} />
          </span>
        )}
      </div>

      {!isLoginOrRegisterPage && location.pathname !== "/profile" && (
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

          <ExitToAppIcon
            className={styles.exitIcon}
            onClick={handleLogout}
          />
        </div>
      )}
    </header>
  );
});

export default Header;
