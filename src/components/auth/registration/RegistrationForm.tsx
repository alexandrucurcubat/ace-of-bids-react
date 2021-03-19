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
import Person from '@material-ui/icons/Person';
import Lock from '@material-ui/icons/Lock';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

import { AuthContext } from '../../../context/AuthProvider';
import { AppContext } from '../../../context/AppProvider';

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
  const { onRegister } = useContext(AuthContext);
  const { appState } = useContext(AppContext);
  const handleLoginMode = () => onLoginMode();
  const onSubmit = (registrationData: RegistrationFormData) => {
    if (registrationData.password !== registrationData.confirmationPassword) {
      setError('confirmationPassword', {
        message: 'Parola nu coincide',
      });
    } else {
      onRegister(registrationData);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>Înregistrare cont</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Deja ai un cont?
          <Link className="px-5" to="#" onClick={handleLoginMode}>
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
      {appState.error && <span className="error">{appState.error}</span>}
      <DialogActions className="flex-column">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={appState.isLoading}
        >
          Înregistrare
        </Button>
      </DialogActions>
    </form>
  );
};

export default RegistrationForm;
