import { api } from './index';

export const getCentrifugoToken = async () => {
  const response = await api('POST', '/centrifugo/connect/');
  return response.token;
};

export const getSubscribeToken = async (userId) => {
  const response = await api('POST', '/centrifugo/subscribe/', {
    data: { userId },
  });
  return response.token;
};
