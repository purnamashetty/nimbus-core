import { Action } from '@ngrx/store';
import { Message } from '../shared/message';

export enum ToastMessageActionTypes {
  LoadMessageEvent = '[ToastMessage] Load Message Event',
  ResetMessageEvent = '[ToastMessage] Reset Message Event'
}

export class LoadMessageEvent implements Action {
  readonly type = ToastMessageActionTypes.LoadMessageEvent;

  constructor(public payload: {messageList: Message[]}) {}
}

export class ResetMessageEvent implements Action {
  readonly type = ToastMessageActionTypes.ResetMessageEvent;

}

export type ToastMessageActions = LoadMessageEvent | ResetMessageEvent;
