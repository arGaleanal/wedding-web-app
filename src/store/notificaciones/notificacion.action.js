import { NOTIFICACIONES_ACTION_TYPES } from './notificacion.types';
import { createAction } from '../../utils/reducer/reducer.utils';

// =============================================================================

// =========================== CREATE CONFIRMAICON ===================================

export const createNotificacionSuccess = () =>
  createAction(NOTIFICACIONES_ACTION_TYPES.CREATE_NOTIFICACION_SUCCESS, {});

export const createNotificacionFailed = (error) =>
  createAction(NOTIFICACIONES_ACTION_TYPES.CREATE_NOTIFICACION_FAILED, error);

export const createNotificacionStart = (notificacion) =>
  createAction(NOTIFICACIONES_ACTION_TYPES.CREATE_NOTIFICACION_START, {notificacion});

// =============================================================================
  
// =========================== GET CONFIRMAICONES ===================================
  
export const getNotificacionesSuccess = (notificaciones) =>
  createAction(NOTIFICACIONES_ACTION_TYPES.GET_NOTIFICACIONES_SUCCESS, notificaciones);
  
export const getNotificacionesFailed = (error) =>
  createAction(NOTIFICACIONES_ACTION_TYPES.GET_NOTIFICACIONES_FAILED, error);
  
export const getNotificacionesStart = () =>
  createAction(NOTIFICACIONES_ACTION_TYPES.GET_NOTIFICACIONES_START);

// =============================================================================

// =========================== UPDATE CONFIRMAICON ===================================

export const updateNotificacionSuccess = () =>
  createAction(NOTIFICACIONES_ACTION_TYPES.UPDATE_NOTIFICACION_SUCCESS, {});

export const updateNotificacionFailed = (error) =>
  createAction(NOTIFICACIONES_ACTION_TYPES.UPDATE_NOTIFICACION_FAILED, error);

export const updateNotificacionStart = (notificacion) =>
  createAction(NOTIFICACIONES_ACTION_TYPES.UPDATE_NOTIFICACION_START, {notificacion});

// =============================================================================

// =========================== DELETE CONFIRMAICON ===================================

export const deleteNotificacionSuccess = () =>
  createAction(NOTIFICACIONES_ACTION_TYPES.DELETE_NOTIFICACION_SUCCESS, {});

export const deleteNotificacionFailed = (error) =>
  createAction(NOTIFICACIONES_ACTION_TYPES.DELETE_NOTIFICACION_FAILED, error);

export const deleteNotificacionStart = (idNotificacion) =>
  createAction(NOTIFICACIONES_ACTION_TYPES.DELETE_NOTIFICACION_START, {idNotificacion});

// =============================================================================

// =========================== NOTICACIONES CONFIRMAICONES ===================================

export const setNoticacionConfirmacionSuccess = (aNotificaciones) =>
createAction(NOTIFICACIONES_ACTION_TYPES.SET_NOTIFICACION_CONFIRMACION_SUCCESS, aNotificaciones);

export const setNoticacionConfirmacionFailed = (error) =>
createAction(NOTIFICACIONES_ACTION_TYPES.SET_NOTIFICACION_CONFIRMACION_FAILED, error);

export const setNoticacionConfirmacionStart = (oNewConfirmacion) =>
createAction(NOTIFICACIONES_ACTION_TYPES.SET_NOTIFICACION_CONFIRMACION_START, oNewConfirmacion);