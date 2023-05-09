import { LOADING_ACTION_TYPES } from './loading.types';
import { createAction } from '../../utils/reducer/reducer.utils';


export const loadingStart = () =>
  createAction(LOADING_ACTION_TYPES.LOADING_START);

export const loadingSuccess = () =>
  createAction(LOADING_ACTION_TYPES.LOADING_SUCCESS);

export const loadingFailed = () =>
  createAction(LOADING_ACTION_TYPES.LOADING_FAILED);