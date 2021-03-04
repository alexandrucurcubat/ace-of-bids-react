import { FC, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

import AuthDialog from '../AuthDialog';
import { AuthContext } from './auth-context';
import { LoginData } from '../models/auth-form-data';
import { AuthJwt, AuthJwtPayload } from '../models/auth-jwt';
import { LOCAL_STORAGE } from '../../../models/local-storage';
import { User } from '../../../models/user';
import {
  expiresIn,
  getTokenExpirationDate,
  isTokenExpired,
} from '../utils/jwt-helper';
import { useHistory } from 'react-router-dom';

let authTimer: NodeJS.Timer;

const AuthProvider: FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [isAuthDialogOpened, setAuthDialogOpened] = useState(false);
  const history = useHistory();

  const onOpenAuthDialog = () => setAuthDialogOpened(true);
  const onCloseAuthDialog = () => setAuthDialogOpened(false);
  const onLogin = async (loginData: LoginData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData),
        }
      );
      const authJwt = (await response.json()) as AuthJwt;
      const jwt = authJwt.jwt;
      const decodedToken = jwtDecode<AuthJwtPayload>(jwt);
      const expirationDate = getTokenExpirationDate(jwt);
      setAuthTimer(expirationDate);
      setIsLoggedIn(true);
      setLoggedUser(decodedToken.user);
      onCloseAuthDialog();
      localStorage.setItem(LOCAL_STORAGE.JWT, jwt);
      history.push('/account');
    } catch (error) {
      console.log(error);
    }
    console.log('login');
  };
  const onLogout = () => {
    setIsLoggedIn(false);
    clearTimeout(authTimer);
    localStorage.removeItem(LOCAL_STORAGE.JWT);
    console.log('logout');
  };

  const setAuthTimer = (expirationDate: Date) => {
    authTimer = setTimeout(() => {
      onLogout();
    }, expiresIn(expirationDate) * 1000);
  };

  useEffect(() => {
    const autoLogin = () => {
      const localJwt = localStorage.getItem(LOCAL_STORAGE.JWT);
      if (localJwt && !isTokenExpired(localJwt)) {
        const decodedToken = jwtDecode<AuthJwtPayload>(localJwt);
        const expirationDate = getTokenExpirationDate(localJwt);
        setIsLoggedIn(true);
        setLoggedUser(decodedToken.user);
        authTimer = setTimeout(() => {
          onLogout();
        }, expiresIn(expirationDate) * 1000);
      } else {
        setIsLoggedIn(false);
        setLoggedUser(null);
        localStorage.removeItem(LOCAL_STORAGE.JWT);
      }
      console.log('autoLogin');
    };
    autoLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loggedUser,
        onLogin,
        onLogout,
        onOpenAuthDialog,
        onCloseAuthDialog,
      }}
    >
      {children}
      <AuthDialog
        isAuthDialogOpened={isAuthDialogOpened}
        onCloseAuthDialog={() => setAuthDialogOpened(false)}
      />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
