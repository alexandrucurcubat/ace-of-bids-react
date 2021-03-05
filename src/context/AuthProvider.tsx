import { createContext, FC, useContext, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import AuthDialog from '../components/auth/AuthDialog';
import { LocalStorage } from '../models/local-storage.enum';
import { IJwtResponse } from '../models/jwt-response.interface';
import { IJwtPayload } from '../models/jwt-payload.interface';
import { ILoginData } from '../models/form-data-login.interface';
import { IAuthContext } from '../models/context-auth.interface';
import {
  expiresIn,
  getTokenExpirationDate,
  isTokenExpired,
} from '../utils/jwt-helper';
import { AppContext } from './AppProvider';
import { setError, setIsLoading } from './actions/app-actions';
import { authReducer, IAuthState } from './reducers/auth-reducer';
import {
  closeAuthDialog,
  setIsLoggedIn,
  setLoggedUser,
} from './actions/auth-actions';

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
});

const AuthProvider: FC = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  const { appDispatch } = useContext(AppContext);
  const history = useHistory();

  const onLogin = async (loginData: ILoginData) => {
    try {
      setIsLoading(appDispatch, true);
      setError(appDispatch, null);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData),
        }
      );
      setIsLoading(appDispatch, false);
      if (response.status >= 400 && response.status < 600) {
        setError(appDispatch, response.statusText);
        throw new Error(response.statusText);
      }
      const jwt = ((await response.json()) as IJwtResponse).jwt;
      const decodedToken = jwtDecode<IJwtPayload>(jwt);
      const expirationDate = getTokenExpirationDate(jwt);
      setAuthTimer(expirationDate);
      setIsLoggedIn(authDispatch, true);
      setLoggedUser(authDispatch, decodedToken.user);
      closeAuthDialog(authDispatch);
      localStorage.setItem(LocalStorage.JWT, jwt);
      history.push('/account');
    } catch (error) {
      console.log(error);
    }
    console.log('login');
  };
  const onLogout = () => {
    setIsLoggedIn(authDispatch, false);
    setLoggedUser(authDispatch, null);
    clearTimeout(authTimer);
    localStorage.removeItem(LocalStorage.JWT);
    console.log('logout');
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
      setIsLoggedIn(authDispatch, true);
      setLoggedUser(authDispatch, decodedToken.user);
      authTimer = setTimeout(() => {
        onLogout();
      }, expiresIn(expirationDate) * 1000);
    } else {
      setIsLoggedIn(authDispatch, false);
      setLoggedUser(authDispatch, null);
      localStorage.removeItem(LocalStorage.JWT);
    }
    console.log('autoLogin');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
        onLogin,
        onLogout,
      }}
    >
      {children}
      <AuthDialog />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
