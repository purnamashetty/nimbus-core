import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromLayout from './layout.reducer';

export interface AppState {
  layout: fromLayout.LayoutState;
}

export const reducers: ActionReducerMap<AppState> = {
  layout: fromLayout.layoutReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
