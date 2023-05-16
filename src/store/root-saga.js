import { all, call } from 'redux-saga/effects';

import { userSagas } from './user/user.saga';
import { utilsSagas } from './utils/utils.saga';
import { confirmacionSagas } from './confirmaciones/confirmacion.saga';
import { notificacionSagas } from './notificaciones/notificacion.saga';

export function* rootSaga() {
  yield all([
    call(userSagas),
    call(utilsSagas),
    call(confirmacionSagas),
    call(notificacionSagas)
  ]);
}
