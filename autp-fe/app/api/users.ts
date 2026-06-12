import client from './client';
import { UserAUTP } from '@/app/types/user';
import { PaginatedResponse } from '@/app/types/api';

export interface UserFilters {
  search?: string;
  page?: number;
  pageSize?: number;
}

export const usersApi = {
  async getAll(filters: UserFilters = {}) {
    const response = await client.get<PaginatedResponse<UserAUTP>>('/users', {
      params: filters,
    });
    return response.data;
  },

  async getById(id: number) {
    const response = await client.get<{ message: string; data: UserAUTP }>(
      `/users/${id}`
    );
    return response.data.data;
  },

  async create(payload: Omit<UserAUTP, 'id' | 'createdAt' | 'updatedAt'> & { password: string; password_confirmation: string }) {
    const response = await client.post<{ message: string; data: UserAUTP }>(
      '/users',
      payload
    );
    return response.data;
  },

  async update(
    id: number,
    payload: Partial<Omit<UserAUTP, 'id' | 'createdAt' | 'updatedAt'>> & { password?: string; password_confirmation?: string }
  ) {
    const response = await client.put<{ message: string; data: UserAUTP }>(
      `/users/${id}`,
      payload
    );
    return response.data;
  },

  async remove(id: number) {
    const response = await client.delete<{ message: string }>(`/users/${id}`);
    return response.data;
  },
};
