import { UTILS_ACTION_TYPES } from './utils.types';

const INITIAL_STATE = {
  error: null,
  appTheme: 'PureLightTheme'//PureDarkTheme
};

export const utilsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case UTILS_ACTION_TYPES.SET_APP_THEME:
      return { ...state, appTheme: payload};
    default:
      return state;
  }
};
