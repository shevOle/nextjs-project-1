'use client';
import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface ILoadingContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const defaultValue: ILoadingContext = {
  isLoading: true,
  setIsLoading: () => {},
};

export const LoadingContext = createContext(defaultValue);

export const LoadingContextProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const context = {
    isLoading,
    setIsLoading,
  };

  return (
    <LoadingContext.Provider value={context}>
      {children}
    </LoadingContext.Provider>
  );
};
