import { LOADING_ACTION_TYPES } from './loading.types';

const INITIAL_STATE = {
  isLoading: false,
};

export const loadingReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOADING_ACTION_TYPES.LOADING_START:
      return { ...state, isLoading: true };
    case LOADING_ACTION_TYPES.LOADING_SUCCESS:
        return { ...state, isLoading: false };
    case LOADING_ACTION_TYPES.LOADING_FAILED:
        return { ...state, isLoading: false };
    default:
      return state;
  }
};
