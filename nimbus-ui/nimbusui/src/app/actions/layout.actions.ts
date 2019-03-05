import { Action } from '@ngrx/store';
import { Layout } from '../model/menu-meta.interface';

export enum LayoutActionTypes {
  RequestLayout = '[Layout] Load Intial Layouts',
  LoadLayout = '[Layout] Load Layouts'
}

export class LoadLayout implements Action {
  readonly type = LayoutActionTypes.LoadLayout;

  constructor(public payload: {layout: Layout}) {}
}

export class RequestLayout implements Action {
  readonly type = LayoutActionTypes.RequestLayout;
}


export type LayoutActions = LoadLayout | RequestLayout;
