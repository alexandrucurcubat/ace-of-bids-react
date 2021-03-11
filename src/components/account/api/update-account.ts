import { setError } from '../../../context/actions/app-actions';
import { setLoggedUser } from '../../../context/actions/auth-actions';
import { LocalStorage } from '../../../models/local-storage.enum';
import { IUser } from '../../../models/user.interface';
import {
  IPasswordData,
  IUsernameData,
} from '../../../models/form-data-account.interface';

export const updateUsername = async (
  id: number,
  usernameData: IUsernameData,
  appDispatch: any,
  authDispatch: any
) => {
  try {
    appDispatch(setError(null));
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/update/username/${id}`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usernameData),
      }
    );
    if (response.status >= 400 && response.status < 600) {
      const responseMessage = (await response.json()).message;
      appDispatch(setError(responseMessage));
      throw new Error(responseMessage);
    }
    const user = (await response.json()) as IUser;
    authDispatch(setLoggedUser(user));
    user.jwt && localStorage.setItem(LocalStorage.JWT, user.jwt);
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (
  id: number,
  passwordData: IPasswordData,
  appDispatch: any
) => {
  try {
    appDispatch(setError(null));
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/update/password/${id}`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData),
      }
    );
    if (response.status >= 400 && response.status < 600) {
      const responseMessage = (await response.json()).message;
      appDispatch(setError(responseMessage));
      throw new Error(responseMessage);
    }
  } catch (error) {
    console.log(error);
  }
};
