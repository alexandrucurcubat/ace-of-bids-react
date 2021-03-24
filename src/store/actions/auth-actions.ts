import { IUser } from '../../models/user.interface';

export const SET_LOGGED_USER = '[AUTH] SET LOGGED USER';
export const SET_IS_LOGGED_IN = '[AUTH] SET IS LOGGED IN';
export const OPEN_AUTH_DIALOG = '[AUTH] OPEN AUTH DIALOG';
export const CLOSE_AUTH_DIALOG = '[AUTH] CLOSE AUTH DIALOG';

export const setLoggedUser = (loggedUser: IUser | null): AuthAction => {
  return { type: SET_LOGGED_USER, loggedUser };
};

export const setIsLoggedIn = (isLoggedIn: boolean): AuthAction => {
  return { type: SET_IS_LOGGED_IN, isLoggedIn };
};

export const openAuthDialog = (): AuthAction => {
  return { type: OPEN_AUTH_DIALOG };
};

export const closeAuthDialog = (): AuthAction => {
  return { type: CLOSE_AUTH_DIALOG };
};

export type AuthAction =
  | { type: '[AUTH] SET IS LOGGED IN'; isLoggedIn: boolean }
  | { type: '[AUTH] SET LOGGED USER'; loggedUser: IUser | null }
  | { type: '[AUTH] OPEN AUTH DIALOG' }
  | { type: '[AUTH] CLOSE AUTH DIALOG' };
