import { takeLatest, put, all, call, select } from 'redux-saga/effects';

import { CONFIRMACIONES_ACTION_TYPES } from './confirmacion.types';

import {
    createConfirmacionFailed,
    createConfirmacionSuccess,
    getConfirmacionesSuccess,
    getConfirmacionesFailed
} from './confirmacion.action';

import {
    createConfirmacionDocument,
    getConfirmacionesAndDocument
} from '../../utils/firebase/firebase.utils';

import {
  loadingStart,
  loadingSuccess,
  loadingFailed
} from '../loading/loading.action';


export function* createConfirmacion({  payload: { confirmacion } }) {
    try {
      yield put(loadingStart())

      const confirmaiconSnapshot = yield call(
        createConfirmacionDocument,
        confirmacion
      );
      console.log('confirmaiconSnapshot',confirmaiconSnapshot)
      yield all([
        put(createConfirmacionSuccess()),
        put(loadingSuccess())
      ]);
    } catch (error) {
      yield put(loadingFailed())
      yield put(createConfirmacionFailed(error));
    }
}

export function* getConfirmacionesAsync() {
    try {
      const confirmacionesArray = yield call(getConfirmacionesAndDocument);
      yield put(getConfirmacionesSuccess(confirmacionesArray));
      yield put(loadingSuccess())
    } catch (error) {
      yield put(getConfirmacionesFailed(error));
    }
}

export function* onCreateConfirmacionStart() {
    yield takeLatest(CONFIRMACIONES_ACTION_TYPES.CREATION_CONFIRMACION_START, createConfirmacion);
}
export function* onGetConfirmacionesStart() {
    yield takeLatest(
        CONFIRMACIONES_ACTION_TYPES.GET_CONFIRMACIONES_START,
        getConfirmacionesAsync
    );
}

export function* confirmacionSagas() {
    yield all([
      call(onCreateConfirmacionStart),
      call(onGetConfirmacionesStart)
    ]);
  }