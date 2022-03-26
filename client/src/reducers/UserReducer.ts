import {USER_LOGGED_IN, USER_SIGNED_OUT} from '../actions/UserActions/UserTypes';
import UserDataResponse from '../models/UserDataResponse';

interface UserState {
  data: UserDataResponse | null;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: UserState= {
  data: null,
};

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        data: action.payload,
      };
    case USER_SIGNED_OUT:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
};

export default userReducer;