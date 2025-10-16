import { SnackbarProvider, enqueueSnackbar, OptionsObject } from 'notistack';
import { createContext, ReactNode } from 'react';

interface INotificationContext {
  enqueueSnackbar: (message: string, options?: OptionsObject) => void;
}

const defaultValue: INotificationContext = {
  enqueueSnackbar: () => {},
};

export const NotificationContext = createContext(defaultValue);

export const NotificationContextProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const context = {
    enqueueSnackbar,
  };

  return (
    <NotificationContext.Provider value={context}>
      <SnackbarProvider />
      {children}
    </NotificationContext.Provider>
  );
};
