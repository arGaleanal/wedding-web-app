import { CONFIRMACIONES_ACTION_TYPES } from './confirmacion.types';
import { createAction } from '../../utils/reducer/reducer.utils';
// =============================================================================

// =========================== CREATE CONFIRMAICON ===================================

export const createConfirmacionSuccess = () =>
  createAction(CONFIRMACIONES_ACTION_TYPES.CREATION_CONFIRMACION_SUCCESS, {});

export const createConfirmacionFailed = (error) =>
  createAction(CONFIRMACIONES_ACTION_TYPES.CREATION_CONFIRMACION_FAILED, error);

export const createConfirmacionStart = (confirmacion) =>
  createAction(CONFIRMACIONES_ACTION_TYPES.CREATION_CONFIRMACION_START, {confirmacion});

// =============================================================================
  
// =========================== GET CONFIRMAICONES ===================================
  
export const getConfirmacionesSuccess = (confirmaciones) =>
  createAction(CONFIRMACIONES_ACTION_TYPES.GET_CONFIRMACIONES_SUCCESS, confirmaciones);
  
export const getConfirmacionesFailed = (error) =>
  createAction(CONFIRMACIONES_ACTION_TYPES.GET_CONFIRMACIONES_FAILED, error);
  
export const getConfirmacionesStart = () =>
  createAction(CONFIRMACIONES_ACTION_TYPES.GET_CONFIRMACIONES_START);
  