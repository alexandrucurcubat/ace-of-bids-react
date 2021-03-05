import { IAppState } from '../context/reducers/app-reducer';

export interface IAppContext {
  appState: IAppState;
  appDispatch: any;
}
