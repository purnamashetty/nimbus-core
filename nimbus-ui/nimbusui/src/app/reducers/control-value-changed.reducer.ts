import { Action } from '@ngrx/store';
import { ControlValueChangedActions, ControlValueChangedActionTypes } from '../actions';
import { Param } from '../shared/param-state';

export const initialState: any = {};

export function controlValueChangedReducer(state = initialState, action: ControlValueChangedActions): Param {
  switch (action.type) {

    case ControlValueChangedActionTypes.LoadControlValueChanged:
      return action.payload.element;

    case ControlValueChangedActionTypes.ResetControlValueChanged:
      return initialState;

    default:
      return state;
  }
}
