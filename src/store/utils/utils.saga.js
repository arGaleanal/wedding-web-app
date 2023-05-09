import { UTILS_ACTION_TYPES } from './utils.types';
import { takeLatest, put, all, call, select } from 'redux-saga/effects';

import {
    loadingStart,
    loadingSuccess,
    loadingFailed
  } from '../loading/loading.action';


  
  
// =============== utilsSagas all with takeLatest ===================
  

export function* utilsSagas() {
    yield all([
    ]);
  }
  