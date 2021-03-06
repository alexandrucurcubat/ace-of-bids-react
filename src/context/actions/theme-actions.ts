export const SET_DARK_MODE = '[THEME] SET DARK MODE';

export const setDarkMode = (isDarkMode: boolean): ThemeAction => {
  return { type: SET_DARK_MODE, isDarkMode };
};

export type ThemeAction = {
  type: '[THEME] SET DARK MODE';
  isDarkMode: boolean;
};
