import { createContext, FC, useContext, useEffect, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

import AuthDialog from '../components/auth/AuthDialog';
import * as authApi from '../api/auth-api';
import { LocalStorage } from '../models/local-storage.enum';
import { IJwtPayload } from '../models/jwt-payload.interface';
import { ILoginData } from '../models/form-data-login.interface';
import { IAuthContext } from '../models/context-auth.interface';
import { IRegistrationData } from '../models/form-data-registration.interface';
import {
  expiresIn,
  getTokenExpirationDate,
  isTokenExpired,
} from '../utils/jwt-helper';
import { AppContext } from './AppProvider';
import { setError } from './actions/app-actions';
import { authReducer, IAuthState } from './reducers/auth-reducer';
import {
  closeAuthDialog,
  setIsLoggedIn,
  setLoggedUser,
} from './actions/auth-actions';
import { handleError } from '../utils/error-handler';

let authTimer: NodeJS.Timer;

const initialAuthState: IAuthState = {
  loggedUser: null,
  isLoggedIn: false,
  isAuthDialogOpened: false,
};

export const AuthContext = createContext<IAuthContext>({
  authState: initialAuthState,
  authDispatch: () => {},
  onLogin: () => {},
  onLogout: () => {},
  onRegister: () => {},
});

const AuthProvider: FC = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  const { appDispatch } = useContext(AppContext);

  const onLogin = async (loginData: ILoginData) => {
    try {
      appDispatch(setError(null));
      const jwt = await authApi.login(loginData);
      const decodedToken = jwtDecode<IJwtPayload>(jwt);
      const expirationDate = getTokenExpirationDate(jwt);
      setAuthTimer(expirationDate);
      authDispatch(setIsLoggedIn(true));
      authDispatch(setLoggedUser(decodedToken.user));
      authDispatch(closeAuthDialog());
      localStorage.setItem(LocalStorage.JWT, jwt);
    } catch (error) {
      handleError(error, appDispatch);
    }
  };

  const onRegister = async (registrationData: IRegistrationData) => {
    try {
      appDispatch(setError(null));
      await authApi.register(registrationData);
      onLogin(registrationData);
    } catch (error) {
      handleError(error, appDispatch);
    }
  };

  const onLogout = () => {
    authDispatch(setIsLoggedIn(false));
    authDispatch(setLoggedUser(null));
    clearTimeout(authTimer);
    localStorage.removeItem(LocalStorage.JWT);
  };

  const setAuthTimer = (expirationDate: Date) => {
    authTimer = setTimeout(() => {
      onLogout();
    }, expiresIn(expirationDate) * 1000);
  };

  useEffect(() => {
    const localJwt = localStorage.getItem(LocalStorage.JWT);
    if (localJwt && !isTokenExpired(localJwt)) {
      const decodedToken = jwtDecode<IJwtPayload>(localJwt);
      const expirationDate = getTokenExpirationDate(localJwt);
      authDispatch(setIsLoggedIn(true));
      authDispatch(setLoggedUser(decodedToken.user));
      authTimer = setTimeout(() => {
        onLogout();
      }, expiresIn(expirationDate) * 1000);
    } else {
      authDispatch(setIsLoggedIn(false));
      authDispatch(setLoggedUser(null));
      localStorage.removeItem(LocalStorage.JWT);
    }
  }, []);

  const context = {
    authState,
    authDispatch,
    onLogin,
    onLogout,
    onRegister,
  };

  return (
    <AuthContext.Provider value={context}>
      {children}
      <AuthDialog />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
