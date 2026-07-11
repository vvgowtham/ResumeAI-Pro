'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from './api';

interface User {
  id: string;
  email: string;
  name: string;
  plan: string;
  credits: number;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) { setLoading(false); return; }
      const me = await api.getMe();
      setUser(me);
    } catch {
      setUser(null);
      api.clearTokens();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUser(); }, [fetchUser]);

  const login = async (email: string, password: string) => {
    const result = await api.login({ email, password });
    setUser(result.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const result = await api.register({ name, email, password });
    setUser(result.user);
  };

  const logout = () => {
    api.logout();
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
