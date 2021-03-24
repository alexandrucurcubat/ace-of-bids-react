import { FC, useContext, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';

import './AuthDialog.css';
import LoginForm from './login/LoginForm';
import RegistrationForm from './registration/RegistrationForm';
import PasswordResetForm from './password-reset/PasswordResetForm';
import { FormType } from '../../models/form-type.enum';
import { AuthContext } from '../../store/auth-context';
import { closeAuthDialog } from '../../store/actions/auth-actions';
import { AppContext } from '../../store/app-context';
import { setError } from '../../store/actions/app-actions';

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

const AuthDialog: FC = () => {
  const [formType, setFormType] = useState(FormType.LOGIN);
  const { authState, authDispatch } = useContext(AuthContext);
  const { appDispatch } = useContext(AppContext);

  const handleCloseAuthDialog = () => {
    authDispatch(closeAuthDialog());
    appDispatch(setError(null));
    setFormType(FormType.LOGIN);
  };
  const handleLoginMode = () => {
    appDispatch(setError(null));
    setFormType(FormType.LOGIN);
  };
  const handleRegistrationMode = () => {
    appDispatch(setError(null));
    setFormType(FormType.REGISTRATION);
  };
  const handlePasswordResetMode = () => {
    appDispatch(setError(null));
    setFormType(FormType.PASSWORD_RESET);
  };

  return (
    <Dialog open={authState.isAuthDialogOpened} onClose={handleCloseAuthDialog}>
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
