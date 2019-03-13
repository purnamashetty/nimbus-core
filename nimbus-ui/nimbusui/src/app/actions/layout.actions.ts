import { Action } from '@ngrx/store';
import { Layout } from '../model/menu-meta.interface';

export enum LayoutActionTypes {
  LoadLayout$ = '[Layout] Load Layouts'
}

export class LoadLayout$ implements Action {
  readonly type = LayoutActionTypes.LoadLayout$;

  constructor(public payload: {layout$: Layout}) {}
}


export type LayoutActions = LoadLayout$;
