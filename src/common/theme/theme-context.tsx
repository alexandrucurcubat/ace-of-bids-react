import { createContext, FC, useState } from 'react';
import { Theme, ThemeProvider } from '@material-ui/core/styles';

import { DARK_THEME, LIGHT_THEME } from './theming';

export interface IThemeContext {
  theme: Theme;
  isDarkMode: boolean;
  onSetDarkMode?: (isDarkMode: boolean) => void;
}

const localIsDarkMode = localStorage.getItem('isDarkMode') === 'true' || false;

export const DarkThemeContext = createContext<IThemeContext>({
  theme: localIsDarkMode ? DARK_THEME : LIGHT_THEME,
  isDarkMode: false,
});

const DarkThemeProvider: FC = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(localIsDarkMode);
  const theme = isDarkMode ? DARK_THEME : LIGHT_THEME;
  const onSetDarkMode = (isDarkMode: boolean) => {
    setIsDarkMode(isDarkMode);
    localStorage.setItem('isDarkMode', String(isDarkMode));
  };

  return (
    <DarkThemeContext.Provider value={{ theme, isDarkMode, onSetDarkMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </DarkThemeContext.Provider>
  );
};

export default DarkThemeProvider;
