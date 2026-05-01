import { useState, useEffect, useCallback, useRef } from 'react';
import { api, ApiError } from '@/lib/api';

interface ApiUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
  avatarUrl: string | null;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiAuthState {
  user: ApiUser | null;
  loading: boolean;
  error: string | null;
}

function getStoredToken(): string | null {
  return localStorage.getItem('bm_access_token');
}

export function useApiAuth() {
  const [state, setState] = useState<ApiAuthState>({
    user: null,
    loading: true,
    error: null,
  });
  const initialized = useRef(false);

  const setUser = useCallback((user: ApiUser | null) => {
    setState((s) => ({ ...s, user, loading: false, error: null }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((s) => ({ ...s, error, loading: false }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState((s) => ({ ...s, loading }));
  }, []);

  // Restore session on mount
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const token = getStoredToken();
    if (!token) {
      setState((s) => ({ ...s, loading: false }));
      return;
    }

    api
      .getMe()
      .then((res) => {
        if (res.user) {
          setUser(res.user as ApiUser);
        } else {
          api.logout();
          setState((s) => ({ ...s, loading: false, user: null }));
        }
      })
      .catch((err: unknown) => {
        api.logout();
        const message = err instanceof ApiError ? err.message : 'Sessão expirada';
        setState((s) => ({ ...s, loading: false, user: null, error: message }));
      });
  }, [setUser]);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.login(email, password);
        if (res.user) {
          setUser(res.user as ApiUser);
        }
        return res;
      } catch (err: unknown) {
        const message = err instanceof ApiError ? err.message : 'Erro ao entrar';
        setError(message);
        throw err;
      }
    },
    [setLoading, setError, setUser],
  );

  const register = useCallback(
    async (email: string, password: string, name: string, tenantId?: string) => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.register(email, password, name, tenantId);
        if (res.user) {
          setUser(res.user as ApiUser);
        }
        return res;
      } catch (err: unknown) {
        const message = err instanceof ApiError ? err.message : 'Erro ao criar conta';
        setError(message);
        throw err;
      }
    },
    [setLoading, setError, setUser],
  );

  const logout = useCallback(() => {
    api.logout();
    setState({ user: null, loading: false, error: null });
  }, []);

  const isLoggedIn = !!state.user;

  return {
    ...state,
    isLoggedIn,
    login,
    register,
    logout,
  };
}
