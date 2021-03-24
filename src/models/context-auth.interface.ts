import { IAuthState } from '../store/reducers/auth-reducer';
import { ILoginData } from './form-data-login.interface';
import { IRegistrationData } from './form-data-registration.interface';

export interface IAuthContext {
  authState: IAuthState;
  authDispatch: any;
  onLogin: (loginData: ILoginData) => void;
  onLogout: () => void;
  onRegister: (registrationData: IRegistrationData) => void;
}
