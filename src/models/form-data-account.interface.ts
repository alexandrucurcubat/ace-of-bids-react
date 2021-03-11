export interface IAccountData {
  username: string;
  oldPassword: string;
  newPassword: string;
  confirmationPassword: string;
}

export interface IUsernameData {
  oldPassword: string;
  username: string;
}

export interface IPasswordData {
  oldPassword: string;
  newPassword: string;
}
