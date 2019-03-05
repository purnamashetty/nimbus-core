import { LayoutService } from '../services/layout.service';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LoadLayout, LayoutActionTypes } from '../actions';
import { tap, switchMap } from 'rxjs/operators';
import { Layout } from '../model/menu-meta.interface';

@Injectable()
export class LayoutEffects {

  @Effect()
  loadLayout$ = this.actions$.pipe(
    ofType(LayoutActionTypes.RequestLayout),
    switchMap(layout => this.layoutService.layout$),
    tap((layout: Layout) => {
      this.store.dispatch(new LoadLayout({ layout }));
    }));

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private layoutService: LayoutService
  ) { }

}