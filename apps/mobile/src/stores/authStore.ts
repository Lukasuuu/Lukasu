import { create } from 'zustand';

interface AuthState {
  token: string | null;
  user: { id: string; email: string; name?: string } | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  async login(email, password) {
    // TODO: integrate with NestJS auth endpoint
    const mockToken = 'mock-jwt-token';
    set({ token: mockToken, user: { id: '1', email }, isAuthenticated: true });
  },
  logout() {
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
