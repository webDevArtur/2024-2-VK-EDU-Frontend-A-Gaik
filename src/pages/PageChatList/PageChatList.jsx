import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingActionButton from "../../components/FloatingActionButton/FloatingActionButton";
import ChatItem from '../../components/ChatItem/ChatItem';
import { Skeleton, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import styles from './PageChatList.module.scss';
import { getChats, deleteChat } from '../../services/chat';

const defaultAvatar = '/2024-2-VK-EDU-Frontend-A-Gaik/defaultAvatar.png';

const PageChatList = ({ searchValue }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);
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
      setOpenConfirmDialog(false); // Закрытие окна подтверждения
    } catch (err) {
      console.error("Ошибка при удалении чата:", err);
    }
  };

  const openDialog = (chat) => {
    setChatToDelete(chat);
    setOpenConfirmDialog(true);
  };

  const closeDialog = () => {
    setOpenConfirmDialog(false);
    setChatToDelete(null);
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
            onDelete={() => openDialog(chat)} // Открытие окна подтверждения
          />
        ))
      ) : (
        <div>Нет чатов</div>
      )}

      <FloatingActionButton onClick={() => navigate('/add-chat')} />

      <Dialog
        open={openConfirmDialog}
        onClose={closeDialog}
      >
        <DialogTitle>Подтвердите удаление</DialogTitle>
        <DialogContent>
          <p>Вы уверены, что хотите удалить этот чат?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Отмена
          </Button>
          <Button onClick={() => handleDeleteChat(chatToDelete.id)} color="primary">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PageChatList;
