'use client';
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
  useCallback,
} from 'react';
import { User } from '@/lib/types';
import { LoadingContext } from './loaderContext';

interface ContextData {
  authenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

interface IAuthContext extends ContextData {
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<User | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const defaultValue: IAuthContext = {
  authenticated: false,
  setAuthenticated: () => {},
  user: null,
  setUser: () => {},
  isLoading: true,
  setIsLoading: () => {},
};

export const AuthContext = createContext(defaultValue);

export const AuthContextProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [authenticated, setAuthenticated] = useState(
    defaultValue.authenticated
  );
  const [user, setUser] = useState(defaultValue.user);

  const getCurrentUser = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch('/api/current-user', {
        credentials: 'include',
      });
      const data = (await response.json()) as ContextData;

      setAuthenticated(data.authenticated);
      setUser(data.user);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void getCurrentUser();
  }, []);

  const context = {
    authenticated,
    setAuthenticated,
    user,
    setUser,
    isLoading,
    setIsLoading,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
