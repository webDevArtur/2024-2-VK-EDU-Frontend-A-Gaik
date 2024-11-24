import { api } from './index';

export const getProfile = async () => {
  return await api('GET', '/user/current/');
};

export const updateProfile = async (profile) => {
  return await api('PATCH', `/user/${profile.id}/`, {
    data: {
      username: profile.username,
      first_name: profile.firstName,
      last_name: profile.lastName,
      bio: profile.bio,
    },
  });
};
