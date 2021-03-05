import { IUser } from '../../models/user.interface';
import {
  CLOSE_AUTH_DIALOG,
  OPEN_AUTH_DIALOG,
  SET_IS_LOGGED_IN,
  SET_LOGGED_USER,
} from '../reducers/auth-reducer';

export const setLoggedUser = (dispatch: any, loggedUser: IUser | null) => {
  return dispatch({ type: SET_LOGGED_USER, loggedUser });
};

export const setIsLoggedIn = (dispatch: any, isLoggedIn: boolean) => {
  return dispatch({ type: SET_IS_LOGGED_IN, isLoggedIn });
};

export const openAuthDialog = (dispatch: any) => {
  return dispatch({ type: OPEN_AUTH_DIALOG });
};

export const closeAuthDialog = (dispatch: any) => {
  return dispatch({ type: CLOSE_AUTH_DIALOG });
};
