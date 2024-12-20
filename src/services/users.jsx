import { api } from './index';

export const getUsers = async (page, search) => {
  const response = await api('GET', '/users/', {
    params: { page, search },
  });
  return response;
};
