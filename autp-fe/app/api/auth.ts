import client from './client';
import { LoginResponse } from '@/app/types/api';

export const authApi = {
  async login(username: string, password: string) {
    const response = await client.post<LoginResponse>('/auth/login', {
      username,
      password,
    });
    return response.data.data;
  },

  async logout() {
    await client.post('/auth/logout');
  },
};
