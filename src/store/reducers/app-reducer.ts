import { AppAction, SET_ERROR, SET_IS_LOADING } from '../actions/app-actions';

export interface IAppState {
  isLoading: boolean;
  error: string | null;
}

export const appReducer = (state: IAppState, action: AppAction) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case SET_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
