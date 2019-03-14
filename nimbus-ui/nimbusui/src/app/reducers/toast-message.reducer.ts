import { Action } from '@ngrx/store';
import { ToastMessageActionTypes, ToastMessageActions } from '../actions/toast-message.actions';
import { Message } from '../shared/message';

export const initialState = new Message();

export function toastMessageReducer(state = [initialState], action: ToastMessageActions): Message[] {
  switch (action.type) {

    case ToastMessageActionTypes.LoadMessageEvent:
      return action.payload.messageList;

    case ToastMessageActionTypes.ResetMessageEvent:
      return [initialState];

    default:
      return state;
  }
}
