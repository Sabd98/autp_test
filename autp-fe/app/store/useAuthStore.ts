import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (username: string, password: string) => {
        if (username === 'admin' && password === 'admin123') {
          const token = 'mock-token-' + Date.now();

          set({
            isAuthenticated: true,
            user: { name: 'Sabda Avicenna' },
          });

          // Set cookie untuk middleware
          document.cookie = `authToken=${token}; path=/; max-age=86400`;

          return true;
        }
        return false;
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
        // Clear cookie
        document.cookie = 'authToken=; path=/; max-age=0';
      },
    }),
    {
      name: 'autp-auth',
    }
  )
);
