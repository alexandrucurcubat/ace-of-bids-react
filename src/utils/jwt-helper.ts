import jwtDecode from 'jwt-decode';

import { IJwtPayload } from '../models/jwt-payload.interface';

export const expiresIn = (expirationDate: Date) => {
  return (expirationDate.getTime() - new Date().getTime()) / 1000;
};

export const getTokenExpirationDate = (token: string) => {
  const decodedToken = jwtDecode<IJwtPayload>(token);
  const date = new Date(0);
  date.setUTCSeconds(decodedToken.exp);
  return date;
};

export const isTokenExpired = (token: string) => {
  const date = getTokenExpirationDate(token);
  return date.valueOf() > new Date().valueOf() * 1000;
};
