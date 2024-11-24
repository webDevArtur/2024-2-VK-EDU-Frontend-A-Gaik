import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import PageChatList from './pages/PageChatList/PageChatList';
import PageChat from './pages/PageChat/PageChat';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import AddChatPage from './pages/AddChatPage/AddChatPage';
import styles from './App.module.scss';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const isAuthenticated = () => !!localStorage.getItem('access_token');

  useEffect(() => {
    if (!isAuthenticated() && location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login');
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    setSearchValue('');
  }, [location.pathname, navigate]);

  return (
    <div className={styles.app}>
      <Header searchValue={searchValue} onSearch={handleSearch} />

      <Routes>
        <Route
          path="/"
          element={<PageChatList searchValue={searchValue} />}
        />
        <Route path="/chat/:chatId" element={<PageChat searchValue={searchValue} />} />
        <Route path="/add-chat" element={<AddChatPage searchValue={searchValue} setSearchValue={setSearchValue} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/404" element={<NotFoundPage text="Пользователь не существует" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
