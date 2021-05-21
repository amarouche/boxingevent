import {Action} from '@ngrx/store';

export enum UserActionTypes {
  EDIT = '[User] Edit',
  EDIT_SUCCESS = '[User] Edit Success',
  EDIT_FAILURE = '[User] Edit Failure',
  LOAD = '[User] Load',
  LOAD_BOXER = '[Boxer] Load',
  LOAD_SUCCESS = '[User] Load Success',
  LOAD_FAILURE = '[User] Load Failure',
  LOAD_INDEPENDENT_BOXERS = '[Boxers] Load Independent Boxers',
  LOAD_USER_LIST_SUCCESS = '[User] Load list success',

}

export class EditUser implements Action {
  readonly type = UserActionTypes.EDIT;

  constructor(public payload: FormData) {
  }
}

export class EditUserSuccess implements Action {
  readonly type = UserActionTypes.EDIT_SUCCESS;

  constructor(public payload: any) {
  }
}

export class EditUserFailure implements Action {
  readonly type = UserActionTypes.EDIT_FAILURE;

  constructor(public payload: any) {
  }
}

export class LoadUser implements Action {
  readonly type = UserActionTypes.LOAD;

  constructor(public payload: any) {
  }
}

export class LoadBoxer implements Action {
  readonly type = UserActionTypes.LOAD_BOXER;

  constructor(public payload: any) {
  }
}

export class LoadUserSuccess implements Action {
  readonly type = UserActionTypes.LOAD_SUCCESS;

  constructor(public payload: any) {
  }
}

export class LoadUserFailure implements Action {
  readonly type = UserActionTypes.LOAD_FAILURE;

  constructor(public payload: any) {
  }
}

export class LoadIndependentBoxers implements Action {
  readonly type = UserActionTypes.LOAD_INDEPENDENT_BOXERS;

  constructor() {
  }
}

export class LoadUserListSuccess implements Action {
  readonly type = UserActionTypes.LOAD_USER_LIST_SUCCESS;

  constructor(public payload: any) {
  }
}

export type All =
  | EditUser
  | EditUserSuccess
  | EditUserFailure
  | LoadUser
  | LoadBoxer
  | LoadUserSuccess
  | LoadUserFailure
  | LoadIndependentBoxers
  | LoadUserListSuccess
  ;
