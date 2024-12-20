import { api } from './index';

export const getMessages = async (chatId, page = 1, pageSize = 10, search = '') => {
  return await api('GET', '/messages/', {
    params: { chat: chatId, page, page_size: pageSize, search },
  });
};

export const sendMessage = async (messageData) => {
  return await api('POST', '/messages/', {
    data: messageData,
  });
};
