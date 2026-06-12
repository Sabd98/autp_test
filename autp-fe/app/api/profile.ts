import client from './client';
import { UserAUTP } from '@/app/types/user';

export const profileApi = {
  async get() {
    const response = await client.get<{ message: string; data: UserAUTP }>(
      '/profile'
    );
    return response.data.data;
  },

  async update(name: string) {
    const response = await client.put<{ message: string; data: UserAUTP }>(
      '/profile',
      { name }
    );
    return response.data.data;
  },

  async resetPassword(
    currentPassword: string,
    newPassword: string,
    newPassword_confirmation: string
  ) {
    const response = await client.post<{ message: string; data: UserAUTP }>(
      '/profile/reset-password',
      {
        currentPassword,
        newPassword,
        newPassword_confirmation,
      }
    );
    return response.data.data;
  },
};
