import { api } from './index';

export const createChat = async (userId) => {
  const response = await api('POST', '/chats/', {
    data: {
      members: [userId],
      is_private: true,
    },
  });
  return response;
};

export const getChatDetails = async (chatId) => {
  return await api('GET', `/chat/${chatId}/`);
};

export const subscribeToChat = async (chatId) => {
  return await api('POST', '/centrifugo/subscribe/', {
    data: { chat_id: chatId },
  });
};

export const getChats = async (searchTerm) => {
  const response = await api('GET', '/chats', {
    params: { search: searchTerm },
  });
  return response.results || [];
};

export const deleteChat = async (chatId) => {
  await api('DELETE', `/chat/${chatId}`);
};