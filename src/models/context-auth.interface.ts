import { ILoginData } from './form-data-login.interface';
import { IUser } from './user.interface';

export interface IAuthContext {
  isLoggedIn: boolean;
  loggedUser: IUser | null;
  error: string | null;
  isLoading?: boolean;
  onLogin?: (loginData: ILoginData) => void;
  onLogout?: () => void;
  onOpenAuthDialog?: () => void;
  onCloseAuthDialog?: () => void;
}
