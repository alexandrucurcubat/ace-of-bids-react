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
  const onLoginMode = () => setFormType(AuthFormType.LOGIN);
  const onRegistrationMode = () => setFormType(AuthFormType.REGISTRATION);
  const onPasswordResetMode = () => setFormType(AuthFormType.PASSWORD_RESET);

  return (
    <Dialog
      className="auth-dialog"
      open={isAuthDialogOpened}
      onClose={onCloseAuthDialog}
    >
      {formType === AuthFormType.LOGIN && (
        <LoginForm
          onRegistrationMode={onRegistrationMode}
          onPasswordResetMode={onPasswordResetMode}
        />
      )}
      {formType === AuthFormType.REGISTRATION && (
        <RegistrationForm onLoginMode={onLoginMode} />
      )}
      {formType === AuthFormType.PASSWORD_RESET && (
        <PasswordResetForm onLoginMode={onLoginMode} />
      )}
    </Dialog>
  );
};

export default AuthDialog;
