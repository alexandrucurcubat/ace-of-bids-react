import { setError, setIsLoading } from '../context/actions/app-actions';

export const handleError = (error: any, appDispatch: any) => {
  appDispatch(setIsLoading(false));
  typeof error === 'string'
    ? appDispatch(setError(translateErrorMessage(error)))
    : appDispatch(setError('A survenit o eroare, încercă mai târziu.'));
};

const translateErrorMessage = (error: string) => {
  console.log(error);
  switch (error) {
    case 'invalid credentials':
      return 'Credențiale incorecte.';
    case 'email exists':
      return 'Email deja existent.';
    case 'username exists':
      return 'Nume de utilizator deja existent.';
    default:
      return 'A survenit o eroare, încercă mai târziu.';
  }
};
