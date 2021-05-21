import {User} from '../../models/user';
import {All, AuthActionTypes} from '../actions/auth.actions';
import {UserActionTypes} from '../actions/user.actions';


export interface State {
  isAuthenticated: boolean;
  user: User | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      console.log(action.payload);
      return {
        ...state
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    case UserActionTypes.EDIT_SUCCESS: {
      return {
        ...state,
        user: action.payload
      };
    }
    case UserActionTypes.EDIT_FAILURE: {
      return {
        ...state
      };
    }
    default: {
      return state;
    }
  }
}

