import { Action } from '@ngrx/store';
import { Param } from '../shared/param-state';

export enum ControlValueChangedActionTypes {
  LoadControlValueChanged = '[ControlValueChanged] Load ControlValueChanged',
  ResetControlValueChanged = '[ControlValueChanged] Reset ControlValueChanged'
}

export class LoadControlValueChanged implements Action {
  readonly type = ControlValueChangedActionTypes.LoadControlValueChanged;

  constructor(public payload: {element: Param}) {}
}

export class ResetControlValueChanged implements Action {
  readonly type = ControlValueChangedActionTypes.ResetControlValueChanged;
}

export type ControlValueChangedActions = LoadControlValueChanged | ResetControlValueChanged;
