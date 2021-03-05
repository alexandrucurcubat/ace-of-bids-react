import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import Lock from '@material-ui/icons/Lock';

import { AuthContext } from '../../../context/AuthProvider';
import { ILoginData } from '../../../models/form-data-login.interface';

interface LoginFromProps {
  onRegistrationMode: () => void;
  onPasswordResetMode: () => void;
}

const LoginForm: FC<LoginFromProps> = ({
  onRegistrationMode,
  onPasswordResetMode,
}) => {
  const { register, handleSubmit, errors } = useForm();
  const { onLogin, isLoading, error } = useContext(AuthContext);
  const handleRegistrationMode = () => onRegistrationMode();
  const handlePasswordResetMode = () => onPasswordResetMode();
  const onSubmit = (loginData: ILoginData) => onLogin && onLogin(loginData);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>Conectare</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Încă nu ai un cont?
          <Link
            className="link-register"
            to="#"
            onClick={handleRegistrationMode}
          >
            Înregistrează-te aici
          </Link>
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Email *"
          fullWidth
          name="email"
          inputRef={register({
            required: {
              value: true,
              message: 'Lipsește email-ul',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email invalid',
            },
          })}
          error={errors.email ? true : false}
          helperText={errors.email && errors.email.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AlternateEmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="dense"
          label="Parolă *"
          type="password"
          fullWidth
          name="password"
          inputRef={register({
            required: {
              value: true,
              message: 'Lipsește parola',
            },
          })}
          error={errors.password ? true : false}
          helperText={errors.password && errors.password.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Lock />
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      {error && <span className="error">Email sau parolă incorectă</span>}
      <DialogActions className="auth-dialog-actions">
        <Button
          type="submit"
          className="btn-submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          Conectare
        </Button>
        <Link
          className="link-reset-password"
          to="#"
          onClick={handlePasswordResetMode}
        >
          Ai uitat parola?
        </Link>
      </DialogActions>
    </form>
  );
};

export default LoginForm;
