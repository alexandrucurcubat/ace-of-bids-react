import { createContext, FC, useState } from 'react';
import { Theme, ThemeProvider } from '@material-ui/core/styles';

import { DARK_THEME, LIGHT_THEME } from './theming';
import { LOCAL_STORAGE } from '../local-storage';

interface IThemeContext {
  theme: Theme;
  isDarkMode: boolean;
  onSetDarkMode?: (isDarkMode: boolean) => void;
}

const localIsDarkMode =
  localStorage.getItem(LOCAL_STORAGE.IS_DARK_MODE) === 'true' || false;

export const DarkThemeContext = createContext<IThemeContext>({
  theme: localIsDarkMode ? DARK_THEME : LIGHT_THEME,
  isDarkMode: false,
});

const DarkThemeProvider: FC = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(localIsDarkMode);
  const theme = isDarkMode ? DARK_THEME : LIGHT_THEME;
  const onSetDarkMode = (isDarkMode: boolean) => {
    setIsDarkMode(isDarkMode);
    localStorage.setItem(LOCAL_STORAGE.IS_DARK_MODE, String(isDarkMode));
  };

  return (
    <DarkThemeContext.Provider value={{ theme, isDarkMode, onSetDarkMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </DarkThemeContext.Provider>
  );
};

export default DarkThemeProvider;
