import { all, call } from 'redux-saga/effects';

import { userSagas } from './user/user.saga';
import { utilsSagas } from './utils/utils.saga';

export function* rootSaga() {
  yield all([
    call(userSagas),
    call(utilsSagas),
  ]);
}
