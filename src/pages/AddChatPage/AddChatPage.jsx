import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddChatPage.module.scss';
import ChatItem from '../../components/ChatItem/ChatItem';
import { getUsers } from '../../services/users';
import { createChat } from '../../services/chat';
import { Skeleton } from '@mui/material';

const defaultAvatar = '/2024-2-VK-EDU-Frontend-A-Gaik/defaultAvatar.png';

const AddChatPage = ({ searchValue, setSearchValue }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    nextPageUrl: null,
    previousPageUrl: null,
  });

  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
      setError(null);
      setPagination((prev) => ({
        ...prev,
        currentPage: 1,
      }));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      getUsers(pagination.currentPage, debouncedSearchValue)
        .then((data) => {
          setUsers(data.results || []);
          setPagination((prev) => ({
            ...prev,
            totalPages: Math.ceil(data.count / 10),
            nextPageUrl: data.next,
            previousPageUrl: data.previous,
          }));
        })
        .catch((err) => {
          setError('Ошибка при получении списка пользователей');
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchUsers();
  }, [pagination.currentPage, debouncedSearchValue]);


  const handleAddChat = async (user) => {
    createChat(user.id)
      .then(() => {
        setSearchValue('');
        navigate('/');
      })
      .catch((error) => {
        console.error('Ошибка при добавлении чата:', error);
      });
  };

  const handlePageChange = (direction) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: direction === 'next' ? prev.currentPage + 1 : prev.currentPage - 1,
    }));
  };

  return (
    <div className={styles.addChatPage}>
      <h2 className={styles.title}>Выберите пользователя для чата</h2>

      <div className={styles.chatList}>
        {loading ? (
          <>
            {[...Array(10)].map((_, index) => (
              <Skeleton key={index} variant="rectangular" width="100%" height={100} sx={{ marginBottom: 1 }} />
            ))}
          </>
        ) : users.length > 0 ? (
          users.map((user) => (
            <ChatItem
              key={user.id}
              id={user.id}
              avatar={user.avatar || defaultAvatar}
              title={user.username}
              onClick={() => handleAddChat(user)}
            />
          ))
        ) : (
          <div>Нет пользователей</div>
        )}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange('previous')}
          disabled={loading || !pagination.previousPageUrl}
          className={styles.paginationButton}
        >
          Предыдущая
        </button>

        {loading ? (
          <Skeleton variant="rectangular" width={50} height={20} sx={{ marginLeft: 1, marginRight: 1 }} />
        ) : (
          <span>{pagination.currentPage} / {pagination.totalPages}</span>
        )}

        <button
          onClick={() => handlePageChange('next')}
          disabled={loading || !pagination.nextPageUrl}
          className={styles.paginationButton}
        >
          Следующая
        </button>
      </div>

      {error && <div>{error}</div>}
    </div>
  );
};

export default AddChatPage;
