import {All, ClubActionTypes} from '../actions/club.actions';
import {Club} from '../../models/club';

export interface State {
  currentClub: Club | null;
  clubList: Club[] | null;
  success: Boolean;
}

export const initialState: State = {
  currentClub: null,
  clubList: [],
  success: false,
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case ClubActionTypes.LOAD_SUCCESS:
    case ClubActionTypes.ADD_SUCCESS:
    case ClubActionTypes.ADD_BOXER_SUCCESS:
    case ClubActionTypes.EDIT_SUCCESS: {
      return {
        ...state,
        currentClub: action.payload,
        success: true
      };
    }
    case ClubActionTypes.EDIT_FAILURE: {
      return {
        ...state,
        success: false
      };
    }
    default: {
      return state;
    }
  }
}

