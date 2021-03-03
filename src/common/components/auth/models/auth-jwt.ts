export interface AuthJwt {
  jwt: string;
}

export interface AuthJwtPayload {
  exp: number;
  user: any;
}
