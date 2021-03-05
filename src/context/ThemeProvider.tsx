import { createContext, FC, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

import { LocalStorage } from '../models/local-storage.enum';
import { IThemeContext } from '../models/context-theme.interface';
import { DARK_THEME, LIGHT_THEME } from '../theming';

const localIsDarkMode =
  localStorage.getItem(LocalStorage.IS_DARK_MODE) === 'true' || false;

export const DarkThemeContext = createContext<IThemeContext>({
  theme: localIsDarkMode ? DARK_THEME : LIGHT_THEME,
  isDarkMode: false,
});

const DarkThemeProvider: FC = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(localIsDarkMode);
  const theme = isDarkMode ? DARK_THEME : LIGHT_THEME;

  const onSetDarkMode = (isDarkMode: boolean) => {
    setIsDarkMode(isDarkMode);
    localStorage.setItem(LocalStorage.IS_DARK_MODE, String(isDarkMode));
  };

  return (
    <DarkThemeContext.Provider value={{ theme, isDarkMode, onSetDarkMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </DarkThemeContext.Provider>
  );
};

export default DarkThemeProvider;
