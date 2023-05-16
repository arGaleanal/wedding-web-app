import { takeLatest, put, all, call, select } from 'redux-saga/effects';

import { NOTIFICACIONES_ACTION_TYPES } from './notificacion.types';

import {
    updateNotificacionSuccess,
    updateNotificacionFailed,
    deleteNotificacionFailed,
    deleteNotificacionSuccess,
    getNotificacionesSuccess,
    getNotificacionesFailed,
    createNotificacionSuccess,
    createNotificacionFailed,
    getNotificacionesStart,
} from './notificacion.action';

import {
    updateNotificacionDocument,
    deleteNotificacioDocument,
    getSomeNotificacionesAndDocument,
    getAllNotificacionesAndDocument,
    createNotificacionDocument,
} from '../../utils/firebase/firebase.utils';

import {
  loadingStart,
  loadingSuccess,
  loadingFailed
} from '../loading/loading.action';

export function* createNotificacion({  payload: { notificacion } }) {
    try {
      const notificacionSnapshot = yield call(
        createNotificacionDocument,
        notificacion
      );
      console.log('notificacionSnapshot',notificacionSnapshot)
      yield all([
        put(createNotificacionSuccess()),
      ]);
    } catch (error) {
      yield put(createNotificacionFailed(error));
    }
}

export function* getNotificacionesAsync() {
    try {
      const notificacionesArray = yield call(getSomeNotificacionesAndDocument);
      yield put(getNotificacionesSuccess(notificacionesArray));
      yield put(loadingSuccess())
    } catch (error) {
      yield put(getNotificacionesFailed(error));
    }
};

export function* updateNotificacion({payload: {notificacion}}) {
  try {
    // yield put(loadingStart());
    // const currentUser = yield select(selectCurrentUser);
    yield call(updateNotificacionDocument, notificacion);
    yield put(updateNotificacionSuccess());
    yield put(getNotificacionesStart());
    // yield put(loadingSuccess());
  } catch (error) {
    // yield put(loadingFailed());
    yield put(updateNotificacionFailed(error));
  }
};

export function* deleteNotificacion({payload: { idNotificacion}}) {
  try {
    yield put(loadingStart());
    yield call(deleteNotificacioDocument, idNotificacion);
    yield put(deleteNotificacionSuccess());
    yield put(loadingSuccess());
  } catch (error) {
    yield put(loadingFailed());
    yield put(deleteNotificacionFailed(error));
  }
};

export function* onCreateNotificacionStart() {
    yield takeLatest(NOTIFICACIONES_ACTION_TYPES.CREATE_NOTIFICACION_START, createNotificacion);
};

export function* onGetNotificacionesStart() {
    yield takeLatest(
        NOTIFICACIONES_ACTION_TYPES.GET_NOTIFICACIONES_START,
        getNotificacionesAsync
    );
};

export function* onUpdateNotificacionStart() {
  yield takeLatest(NOTIFICACIONES_ACTION_TYPES.UPDATE_NOTIFICACION_START, updateNotificacion);
};

export function* onDeleteNotificacionStart() {
  yield takeLatest(NOTIFICACIONES_ACTION_TYPES.DELETE_NOTIFICACION_START, deleteNotificacion);
};

export function* notificacionSagas() {
    yield all([
      call(onCreateNotificacionStart),
      call(onGetNotificacionesStart),
      call(onUpdateNotificacionStart),
      call(onDeleteNotificacionStart),
    ]);
  }