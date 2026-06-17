import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '@/app/api/auth';
import axios, { AxiosError } from 'axios';
import { ApiErrorResponse } from '@/app/types/api';

interface User {
  id: number;
  username: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  _hasHydrated: boolean;
  loginErrors: Record<string, string[]> | null;
  login: (username: string, password: string) => Promise<{ ok: boolean; error?: string; isValidation?: boolean }>;
  clearLoginErrors: () => void;
  logout: () => void;
  updateUserName: (name: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      _hasHydrated: false,
      loginErrors: null,
      login: async (username: string, password: string) => {
        try {
          const { token, user } = await authApi.login(username, password);

          set({
            isAuthenticated: true,
            token,
            user,
          });

          document.cookie = `authToken=${token}; path=/; max-age=86400`;
          return { ok: true };
        } catch (err) {
          const axiosErr = err as AxiosError<ApiErrorResponse>;
          const data = axiosErr.response?.data;

          if (data?.errors) {
            set({ loginErrors: data.errors });
            return { ok: false, error: undefined, isValidation: true };
          }

          if (data?.message) {
            return { ok: false, error: data.message };
          }

          return { ok: false, error: 'Terjadi kesalahan server, silakan coba lagi' };
        }
      },
      clearLoginErrors: () => {
        set({ loginErrors: null });
      },
      logout: () => {
        authApi.logout().catch(() => {});
        set({
          isAuthenticated: false,
          token: null,
          user: null,
        });
        document.cookie = 'authToken=; path=/; max-age=0';
      },
      updateUserName: (name: string) => {
        set((state) => ({
          user: state.user ? { ...state.user, name } : null,
        }));
      },
    }),
    {
      name: 'autp-auth',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._hasHydrated = true;
        }
      },
    }
  )
);
