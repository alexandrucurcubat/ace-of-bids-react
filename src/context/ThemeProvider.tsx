import { createContext, FC, useReducer } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

import { LocalStorage } from '../models/local-storage.enum';
import { IThemeContext } from '../models/context-theme.interface';
import { DARK_THEME, LIGHT_THEME } from '../theming';
import { IThemeState, themeReducer } from './reducers/theme-reducer';

const localIsDarkMode =
  localStorage.getItem(LocalStorage.IS_DARK_MODE) === 'true' || false;

const initialThemeState: IThemeState = {
  isDarkMode: localIsDarkMode,
  theme: localIsDarkMode ? DARK_THEME : LIGHT_THEME,
};

export const DarkThemeContext = createContext<IThemeContext>({
  themeState: initialThemeState,
  themeDispatch: () => {},
});

const DarkThemeProvider: FC = ({ children }) => {
  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    initialThemeState
  );

  return (
    <DarkThemeContext.Provider value={{ themeState, themeDispatch }}>
      <ThemeProvider theme={themeState.theme}>{children}</ThemeProvider>
    </DarkThemeContext.Provider>
  );
};

export default DarkThemeProvider;
