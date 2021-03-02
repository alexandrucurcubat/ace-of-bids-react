import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface LoginFromProps {
  onRegistrationMode: () => void;
  onPasswordResetMode: () => void;
}

const LoginForm: FC<LoginFromProps> = ({
  onRegistrationMode,
  onPasswordResetMode,
}) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>Conectare</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Încă nu ai un cont?
          <Link className="link-register" to="#" onClick={onRegistrationMode}>
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
        />
      </DialogContent>
      <DialogActions className="auth-dialog-actions">
        <Button
          type="submit"
          className="btn-submit"
          variant="contained"
          color="primary"
        >
          Conectare
        </Button>
        <Link
          className="link-reset-password"
          to="#"
          onClick={onPasswordResetMode}
        >
          Ai uitat parola?
        </Link>
      </DialogActions>
    </form>
  );
};

export default LoginForm;
