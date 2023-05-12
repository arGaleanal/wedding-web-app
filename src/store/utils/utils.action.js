import { UTILS_ACTION_TYPES } from './utils.types';
import { createAction } from '../../utils/reducer/reducer.utils';
// =============================================================================

// =========================== FEATURE FLAGS ===================================


export const setAppTheme = (themeName) => {
  localStorage.setItem('appTheme', themeName);
  return createAction(UTILS_ACTION_TYPES.SET_APP_THEME, themeName);
}
export const setAdminTab= (tab) => {
  localStorage.setItem('adminTab', tab);
  return createAction(UTILS_ACTION_TYPES.SET_ADMIN_TAB, tab);
}
