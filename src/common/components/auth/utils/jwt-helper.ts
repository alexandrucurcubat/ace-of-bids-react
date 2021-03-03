import jwtDecode from 'jwt-decode';

import { AuthJwtPayload } from '../models/auth-jwt';

export const expiresIn = (expirationDate: Date) => {
  return (expirationDate.getTime() - new Date().getTime()) / 1000;
};

export const getTokenExpirationDate = (token: string) => {
  const decoded = jwtDecode<AuthJwtPayload>(token);
  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);
  return date;
};

export const isTokenExpired = (token: string) => {
  const date = getTokenExpirationDate(token);
  return date.valueOf() > new Date().valueOf() * 1000;
};
