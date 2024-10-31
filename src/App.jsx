import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import PageChatList from "./pages/PageChatList/PageChatList";
import PageChat from "./pages/PageChat/PageChat";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import styles from "./App.module.scss";

const App = () => {
  const [currentPage, setCurrentPage] = useState("chatList");
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const navigateToChat = (chatId) => {
    setSelectedChatId(chatId);
    setCurrentPage("chat");
    window.history.pushState({ page: "chat", chatId }, "", `/chat/${chatId}`);
  };

  const handleBack = () => {
    setCurrentPage("chatList");
    setSelectedChatId(null);
    window.history.pushState({ page: "chatList" }, "", "/");
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state) {
        setCurrentPage(event.state.page);
        setSelectedChatId(event.state.chatId || null);
      } else {
        setCurrentPage("chatList");
        setSelectedChatId(null);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "chatList":
        return (
          <PageChatList
            navigateToChat={navigateToChat}
            searchValue={searchValue}
          />
        );

      case "chat":
        return <PageChat chatId={selectedChatId} searchValue={searchValue} />;

      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className={styles.app}>
      <Header
        showBackArrow={currentPage !== "chatList"}
        searchValue={searchValue}
        onSearch={handleSearch}
        onBack={handleBack}
      />

      {renderPage()}
    </div>
  );
};

export default App;
