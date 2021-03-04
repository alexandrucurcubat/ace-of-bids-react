import { createContext } from 'react';
import { Theme } from '@material-ui/core/styles';

import { DARK_THEME, LIGHT_THEME } from './theming';
import { LOCAL_STORAGE } from '../models/local-storage';

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
