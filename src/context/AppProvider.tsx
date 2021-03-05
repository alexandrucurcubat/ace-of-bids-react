import { createContext, FC, useReducer } from 'react';

import { IAppContext } from '../models/context-app.interface';
import { appReducer, IAppState } from './reducers/app-reducer';

const initialAppState: IAppState = {
  isLoading: false,
  error: null,
};

export const AppContext = createContext<IAppContext>({
  appState: initialAppState,
  appDispatch: () => {},
});

const AppProvider: FC = ({ children }) => {
  const [appState, appDispatch] = useReducer(appReducer, initialAppState);

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
