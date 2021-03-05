export interface IAppState {
  isLoading: boolean;
  error: string | null;
}

export const SET_IS_LOADING = '[APP] SET IS LOADING';
export const SET_ERROR = '[APP] SET ERROR';

export const appReducer = (state: IAppState, action: Action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case SET_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

type Action =
  | { type: '[APP] SET IS LOADING'; isLoading: boolean }
  | { type: '[APP] SET ERROR'; error: string | null };
