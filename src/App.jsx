import React, { useState } from "react";
import Header from "./components/Header/Header";
import PageChatList from "./pages/PageChatList/PageChatList";
import PageChat from "./pages/PageChat/PageChat";
import styles from "./App.module.scss";

const App = () => {
  const [currentPage, setCurrentPage] = useState("chatList");
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const navigateToChat = (chatId) => {
    setSelectedChatId(chatId);
    setCurrentPage("chat");
  };

  const handleBack = () => {
    setCurrentPage("chatList");
    setSelectedChatId(null);
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

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
        return <PageChat chatId={selectedChatId} />;

      default:
        return null;
    }
  };

  return (
    <div className={styles.app}>
      <Header
        showBackArrow={currentPage === "chat"}
        searchValue={searchValue}
        onSearch={handleSearch}
        onBack={handleBack}
      />

      {renderPage()}
    </div>
  );
};

export default App;
