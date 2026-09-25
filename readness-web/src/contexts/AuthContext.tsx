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
  isLoading: boolean;
  login: (user: User, tokens: AuthTokens) => void;
  signup: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const userId = localStorage.getItem('access_token');
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (userId && accessToken && refreshToken) {
      try {
        const u = await getUser(Number(userId));
        setUser(u);
      } catch {
        setUser(null);
      }
    }
    // setTimeout(() => {
    setIsLoading(false);
    // }, 2000);
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
      value={{ login, user, isLoggedIn: !!user, logout, signup, isLoading }}
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
