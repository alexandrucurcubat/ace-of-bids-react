import { createContext, FC, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

import { LoginData } from './models/auth-form-data';
import { AuthJwt, AuthJwtPayload } from './models/auth-jwt';
import { LOCAL_STORAGE } from '../../local-storage';
import { API_URL } from '../../environment';
import {
  expiresIn,
  getTokenExpirationDate,
  isTokenExpired,
} from './utils/jwt-helper';

interface IAuthContext {
  isLoggedIn: boolean;
  login?: (loginData: LoginData) => void;
  logout?: () => void;
}

const LOGIN_URL = `${API_URL}/auth/login`;
let authTimer: NodeJS.Timer;

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
});

const AuthProvider: FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (loginData: LoginData) => {
    const response = await fetch(LOGIN_URL, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });
    const authJwt = (await response.json()) as AuthJwt;
    const jwt = authJwt.jwt;
    const decodedToken = jwtDecode<AuthJwtPayload>(jwt);
    const expirationDate = getTokenExpirationDate(jwt);
    setAuthTimer(expirationDate);
    setIsLoggedIn(true);
    localStorage.setItem(LOCAL_STORAGE.JWT, jwt);
    console.log(decodedToken);
  };

  const logout = () => {
    setIsLoggedIn(false);
    clearTimeout(authTimer);
    localStorage.removeItem(LOCAL_STORAGE.JWT);
    console.log('logout');
  };

  useEffect(() => {
    const autoLogin = () => {
      const localJwt = localStorage.getItem(LOCAL_STORAGE.JWT);
      if (localJwt && !isTokenExpired(localJwt)) {
        const decodedToken = jwtDecode<AuthJwtPayload>(localJwt);
        const expirationDate = getTokenExpirationDate(localJwt);
        if (expiresIn(expirationDate) > 0) {
          authTimer = setTimeout(() => {
            logout();
          }, expiresIn(expirationDate) * 1000);
        }
        console.log(decodedToken);
      }
    };
    autoLogin();
  }, []);

  const setAuthTimer = (expirationDate: Date) => {
    authTimer = setTimeout(() => {
      logout();
    }, expiresIn(expirationDate) * 1000);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
