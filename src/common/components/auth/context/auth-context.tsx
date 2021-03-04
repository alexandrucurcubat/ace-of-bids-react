import { createContext } from 'react';

import { LoginData } from '../models/auth-form-data';
import { User } from '../../../models/user';

interface IAuthContext {
  isLoggedIn: boolean;
  loggedUser: User | null;
  onLogin?: (loginData: LoginData) => void;
  onLogout?: () => void;
  onOpenAuthDialog?: () => void;
  onCloseAuthDialog?: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  loggedUser: null,
});
