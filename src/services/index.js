import axios from 'axios';

const getAccessToken = () => localStorage.getItem('access_token');

const logoutUser = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

axios.defaults.baseURL = 'https://vkedu-fullstack-div2.ru/api';
axios.defaults.timeout = 10000;
axios.defaults.responseType = 'json';

axios.interceptors.request.use(
  config => {
    const isAuthRequest =
      config.url.includes('/auth/login') || config.url.includes('/auth/register');
    const token = getAccessToken();

    if (!isAuthRequest && token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        logoutUser();
        throw new Error('Авторизация истекла. Пожалуйста, войдите снова.');
      } catch (logoutError) {
        throw new Error('Ошибка авторизации. Пожалуйста, попробуйте снова.');
      }
    }

    return Promise.reject(error);
  }
);

export const api = async (method, url, params = {}) => {
  try {
    const options = {
      method,
      url,
      ...params,
    };

    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error('Ошибка API:', error);

    if (error.response?.status === 404) {
      throw new Error('Ресурс не найден');
    } else if (error.response?.status === 500) {
      throw new Error('Ошибка сервера');
    }

    throw error;
  }
};
