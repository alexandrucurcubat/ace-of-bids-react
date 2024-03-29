import { FC, MouseEvent, SyntheticEvent, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Person from '@material-ui/icons/Person';
import Lock from '@material-ui/icons/Lock';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import './Account.css';
import * as accountApi from '../api/account-api';
import { AuthContext } from '../store/auth-context';
import { IAccountData } from '../models/form-data-account.interface';
import { AppContext } from '../store/app-context';
import { setError as setAppError } from '../store/actions/app-actions';
import { setLoggedUser } from '../store/actions/auth-actions';
import { LocalStorage } from '../models/local-storage.enum';
import { handleError } from '../utils/error-handler';

const Account: FC = () => {
  const [isSnackbarOpened, setIsSnackbarOpened] = useState(false);
  const { appState, appDispatch } = useContext(AppContext);
  const { authState, authDispatch } = useContext(AuthContext);
  const loggedUser = authState.loggedUser;
  const { handleSubmit, register, errors, setError, setValue } = useForm({
    defaultValues: {
      username: loggedUser?.username,
      oldPassword: '',
      newPassword: '',
      confirmationPassword: '',
    },
  });

  const onSubmit = async (accountData: IAccountData) => {
    const username = accountData.username;
    const oldPassword = accountData.oldPassword;
    const newPassword = accountData.newPassword;
    const confirmationPassword = accountData.confirmationPassword;
    if (newPassword !== confirmationPassword) {
      setError('confirmationPassword', { message: 'Parola nu coincide' });
    } else {
      if (loggedUser) {
        const id = loggedUser.id;
        appDispatch(setAppError(null));
        try {
          const user = await accountApi.updateUsername(id, {
            password: oldPassword,
            username,
          });
          user.jwt && localStorage.setItem(LocalStorage.JWT, user.jwt);
          authDispatch(setLoggedUser(user));
          setIsSnackbarOpened(true);
          setValue('oldPassword', '');
        } catch (error) {
          handleError(error, appDispatch);
        }
        if (newPassword && newPassword.trim() !== '') {
          try {
            await accountApi.updatePassword(id, { oldPassword, newPassword });
            setValue('oldPassword', '');
            setValue('newPassword', '');
            setValue('confirmationPassword', '');
            setIsSnackbarOpened(true);
          } catch (error) {
            handleError(error, appDispatch);
          }
        }
      }
    }
  };

  const handleCloseSnackbar = (
    event: SyntheticEvent | MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpened(false);
  };

  return (
    <form className="account-form" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              alt="avatar"
              src={process.env.PUBLIC_URL + '/logo192.png'}
            ></Avatar>
          }
          title={loggedUser?.username}
          subheader={loggedUser?.email}
        />
        <CardContent>
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
                message:
                  'Numele de uitlizator trebuie să aibă minim 3 caractere',
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
            label="Parola veche *"
            type="password"
            fullWidth
            name="oldPassword"
            inputRef={register({
              required: {
                value: true,
                message: 'Lipsește parola',
              },
            })}
            error={errors.oldPassword ? true : false}
            helperText={errors.oldPassword && errors.oldPassword.message}
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
            label="Parola nouă"
            type="password"
            fullWidth
            name="newPassword"
            inputRef={register({
              minLength: {
                value: 6,
                message: 'Parola trebuie să aibă minim 6 caractere',
              },
            })}
            error={errors.newPassword ? true : false}
            helperText={errors.newPassword && errors.newPassword.message}
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
            label="Confirmă parola nouă"
            type="password"
            fullWidth
            name="confirmationPassword"
            inputRef={register}
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
        </CardContent>
        <div className="text-center">
          {appState.error && <span className="error">{appState.error}</span>}
        </div>
        <CardActions>
          <div className="text-center w-100">
            <Button type="submit" color="primary">
              Salvează modificările
            </Button>
          </div>
        </CardActions>
      </Card>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={isSnackbarOpened}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Date actualizate cu succes!"
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </form>
  );
};

export default Account;
