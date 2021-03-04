import { FC, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

import { DARK_THEME, LIGHT_THEME } from './theming';
import { LOCAL_STORAGE } from '../models/local-storage';
import { DarkThemeContext } from './theme-context';

const localIsDarkMode =
  localStorage.getItem(LOCAL_STORAGE.IS_DARK_MODE) === 'true' || false;

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
