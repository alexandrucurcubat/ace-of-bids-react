import { IThemeState } from '../context/reducers/theme-reducer';

export interface IThemeContext {
  themeState: IThemeState;
  themeDispatch: any;
}
