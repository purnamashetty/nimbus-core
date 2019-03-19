import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromLoader from './loader.reducer';

export const selectLoaderEntity = createFeatureSelector<fromLoader.LoaderState>(
  'loader'
);

export const isLoaderShowing = createSelector(
  selectLoaderEntity,
  fromLoader.isShowing
);

export interface AppState {
}

export const reducers: ActionReducerMap<AppState> = {
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
