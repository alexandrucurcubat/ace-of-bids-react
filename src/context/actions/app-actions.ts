import { SET_ERROR, SET_IS_LOADING } from '../reducers/app-reducer';

export const setIsLoading = (dispatch: any, isLoading: boolean) => {
  return dispatch({ type: SET_IS_LOADING, isLoading });
};

export const setError = (dispatch: any, error: string | null) => {
  return dispatch({ type: SET_ERROR, error });
};
