import { Theme } from '@material-ui/core';

import { LocalStorage } from '../../models/local-storage.enum';
import { DARK_THEME, LIGHT_THEME } from '../../theming';

export interface IThemeState {
  isDarkMode: boolean;
  theme: Theme;
}

export const SET_DARK_MODE = '[THEME] SET DARK MODE';

export const themeReducer = (state: IThemeState, action: Action) => {
  switch (action.type) {
    case SET_DARK_MODE:
      return setDarkMode(state, action.isDarkMode);
    default:
      return state;
  }
};

const setDarkMode = (state: IThemeState, isDarkMode: boolean) => {
  localStorage.setItem(LocalStorage.IS_DARK_MODE, String(isDarkMode));
  return {
    ...state,
    isDarkMode,
    theme: isDarkMode ? DARK_THEME : LIGHT_THEME,
  };
};

type Action = { type: '[THEME] SET DARK MODE'; isDarkMode: boolean };
