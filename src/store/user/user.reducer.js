import { USER_ACTION_TYPES } from './user.types';

const INITIAL_STATE = {
  currentUser: {id: null, admin:false},
  error: null,
  users: [],
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return { ...state, currentUser: payload, error:null };
    case USER_ACTION_TYPES.GET_USERS_SUCCESS:
      return { ...state, users: payload};
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return { ...state, currentUser: {id: null, capitan:false}, error:null };
    case USER_ACTION_TYPES.RESET_USER_ERROR:
        return { ...state, error:null };  
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
    case USER_ACTION_TYPES.UPDATE_PASSWORD_FAILED:
      return { ...state, error: payload };
    default:
      return state;
  }
};
