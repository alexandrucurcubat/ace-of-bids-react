import { FC } from 'react';
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
import Person from '@material-ui/icons/Person';
import Lock from '@material-ui/icons/Lock';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

interface RegistrationFormProps {
  onLoginMode: () => void;
}

interface RegistrationFormData {
  email: string;
  username: string;
  password: string;
  confirmationPassword: string;
}

const RegistrationForm: FC<RegistrationFormProps> = ({ onLoginMode }) => {
  const { register, handleSubmit, errors, setError } = useForm();
  const handleLoginMode = () => onLoginMode();
  const onSubmit = (data: RegistrationFormData) => {
    if (data.password !== data.confirmationPassword) {
      setError('confirmationPassword', {
        message: 'Parola nu coincide',
      });
    } else {
      console.log(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>Înregistrare cont</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Deja ai un cont?
          <Link className="link-register" to="#" onClick={handleLoginMode}>
            Conectează-te
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
          label="Nume utilizator *"
          type="text"
          fullWidth
          name="username"
          inputRef={register({
            required: {
              value: true,
              message: 'Lipsește numele de utilizator',
            },
            minLength: {
              value: 3,
              message: 'Numele de uitlizator trebuie să aibă minim 3 caractere',
            },
          })}
          error={errors.username ? true : false}
          helperText={errors.username && errors.username.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Person />
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
            minLength: {
              value: 6,
              message: 'Parola trebuie să aibă minim 6 caractere',
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
        <TextField
          margin="dense"
          label="Confirmă parola *"
          type="password"
          fullWidth
          name="confirmationPassword"
          inputRef={register({
            required: {
              value: true,
              message: 'Lipsește parola de confirmare',
            },
          })}
          error={errors.confirmationPassword ? true : false}
          helperText={
            errors.confirmationPassword && errors.confirmationPassword.message
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <VerifiedUserIcon />
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions className="auth-dialog-actions">
        <Button
          type="submit"
          className="btn-submit"
          variant="contained"
          color="primary"
        >
          Înregistrare
        </Button>
      </DialogActions>
    </form>
  );
};

export default RegistrationForm;
