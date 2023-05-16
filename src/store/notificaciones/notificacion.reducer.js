import { NOTIFICACIONES_ACTION_TYPES } from './notificacion.types';

const INITIAL_STATE = {
  notificacion: {id: null, asistencia:'', numeroInvitados:0, nombreInvitado:'',leida: false},
  error: null,
  notificaciones: [],
};

export const notificacionReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {

    case NOTIFICACIONES_ACTION_TYPES.SET_NOTIFICACION_CONFIRMACION_START:
        return { ...state, notificaciones: [...state.notificaciones, payload]};

    // case NOTIFICACIONES_ACTION_TYPES.SET_NOTIFICACION_CONFIRMACION_SUCCESS:
    //     return { ...state, notificaciones: payload};

    case NOTIFICACIONES_ACTION_TYPES.GET_NOTIFICACIONES_SUCCESS:
        return { ...state, notificaciones: payload};

    case NOTIFICACIONES_ACTION_TYPES.UPDATE_NOTIFICACION_FAILED:
    case NOTIFICACIONES_ACTION_TYPES.DELETE_NOTIFICACION_FAILED:
    case NOTIFICACIONES_ACTION_TYPES.GET_NOTIFICACIONES_FAILED:
      return { ...state, error: payload };

    default:
      return state;
  }
};
