import { FC, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';

import './AuthDialog.css';
import LoginForm from './login/LoginForm';
import RegistrationForm from './registration/RegistrationForm';
import PasswordResetForm from './password-reset/PasswordResetForm';
import { AuthFormType } from './models/auth-form-type';

interface AuthDialogProps {
  isAuthDialogOpened: boolean;
  onCloseAuthDialog: () => void;
}

const AuthDialog: FC<AuthDialogProps> = ({
  isAuthDialogOpened,
  onCloseAuthDialog,
}) => {
  const [formType, setFormType] = useState(AuthFormType.LOGIN);

  const handleCloseAuthDialog = () => onCloseAuthDialog();
  const handleLoginMode = () => setFormType(AuthFormType.LOGIN);
  const handleRegistrationMode = () => setFormType(AuthFormType.REGISTRATION);
  const handlePasswordResetMode = () =>
    setFormType(AuthFormType.PASSWORD_RESET);

  return (
    <Dialog
      className={'auth-dialog'}
      open={isAuthDialogOpened}
      onClose={handleCloseAuthDialog}
    >
      {formType === AuthFormType.LOGIN && (
        <LoginForm
          onRegistrationMode={handleRegistrationMode}
          onPasswordResetMode={handlePasswordResetMode}
        />
      )}
      {formType === AuthFormType.REGISTRATION && (
        <RegistrationForm onLoginMode={handleLoginMode} />
      )}
      {formType === AuthFormType.PASSWORD_RESET && (
        <PasswordResetForm onLoginMode={handleLoginMode} />
      )}
    </Dialog>
  );
};

export default AuthDialog;
