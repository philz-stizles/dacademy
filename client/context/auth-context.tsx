'use client'

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { TransformedUser } from '@/models/user';

type AuthContextType = {
  isAuthenticated: boolean;
  user?: any;
  login: (user: any) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<TransformedUser | undefined>(undefined);

  useEffect(() => {
    if (isAuthenticated) {
    }
  }, [isAuthenticated]);

  const loginHandler = useCallback((user: any) => {
    setIsAuthenticated(true);
    setUser(user);
  }, []);

  const logoutHandler = useCallback(() => {
    setIsAuthenticated(false);
    setUser(undefined);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
