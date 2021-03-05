import { IUser } from '../../models/user.interface';
import {
  CLOSE_AUTH_DIALOG,
  OPEN_AUTH_DIALOG,
  SET_IS_LOGGED_IN,
  SET_LOGGED_USER,
} from '../reducers/auth-reducer';

export class AuthActions {
  static setLoggedUser = (dispatch: any, loggedUser: IUser | null) => {
    return dispatch({ type: SET_LOGGED_USER, loggedUser });
  };

  static setIsLoggedIn = (dispatch: any, isLoggedIn: boolean) => {
    return dispatch({ type: SET_IS_LOGGED_IN, isLoggedIn });
  };

  static openAuthDialog = (dispatch: any) => {
    return dispatch({ type: OPEN_AUTH_DIALOG });
  };

  static closeAuthDialog = (dispatch: any) => {
    return dispatch({ type: CLOSE_AUTH_DIALOG });
  };
}
