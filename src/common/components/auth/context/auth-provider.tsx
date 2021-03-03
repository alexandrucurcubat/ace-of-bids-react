import { FC, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

import { AuthContext } from './auth-context';
import { LoginData } from '../models/auth-form-data';
import { AuthJwt, AuthJwtPayload } from '../models/auth-jwt';
import { LOCAL_STORAGE } from '../../../local-storage';
import { API_URL } from '../../../environment';
import {
  expiresIn,
  getTokenExpirationDate,
  isTokenExpired,
} from '../utils/jwt-helper';

interface AuthProviderProps {
  onCloseAuthDialog: () => void;
}

let authTimer: NodeJS.Timer;

const AuthProvider: FC<AuthProviderProps> = ({
  children,
  onCloseAuthDialog,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (loginData: LoginData) => {
    try {
      console.log('login', loginData);
      const response = await fetch(`${API_URL}/auth/login`, {
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
      onCloseAuthDialog();
      localStorage.setItem(LOCAL_STORAGE.JWT, jwt);
      console.log(decodedToken);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    clearTimeout(authTimer);
    localStorage.removeItem(LOCAL_STORAGE.JWT);
    console.log('logout');
  };

  const setAuthTimer = (expirationDate: Date) => {
    authTimer = setTimeout(() => {
      logout();
    }, expiresIn(expirationDate) * 1000);
  };

  useEffect(() => {
    const autoLogin = () => {
      const localJwt = localStorage.getItem(LOCAL_STORAGE.JWT);
      if (localJwt && !isTokenExpired(localJwt)) {
        const decodedToken = jwtDecode<AuthJwtPayload>(localJwt);
        const expirationDate = getTokenExpirationDate(localJwt);
        if (expiresIn(expirationDate) > 0) {
          setIsLoggedIn(true);
          authTimer = setTimeout(() => {
            logout();
          }, expiresIn(expirationDate) * 1000);
        }
        console.log(decodedToken);
      }
    };
    autoLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
