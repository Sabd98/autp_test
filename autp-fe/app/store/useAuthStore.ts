import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '@/app/api/auth';

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
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      _hasHydrated: false,
      login: async (username: string, password: string) => {
        try {
          const { token, user } = await authApi.login(username, password);

          set({
            isAuthenticated: true,
            token,
            user,
          });

          document.cookie = `authToken=${token}; path=/; max-age=86400`;
          return true;
        } catch {
          return false;
        }
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
