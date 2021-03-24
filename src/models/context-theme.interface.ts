import { IThemeState } from '../store/reducers/theme-reducer';

export interface IThemeContext {
  themeState: IThemeState;
  themeDispatch: any;
}
