import { Theme } from '@material-ui/core';

export interface IThemeContext {
  theme: Theme;
  isDarkMode: boolean;
  onSetDarkMode?: (isDarkMode: boolean) => void;
}
