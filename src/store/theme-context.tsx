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

export const ThemeContext = createContext<IThemeContext>({
  themeState: initialThemeState,
  themeDispatch: () => {},
});

const ThemeContextProvider: FC = ({ children }) => {
  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    initialThemeState
  );

  const context = { themeState, themeDispatch };

  return (
    <ThemeContext.Provider value={context}>
      <ThemeProvider theme={themeState.theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
