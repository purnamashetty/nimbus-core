import { Action } from '@ngrx/store';
import { LoaderActions, LoaderActionTypes } from '../actions';


export interface LoaderState {
  show: boolean
}

export const initialState: LoaderState = {
  show: false
};

export function loaderReducer(state: LoaderState = initialState, action: LoaderActions): LoaderState {
  switch (action.type) {

    case LoaderActionTypes.HideLoader:
      return { ...state, show: false };
  
    case LoaderActionTypes.LoadLoader:
      return { ...state, show: true };

    default:
      return state;
  }
}

export const isShowing = (state: LoaderState) => state.show;

