import { Action } from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import { Param } from '../shared/param-state';
import { PageActions, PageActionTypes } from '../actions';
import { Page } from '../shared/app-config.interface';
import { ConfigService } from '../services/config.service';

export interface PageConfigState {
  layout: string;
  config: any;
  eventUpdate: Param;
  postResponseProcessing$: string;
  gridValueUpdate$: Param;
}

export const initialStateParam: any = {};

export const initialParamConfigState: any = {
  layout: null,
  config: {
    pageConfig: initialStateParam,
    flow: 'intial flow'
  },
  eventUpdate: initialStateParam,
  postResponseProcessing$: '',
  gridValueUpdate$: initialStateParam
};

export function pagereducer(state: PageConfigState = initialParamConfigState, action: PageActions): PageConfigState {
  switch (action.type) {

    case PageActionTypes.LoadPageConfig:
    {
      state.config = action.payload.config;
      return state;
    }

    case PageActionTypes.LoadPageLayout:
    {
      state.layout = action.payload.layout;
      return state;
    }

    case PageActionTypes.LoadPageEventUpdate:
    {
      state.eventUpdate = action.payload.eventUpdate;
      return state;
    }

    case PageActionTypes.LoadPostResponseProcessing:
    {
      state.postResponseProcessing$ = action.payload.postResponseProcessing$;
      return state;
    }

    case PageActionTypes.ResetPostResponseProcessing:
    {
      state.postResponseProcessing$ = '';
      return state;
    }

    case PageActionTypes.LoadGridValueUpdate:
    {
      state.gridValueUpdate$ = action.payload.gridValueUpdate$;
      return state;
    }

    case PageActionTypes.ResetGridValueUpdate:
    {
      state.gridValueUpdate$ = initialStateParam;
      return state;
    }

    default:
      return state;
  }
}
