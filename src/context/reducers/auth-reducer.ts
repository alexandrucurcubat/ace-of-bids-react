import { IUser } from '../../models/user.interface';

export interface IAuthState {
  loggedUser: IUser | null;
  isLoggedIn: boolean;
  isAuthDialogOpened: boolean;
}

export const SET_LOGGED_USER = '[AUTH] SET LOGGED USER';
export const SET_IS_LOGGED_IN = '[AUTH] SET IS LOGGED IN';
export const OPEN_AUTH_DIALOG = '[AUTH] OPEN AUTH DIALOG';
export const CLOSE_AUTH_DIALOG = '[AUTH] CLOSE AUTH DIALOG';

export const authReducer = (state: IAuthState, action: Action) => {
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

type Action =
  | { type: '[AUTH] SET IS LOGGED IN'; isLoggedIn: boolean }
  | { type: '[AUTH] SET LOGGED USER'; loggedUser: IUser | null }
  | { type: '[AUTH] OPEN AUTH DIALOG' }
  | { type: '[AUTH] CLOSE AUTH DIALOG' };
