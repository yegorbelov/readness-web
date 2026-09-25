import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { User } from '@/types/user';
import { getUser, logout } from '@/api/user';

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  signup: (user: User) => void;
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
    getUser()
      .then(setUser)
      .catch(() => setUser(null));

    setIsLoading(false);
  }

  function logoutUser() {
    logout().then(() => setUser(null));
  }

  function login(user: User) {
    setUser(user);
  }

  function signup(user: User) {
    setUser(user);
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        user,
        isLoggedIn: !!user,
        logout: logoutUser,
        signup,
        isLoading,
      }}
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
