import { createContext, FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import AuthDialog from '../components/auth/AuthDialog';
import { LocalStorage } from '../models/local-storage.enum';
import { IUser } from '../models/user.interface';
import { IJwtResponse } from '../models/jwt-response.interface';
import { IJwtPayload } from '../models/jwt-payload.interface';
import { ILoginData } from '../models/form-data-login.interface';
import { IAuthContext } from '../models/context-auth.interface';
import {
  expiresIn,
  getTokenExpirationDate,
  isTokenExpired,
} from '../utils/jwt-helper';

let authTimer: NodeJS.Timer;

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  loggedUser: null,
  error: null,
});

const AuthProvider: FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState<IUser | null>(null);
  const [isAuthDialogOpened, setAuthDialogOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const onOpenAuthDialog = useCallback(() => setAuthDialogOpened(true), []);
  const onCloseAuthDialog = useCallback(() => setAuthDialogOpened(false), []);
  const onLogin = async (loginData: ILoginData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData),
        }
      );
      setIsLoading(false);
      if (response.status >= 400 && response.status < 600) {
        setError(response.statusText);
        throw new Error(response.statusText);
      }
      const jwt = ((await response.json()) as IJwtResponse).jwt;
      const decodedToken = jwtDecode<IJwtPayload>(jwt);
      const expirationDate = getTokenExpirationDate(jwt);
      setAuthTimer(expirationDate);
      setIsLoggedIn(true);
      setLoggedUser(decodedToken.user);
      onCloseAuthDialog();
      localStorage.setItem(LocalStorage.JWT, jwt);
      history.push('/account');
    } catch (error) {
      console.log(error);
    }
    console.log('login');
  };
  const onLogout = () => {
    setIsLoggedIn(false);
    clearTimeout(authTimer);
    localStorage.removeItem(LocalStorage.JWT);
    console.log('logout');
  };

  const setAuthTimer = (expirationDate: Date) => {
    authTimer = setTimeout(() => {
      onLogout();
    }, expiresIn(expirationDate) * 1000);
  };

  const handleCloseAuthDialog = () => {
    setAuthDialogOpened(false);
    setError(null);
  };

  useEffect(() => {
    const localJwt = localStorage.getItem(LocalStorage.JWT);
    if (localJwt && !isTokenExpired(localJwt)) {
      const decodedToken = jwtDecode<IJwtPayload>(localJwt);
      const expirationDate = getTokenExpirationDate(localJwt);
      setIsLoggedIn(true);
      setLoggedUser(decodedToken.user);
      authTimer = setTimeout(() => {
        onLogout();
      }, expiresIn(expirationDate) * 1000);
    } else {
      setIsLoggedIn(false);
      setLoggedUser(null);
      localStorage.removeItem(LocalStorage.JWT);
    }
    console.log('autoLogin');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loggedUser,
        error,
        isLoading,
        onLogin,
        onLogout,
        onOpenAuthDialog,
        onCloseAuthDialog,
      }}
    >
      {children}
      <AuthDialog
        isAuthDialogOpened={isAuthDialogOpened}
        onCloseAuthDialog={handleCloseAuthDialog}
      />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
