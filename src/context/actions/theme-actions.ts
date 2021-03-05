import { SET_DARK_MODE } from '../reducers/theme-reducer';

export const setDarkMode = (dispatch: any, isDarkMode: boolean) => {
  return dispatch({ type: SET_DARK_MODE, isDarkMode });
};
