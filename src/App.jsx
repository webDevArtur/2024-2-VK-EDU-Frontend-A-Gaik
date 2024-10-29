import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import PageChatList from "./pages/PageChatList/PageChatList";
import PageChat from "./pages/PageChat/PageChat";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import styles from "./App.module.scss";

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    setSearchValue("");
  }, [location.pathname]);

  return (
    <div className={styles.app}>
      <Header searchValue={searchValue} onSearch={handleSearch} />

      <Routes>
        <Route path="/" element={<PageChatList searchValue={searchValue} />} />
        <Route
          path="/chat/:chatId"
          element={<PageChat searchValue={searchValue} />}
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/404"
          element={<NotFoundPage text="Пользователь не существует" />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
