import { FC, useContext } from 'react';
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

import './Account.css';
import { AuthContext } from '../../context/AuthProvider';

const Account: FC = () => {
  const { loggedUser } = useContext(AuthContext);
  const { register, handleSubmit, errors, setError } = useForm({
    defaultValues: {
      username: loggedUser?.username,
      oldPassword: '',
      newPassword: '',
      confirmationPassword: '',
    },
  });

  const onSubmit = (data: any) => {
    if (data.password !== data.passwordConfirmation) {
      setError('confirmationPassword', {
        message: 'Parola nu coincide',
      });
    } else {
      console.log(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <CardActions>
          <div className="text-center w-100">
            <Button type="submit" className="btn-submit" color="primary">
              Salvează modificările
            </Button>
          </div>
        </CardActions>
      </Card>
    </form>
  );
};

export default Account;