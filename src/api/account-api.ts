import { IUser } from '../models/user.interface';
import { IError } from '../models/error.interface';
import {
  IPasswordData,
  IUsernameData,
} from '../models/form-data-account.interface';

export const updateUsername = async (
  id: number,
  usernameData: IUsernameData
) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/auth/update/username/${id}`,
    {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usernameData),
    }
  );
  const data = await response.json();
  if (response.status >= 400 && response.status < 600) {
    throw (data as IError).message;
  }
  return data as IUser;
};

export const updatePassword = async (
  id: number,
  passwordData: IPasswordData
) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/auth/update/password/${id}`,
    {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(passwordData),
    }
  );
  if (response.status >= 400 && response.status < 600) {
    throw ((await response.json()) as IError).message;
  }
};
