import { Action } from '@ngrx/store';
import { UploadFileActions, UploadFileActionTypes } from '../actions/upload-file.actions';


export interface uploadFileState {
  error: boolean;
}

export const initialState: uploadFileState = {
  error: false
};

export function uploadFileReducer(state = initialState, action: UploadFileActions): uploadFileState {
  switch (action.type) {

    case UploadFileActionTypes.LoadUploadFileFailure:
      return {error: true};

    case UploadFileActionTypes.ResetUploadFileStatus:
      return {error: false};

    default:
      return state;
  }
}
