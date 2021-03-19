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

interface PasswordResetFormProps {
  onLoginMode: () => void;
}

const PasswordResetForm: FC<PasswordResetFormProps> = ({ onLoginMode }) => {
  const { register, handleSubmit, errors } = useForm();
  const handleLoginMode = () => onLoginMode();
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>Resetare parolă</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Cunoști parola?
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
      </DialogContent>
      <DialogActions className="auth-dialog-actions">
        <Button
          type="submit"
          className="btn-submit"
          variant="contained"
          color="primary"
        >
          Resetare parolă
        </Button>
      </DialogActions>
    </form>
  );
};

export default PasswordResetForm;
