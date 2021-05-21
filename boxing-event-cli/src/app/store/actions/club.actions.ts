import {Action} from '@ngrx/store';

export enum ClubActionTypes {
  ADD = '[Club] Add',
  ADD_SUCCESS = '[Club] Add Success',
  ADD_FAILURE = '[Club] Add Failure',
  EDIT = '[Club] Edit',
  EDIT_SUCCESS = '[Club] Edit Success',
  EDIT_FAILURE = '[Club] Edit Failure',
  LOAD = '[Club] Load',
  LOAD_SUCCESS = '[Club] Load Success',
  LOAD_FAILURE = '[Club] Load Failure',
  ADD_BOXER_TO_CLUB = '[Boxer] Add to Club',
  ADD_NEW_BOXER = '[Boxer] Add New Boxer',
  ADD_BOXER_SUCCESS = '[Boxer] Add Boxer Success',
  ADD_BOXER_FAILURE = '[Boxer] Add Boxer Failure',
}

export class AddClub implements Action {
  readonly type = ClubActionTypes.ADD;

  constructor(public payload: any) {
  }
}

export class AddClubSuccess implements Action {
  readonly type = ClubActionTypes.ADD_SUCCESS;

  constructor(public payload: any) {
  }
}

export class AddClubFailure implements Action {
  readonly type = ClubActionTypes.ADD_FAILURE;

  constructor(public payload: any) {
  }
}

export class EditClub implements Action {
  readonly type = ClubActionTypes.EDIT;

  constructor(public payload: any) {
  }
}

export class EditClubSuccess implements Action {
  readonly type = ClubActionTypes.EDIT_SUCCESS;

  constructor(public payload: any) {
  }
}

export class EditClubFailure implements Action {
  readonly type = ClubActionTypes.EDIT_FAILURE;

  constructor(public payload: any) {
  }
}

export class LoadClub implements Action {
  readonly type = ClubActionTypes.LOAD;

  constructor() {
  }
}

export class LoadClubSuccess implements Action {
  readonly type = ClubActionTypes.LOAD_SUCCESS;

  constructor(public payload: any) {
  }
}

export class LoadClubFailure implements Action {
  readonly type = ClubActionTypes.LOAD_FAILURE;

  constructor(public payload: any) {
  }
}

export class AddBoxerToClub implements Action {
  readonly type = ClubActionTypes.ADD_BOXER_TO_CLUB;

  constructor(public payload: any) {
  }
}

export class AddNewBoxer implements Action {
  readonly type = ClubActionTypes.ADD_NEW_BOXER;

  constructor(public payload: any) {
  }
}

export class AddBoxerSuccess implements Action {
  readonly type = ClubActionTypes.ADD_BOXER_SUCCESS;

  constructor(public payload: any) {
  }
}

export class AddBoxerFailure implements Action {
  readonly type = ClubActionTypes.ADD_BOXER_FAILURE;

  constructor(public payload: any) {
  }
}

export type All =
  | AddClub
  | AddClubSuccess
  | AddClubFailure
  | EditClub
  | EditClubSuccess
  | EditClubFailure
  | LoadClub
  | LoadClubSuccess
  | LoadClubFailure
  | AddBoxerToClub
  | AddNewBoxer
  | AddBoxerSuccess
  | AddBoxerFailure
  ;
