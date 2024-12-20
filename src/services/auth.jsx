import { api } from "./index";

export const login = async (formData) => {
  return await api('POST', '/auth/', { data: formData });
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('profile');
};

export const registerUser = async (userData) => {
  const formData = new FormData();
  Object.keys(userData).forEach((key) => {
    formData.append(key, userData[key]);
  });

  const response = await api('POST', "/register/", {data: formData});

  return response;
};
