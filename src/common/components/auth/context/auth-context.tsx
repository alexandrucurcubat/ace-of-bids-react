import { createContext } from 'react';

import { LoginData } from '../models/auth-form-data';

interface IAuthContext {
  isLoggedIn: boolean;
  login?: (loginData: LoginData) => void;
  logout?: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
});
