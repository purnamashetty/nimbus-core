import { Action } from '@ngrx/store';

export enum LoaderActionTypes {
  LoadLoader = '[Loader] Load Loader',
  HideLoader = '[Loader] Hide Loader'
}

export class LoadLoader implements Action {
  readonly type = LoaderActionTypes.LoadLoader;
}

export class HideLoader implements Action {
  readonly type = LoaderActionTypes.HideLoader;
}

export type LoaderActions = LoadLoader | HideLoader;
