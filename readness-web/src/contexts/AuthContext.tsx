import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { AuthTokens, User } from '@/types/user';
import { getUser } from '@/api/user';

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User, tokens: AuthTokens) => void;
  signup: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    init();
  }, []);

  function init() {
    const user_id = localStorage.getItem('access_token');
    if (
      user_id &&
      localStorage.getItem('access_token') &&
      localStorage.getItem('refresh_token')
    ) {
      getUser(Number(user_id)).then((u) => {
        setUser(u);
      });
    }
  }

  function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  }

  function login(user: User, tokens: AuthTokens) {
    setUser(user);
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  }

  function signup(user: User, tokens: AuthTokens) {
    setUser(user);
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  }

  return (
    <AuthContext.Provider
      value={{ login, user, isLoggedIn: !!user, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used withing AuthProvider');
  return context;
}
