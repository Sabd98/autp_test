import client from './client';
import { ClaimAUTP } from '@/app/types/claim';
import { PaginatedResponse } from '@/app/types/api';

export interface ClaimFilters {
  search?: string;
  status?: string;
  cause?: string;
  page?: number;
  pageSize?: number;
}

export const claimsApi = {
  async getAll(filters: ClaimFilters = {}) {
    const response = await client.get<PaginatedResponse<ClaimAUTP>>('/claims', {
      params: filters,
    });
    return response.data;
  },

  async getById(id: number) {
    const response = await client.get<{ message: string; data: ClaimAUTP }>(
      `/claims/${id}`
    );
    return response.data.data;
  },

  async create(payload: Omit<ClaimAUTP, 'id'>) {
    const response = await client.post<{ message: string; data: ClaimAUTP }>(
      '/claims',
      payload
    );
    return response.data;
  },

  async update(id: number, payload: Partial<ClaimAUTP>) {
    const response = await client.put<{ message: string; data: ClaimAUTP }>(
      `/claims/${id}`,
      payload
    );
    return response.data;
  },

  async remove(id: number) {
    const response = await client.delete<{ message: string }>(`/claims/${id}`);
    return response.data;
  },
};
