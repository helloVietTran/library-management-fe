import { create } from 'zustand';
import { User } from '@/types/types';

interface AuthState {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const useAuthStore = create<AuthState>()(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (userData) =>
        set({
          user: userData,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    })
);

export default useAuthStore;
