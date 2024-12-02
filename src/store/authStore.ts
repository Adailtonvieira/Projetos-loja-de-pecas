import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  users: User[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  users: [
    { username: 'admin', password: '123', role: 'admin' },
    { username: 'colaborador', password: '456', role: 'collaborator' },
  ],
  login: (username: string, password: string) => {
    const users = useAuthStore.getState().users;
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    
    if (user) {
      set({ user });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null }),
}));