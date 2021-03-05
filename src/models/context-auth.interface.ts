import { IAuthState } from '../context/reducers/auth-reducer';
import { ILoginData } from './form-data-login.interface';

export interface IAuthContext {
  authState: IAuthState;
  authDispatch: any;
  onLogin: (loginData: ILoginData) => void;
  onLogout: () => void;
}
