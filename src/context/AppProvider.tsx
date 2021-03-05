import { createContext, FC, useState } from 'react';

import { IAppContext } from '../models/context-app.interface';

export const AppContext = createContext<IAppContext>({
  isLoading: false,
});

const AppProvider: FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider value={{ isLoading }}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
