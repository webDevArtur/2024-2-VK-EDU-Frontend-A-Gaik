import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingActionButton from "../../components/FloatingActionButton/FloatingActionButton";
import ChatItem from '../../components/ChatItem/ChatItem';
import { Skeleton } from '@mui/material';
import styles from './PageChatList.module.scss';
import { getChats, deleteChat } from '../../services/chat';

const defaultAvatar = '/2024-2-VK-EDU-Frontend-A-Gaik/defaultAvatar.png';

const PageChatList = ({ searchValue }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadChats = async () => {
      setLoading(true);
      try {
        const fetchedChats = await getChats(searchValue);
        setChats(fetchedChats);
        setError(null);
      } catch (err) {
        setError("Ошибка загрузки чатов: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, [searchValue]);

  const handleDeleteChat = async (id) => {
    try {
      await deleteChat(id);
      setChats((prevChats) => prevChats.filter(chat => chat.id !== id));
    } catch (err) {
      console.error("Ошибка при удалении чата:", err);
    }
  };

  return (
    <div className={styles.chatList}>
      {loading ? (
        <div>
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} variant="rectangular" width="100%" height={100} sx={{ marginBottom: 1 }} />
          ))}
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : chats.length > 0 ? (
        chats.map((chat) => (
          <ChatItem
            key={chat.id}
            {...chat}
            avatar={chat.avatar || defaultAvatar}
            onClick={() => navigate(`/chat/${chat.id}`)}
            onDelete={handleDeleteChat}
          />
        ))
      ) : (
        <div>Нет чатов</div>
      )}

      <FloatingActionButton onClick={() => navigate('/add-chat')} />
    </div>
  );
};

export default PageChatList;
