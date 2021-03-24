import { IAppState } from '../store/reducers/app-reducer';

export interface IAppContext {
  appState: IAppState;
  appDispatch: any;
}
