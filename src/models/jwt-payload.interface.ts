import { IUser } from './user.interface';

export interface IJwtPayload {
  exp: number;
  user: IUser;
}
