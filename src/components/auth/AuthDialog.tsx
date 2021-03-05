import { FC, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';

import './AuthDialog.css';
import LoginForm from './login/LoginForm';
import RegistrationForm from './registration/RegistrationForm';
import PasswordResetForm from './password-reset/PasswordResetForm';
import { FormType } from '../../models/form-type.enum';

interface AuthDialogProps {
  isAuthDialogOpened: boolean;
  onCloseAuthDialog: () => void;
}

const renderFormByType = ({
  handleRegistrationMode,
  handlePasswordResetMode,
  handleLoginMode,
}: any) => ({
  [FormType.LOGIN]: (
    <LoginForm
      onRegistrationMode={handleRegistrationMode}
      onPasswordResetMode={handlePasswordResetMode}
    />
  ),
  [FormType.REGISTRATION]: <RegistrationForm onLoginMode={handleLoginMode} />,
  [FormType.PASSWORD_RESET]: (
    <PasswordResetForm onLoginMode={handleLoginMode} />
  ),
});

const AuthDialog: FC<AuthDialogProps> = ({
  isAuthDialogOpened,
  onCloseAuthDialog,
}) => {
  const [formType, setFormType] = useState(FormType.LOGIN);

  const handleCloseAuthDialog = () => onCloseAuthDialog();
  const handleLoginMode = () => setFormType(FormType.LOGIN);
  const handleRegistrationMode = () => setFormType(FormType.REGISTRATION);
  const handlePasswordResetMode = () => setFormType(FormType.PASSWORD_RESET);

  return (
    <Dialog
      className={'auth-dialog'}
      open={isAuthDialogOpened}
      onClose={handleCloseAuthDialog}
    >
      {
        renderFormByType({
          handleRegistrationMode,
          handlePasswordResetMode,
          handleLoginMode,
        })[formType]
      }
    </Dialog>
  );
};

export default AuthDialog;
