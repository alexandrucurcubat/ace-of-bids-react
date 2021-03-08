import {
  createContext,
  FC,
  MouseEvent,
  SyntheticEvent,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import AuthDialog from '../components/auth/AuthDialog';
import { LocalStorage } from '../models/local-storage.enum';
import { IJwtResponse } from '../models/jwt-response.interface';
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
  onRegister: () => {},
});

const AuthProvider: FC = ({ children }) => {
  const [isSnackbarOpened, setIsSnackbarOpened] = useState(false);
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  const { appDispatch } = useContext(AppContext);
  const history = useHistory();

  const onLogin = async (loginData: ILoginData) => {
    try {
      appDispatch(setIsLoading(true));
      appDispatch(setError(null));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData),
        }
      );
      appDispatch(setIsLoading(false));
      if (response.status >= 400 && response.status < 600) {
        const responseMessage = (await response.json()).message;
        appDispatch(setError(responseMessage));
        throw new Error(responseMessage);
      }
      const jwt = ((await response.json()) as IJwtResponse).jwt;
      const decodedToken = jwtDecode<IJwtPayload>(jwt);
      const expirationDate = getTokenExpirationDate(jwt);
      setAuthTimer(expirationDate);
      authDispatch(setIsLoggedIn(true));
      authDispatch(setLoggedUser(decodedToken.user));
      authDispatch(closeAuthDialog());
      localStorage.setItem(LocalStorage.JWT, jwt);
      history.push('/account');
    } catch (error) {
      console.log(error);
    }
  };

  const onRegister = async (registrationData: IRegistrationData) => {
    try {
      appDispatch(setIsLoading(true));
      appDispatch(setError(null));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registrationData),
        }
      );
      appDispatch(setIsLoading(false));
      if (response.status >= 400 && response.status < 600) {
        const responseMessage = (await response.json()).message;
        appDispatch(setError(responseMessage));
        throw new Error(responseMessage);
      }
      onLogin(registrationData);
      setIsSnackbarOpened(true);
    } catch (error) {
      console.log(error);
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

  const handleCloseSnackbar = (
    event: SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpened(false);
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

  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
        onLogin,
        onLogout,
        onRegister,
      }}
    >
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={isSnackbarOpened}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Înregistrare reușită cu succes!"
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
      <AuthDialog />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
