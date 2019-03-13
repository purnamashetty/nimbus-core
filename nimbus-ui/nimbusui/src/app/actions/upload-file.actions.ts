import { Action } from '@ngrx/store';

export enum UploadFileActionTypes {
  LoadUploadFileFailure = '[UploadFile] Load UploadFile Failure',
  ResetUploadFileStatus = '[UploadFile] Reset UploadFile Status'
}

export class LoadUploadFileFailure implements Action {
  readonly type = UploadFileActionTypes.LoadUploadFileFailure;
}

export class ResetUploadFileStatus implements Action {
  readonly type = UploadFileActionTypes.ResetUploadFileStatus;
}

export type UploadFileActions = LoadUploadFileFailure | ResetUploadFileStatus;
