import { SET_ERROR, SET_IS_LOADING } from '../reducers/app-reducer';

export class AppActions {
  static setIsLoading = (dispatch: any, isLoading: boolean) => {
    return dispatch({ type: SET_IS_LOADING, isLoading });
  };

  static setError = (dispatch: any, error: string | null) => {
    return dispatch({ type: SET_ERROR, error });
  };
}
