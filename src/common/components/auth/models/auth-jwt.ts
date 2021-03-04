import { User } from '../../../models/user';

export interface AuthJwt {
  jwt: string;
}

export interface AuthJwtPayload {
  exp: number;
  user: User;
}
