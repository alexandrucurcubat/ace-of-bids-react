import { IError } from '../models/error.interface';
import { ILoginData } from '../models/form-data-login.interface';
import { IRegistrationData } from '../models/form-data-registration.interface';
import { IJwtResponse } from '../models/jwt-response.interface';

export const login = async (loginData: ILoginData) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginData),
  });
  const data = await response.json();
  if (response.status >= 400 && response.status < 600) {
    throw (data as IError).message;
  }
  return (data as IJwtResponse).jwt;
};

export const register = async (registrationData: IRegistrationData) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/auth/register`,
    {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData),
    }
  );
  const data = await response.json();
  if (response.status >= 400 && response.status < 600) {
    throw (data as IError).message;
  }
};
