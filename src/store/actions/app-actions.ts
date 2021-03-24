export const SET_IS_LOADING = '[APP] SET IS LOADING';
export const SET_ERROR = '[APP] SET ERROR';

export const setIsLoading = (isLoading: boolean): AppAction => {
  return { type: SET_IS_LOADING, isLoading };
};

export const setError = (error: string | null): AppAction => {
  return { type: SET_ERROR, error };
};

export type AppAction =
  | { type: '[APP] SET IS LOADING'; isLoading: boolean }
  | { type: '[APP] SET ERROR'; error: string | null };
