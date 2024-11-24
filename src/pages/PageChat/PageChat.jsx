import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getChatDetails } from '../../services/chat';
import { getMessages, sendMessage } from '../../services/message';
import { getProfile } from '../../services/profile';
import MessageList from '../../components/MessageList/MessageList';
import MessageForm from '../../components/MessageForm/MessageForm';
import styles from './PageChat.module.scss';
import Skeleton from '@mui/material/Skeleton';
import useCentrifugo from '../../hooks/useCentrifugo';

const PageChat = ({ searchValue }) => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [chatTitle, setChatTitle] = useState('');
  const [chatAvatar, setChatAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  useCentrifugo(chatId, setMessages);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Необходима авторизация');
      navigate('/login');
      return;
    }

    const fetchChatData = async () => {
      try {
        setLoading(true);

        const [chatData, messagesData, profileData] = await Promise.all([
          getChatDetails(chatId),
          getMessages(chatId, 1, 50, searchValue),
          getProfile(),
        ]);

        setChatTitle(chatData.title || 'Чат');
        setChatAvatar(chatData.avatar);

        const sortedMessages = messagesData.results.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );

        const formattedMessages = sortedMessages.map(message => ({
          ...message,
          source: message.sender.id === profileData.id ? 'user' : 'other',
        }));

        setMessages(formattedMessages);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('access_token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChatData();
  }, [chatId, searchValue, navigate]);

  const handleSubmit = async (messageText) => {
    if (isSending) return;
    setIsSending(true);

    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await sendMessage({ chat: chatId, text: messageText });
      
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={styles.chatPage}>
      <div className={styles.header}>
        <div className={styles.avatarWrapper}>
          {loading ? (
            <Skeleton className={styles.avatar} variant="circular" width={60} height={60} />
          ) : (
            <img
              className={styles.avatar}
              src={chatAvatar || '/2024-2-VK-EDU-Frontend-A-Gaik/defaultAvatar.png'}
              alt="Avatar"
            />
          )}
          {loading ? (
            <Skeleton variant="text" width={150} height={40} />
          ) : (
            <h2>{chatTitle}</h2>
          )}
        </div>
      </div>

      <MessageList messages={messages} loading={loading} />
      <MessageForm onSubmit={handleSubmit} />
    </div>
  );
};

export default PageChat;
