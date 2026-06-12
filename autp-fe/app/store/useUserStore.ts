import { create } from 'zustand';
import { UserAUTP } from '@/app/types/user';
import { usersApi, UserFilters } from '@/app/api/users';
import { PaginatedMeta } from '@/app/types/api';

interface UserResponse {
  message: string;
  data: UserAUTP;
}

interface UserState {
  users: UserAUTP[];
  meta: PaginatedMeta | null;
  isLoading: boolean;
  error: string | null;
  filters: UserFilters & { page: number; pageSize: number };
  fetchUsers: (filters?: UserFilters) => Promise<void>;
  createUser: (data: Omit<UserAUTP, 'id' | 'createdAt' | 'updatedAt'> & { password: string; password_confirmation: string }) => Promise<UserResponse>;
  updateUser: (id: number, data: Partial<Omit<UserAUTP, 'id' | 'createdAt' | 'updatedAt'>> & { password?: string; password_confirmation?: string }) => Promise<UserResponse>;
  deleteUser: (id: number) => Promise<string>;
  getUserById: (id: number) => UserAUTP | undefined;
  setFilters: (partial: Partial<UserFilters>) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  meta: null,
  isLoading: false,
  error: null,
  filters: {
    page: 1,
    pageSize: 10,
  },

  fetchUsers: async (filters = {}) => {
    set({ isLoading: true, error: null });
    try {
      const currentFilters = { ...get().filters, ...filters };
      set({ filters: currentFilters });

      const response = await usersApi.getAll(currentFilters);
      set({
        users: response.data,
        meta: response.meta,
      });
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Failed to fetch users';
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  createUser: async (data) => {
    try {
      const response = await usersApi.create(data);
      await get().fetchUsers();
      return response;
    } catch (err) {
      throw err;
    }
  },

  updateUser: async (id, data) => {
    try {
      const response = await usersApi.update(id, data);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? response.data : u)),
      }));
      return response;
    } catch (err) {
      throw err;
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await usersApi.remove(id);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      }));
      return response.message;
    } catch (err) {
      throw err;
    }
  },

  getUserById: (id) => {
    return get().users.find((user) => user.id === id);
  },

  setFilters: (partial) => {
    const currentFilters = get().filters;
    const isFilterChange = Boolean(partial.search !== undefined);
    const newFilters = {
      ...currentFilters,
      ...partial,
      ...(isFilterChange && { page: 1 }),
    };
    set({ filters: newFilters });
    get().fetchUsers(newFilters);
  },
}));
