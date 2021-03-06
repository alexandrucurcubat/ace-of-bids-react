import {
  AuthAction,
  CLOSE_AUTH_DIALOG,
  OPEN_AUTH_DIALOG,
  SET_IS_LOGGED_IN,
  SET_LOGGED_USER,
} from '../actions/auth-actions';
import { IUser } from '../../models/user.interface';

export interface IAuthState {
  loggedUser: IUser | null;
  isLoggedIn: boolean;
  isAuthDialogOpened: boolean;
}

export const authReducer = (state: IAuthState, action: AuthAction) => {
  switch (action.type) {
    case SET_LOGGED_USER:
      return { ...state, loggedUser: action.loggedUser };
    case SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.isLoggedIn };
    case OPEN_AUTH_DIALOG:
      return { ...state, isAuthDialogOpened: true };
    case CLOSE_AUTH_DIALOG:
      return { ...state, isAuthDialogOpened: false };
    default:
      return state;
  }
};
