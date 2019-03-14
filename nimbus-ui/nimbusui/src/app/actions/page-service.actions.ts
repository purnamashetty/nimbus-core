import { Action } from '@ngrx/store';
import { Page } from '../shared/app-config.interface';
import { Param } from '../shared/param-state';

export enum PageActionTypes {
  LoadPageConfig = '[Page] Load Page Config',
  LoadPageLayout = '[Page] Load Page Layout',
  LoadPageEventUpdate = '[Page] Load Page EventUpdate',
  LoadPostResponseProcessing = '[Page] Load Page PostResponseProcessing',
  ResetPostResponseProcessing = '[Page] Reset Page PostResponseProcessing',
  LoadGridValueUpdate = '[Page] Load Page GridValueUpdate',
  ResetGridValueUpdate = '[Page] Reset Page GridValueUpdate'
}

export class LoadPageConfig implements Action {
  readonly type = PageActionTypes.LoadPageConfig;

  constructor(public payload: {config: any}) {}
}

export class LoadPageLayout implements Action {
  readonly type = PageActionTypes.LoadPageLayout;

  constructor(public payload: {layout: string}) {}
}

export class LoadPageEventUpdate implements Action {
  readonly type = PageActionTypes.LoadPageEventUpdate;

  constructor(public payload: {eventUpdate: Param}) {}
}

export class LoadPostResponseProcessing implements Action {
  readonly type = PageActionTypes.LoadPostResponseProcessing;

  constructor(public payload: {postResponseProcessing$: string}) {}
}

export class ResetPostResponseProcessing implements Action {
  readonly type = PageActionTypes.ResetPostResponseProcessing;
}

export class LoadGridValueUpdate implements Action {
  readonly type = PageActionTypes.LoadGridValueUpdate;

  constructor(public payload: {gridValueUpdate$: Param}) {}
}

export class ResetGridValueUpdate implements Action {
  readonly type = PageActionTypes.ResetGridValueUpdate;
}

export type PageActions = LoadPageConfig | LoadPageLayout | LoadPageEventUpdate | LoadPostResponseProcessing | ResetPostResponseProcessing | LoadGridValueUpdate | ResetGridValueUpdate;
