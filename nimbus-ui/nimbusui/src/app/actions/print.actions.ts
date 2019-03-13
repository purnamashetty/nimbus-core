import { Action } from '@ngrx/store';

export enum PrintActionTypes {
  LoadPrintClickUpdate$ = '[Print] Load Print Click Update'
}

export class LoadPrintClickUpdate$ implements Action {
  readonly type = PrintActionTypes.LoadPrintClickUpdate$;

  constructor(public payload: {printClickUpdate$: any} ){}
}

export type PrintActions = LoadPrintClickUpdate$;
