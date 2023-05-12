import { CONFIRMACIONES_ACTION_TYPES } from './confirmacion.types';

const INITIAL_STATE = {
  confirmacion: {id: null, asistencia:'', numeroInvitados:0, nombreInvitado:''},
  error: null,
  confirmaciones:[]
};

export const confirmacionReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CONFIRMACIONES_ACTION_TYPES.CREATION_CONFIRMACION_SUCCESS:
      return { ...state, confirmacion: state.confirmacion};
    case CONFIRMACIONES_ACTION_TYPES.GET_CONFIRMACIONES_SUCCESS:
        return { ...state, confirmaciones: payload};
    case CONFIRMACIONES_ACTION_TYPES.CREATION_CONFIRMACIONES_FAILED:
    case CONFIRMACIONES_ACTION_TYPES.GET_CONFIRMACIONES_FAILED:
      return { ...state, error: payload };
    default:
      return state;
  }
};
