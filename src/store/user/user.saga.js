import { takeLatest, put, all, call, select } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';

import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
  updatePasswordFailed,
  updatePasswordSuccess,
  sendEmailRecoverPasswordFailed,
  sendEmailRecoverPasswordSuccess,
  setCurrentUser,
  getAllUsersSuccess,
  getAllUsersFailed
} from './user.action';

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  createUserDocumentFromAuth2,
  updatePasswordUserAuth,
  resetUserAuthPassword,
  onGetUserFromAuth,
  getUsersAndDocument,
  getFeatureFlags,
  getJugadorAndDocument
} from '../../utils/firebase/firebase.utils';

import {
  loadingStart,
  loadingSuccess,
  loadingFailed
} from '../loading/loading.action';

import { selectCurrentUser } from './user.selector';


export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    yield put(loadingSuccess())
  } catch (error) {
    yield put(signInFailed(error));
    yield put(loadingFailed())
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    yield put(loadingStart());
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    const userSnapshot = yield call(getSnapshotFromUserAuth, user);
    const currentUser = yield select(selectCurrentUser);
    if(currentUser.id){
      if(currentUser.admin){
        History.navigate('/admin');
      } else {
        History.navigate('/');
      }
   }
  } catch (error) {
    yield put(loadingFailed());
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    yield put(loadingStart());
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) {
      yield put(loadingSuccess());
      return;
    }
    yield call(getSnapshotFromUserAuth, userAuth);
    yield put(loadingSuccess());
  } catch (error) {
    yield put(loadingFailed());
  }
}

export function* getUserAuthenticated({payload:{user}}){
  try {
    yield put(loadingStart());
    const userAuth = yield call(onGetUserFromAuth,user);
    yield put(signInSuccess({ id: userAuth.id,auth:user.auth, ...userAuth.data() }));
    yield put(loadingSuccess());
  } catch (error) {
    yield put(loadingFailed());
    yield put(signInFailed(error));
    yield put(signInFailed());
  }
}

export function* signUp({ payload: { email, password, displayName, name, lastName, capitan } }) {
  try {
    yield put(loadingStart());
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess(user, { displayName, name, lastName, capitan }));
    yield put(loadingSuccess());
  } catch (error) {
    yield put(loadingFailed());
    yield put(signUpFailed(error));
  }
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* signInAfterSignUp({ payload: { userAuth, additionalDetails } }) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth2,
      userAuth,
      additionalDetails
    );
    // JugadorCapitanDefault.idUser = userSnapshot.id;
    // JugadorCapitanDefault.name = userSnapshot.data().displayName;
    yield all([
      // put(createJugadorCapitanStart({...JugadorCapitanDefault})),
      put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })),
    ]);
    History.navigate('/capitan');
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* updateUserPassword({ payload: { newPassword } }) {
  try {
    yield put(loadingStart());
    const userSnapshot = yield call(
      updatePasswordUserAuth,
      newPassword
    );
    yield put(updatePasswordSuccess())
    yield put(loadingSuccess());
  } catch (error) {
    yield put(loadingFailed());
    yield put(updatePasswordFailed(error))
  }
};

export function* sendEmailRecoverPassword({ payload: { email } }) {
  try {
    yield put(loadingStart());
    const userSnapshot = yield call(
      resetUserAuthPassword,
      email
    );
    yield put(sendEmailRecoverPasswordSuccess())
    yield put(loadingSuccess());
  } catch (error) {
    yield put(loadingFailed());
    yield put(sendEmailRecoverPasswordFailed(error))
  }
};


export function* getAllUsersAsync() {
  try {
    yield put(loadingStart())
    const userssArray = yield call(getUsersAndDocument);
    yield put(getAllUsersSuccess(userssArray));
    yield put(loadingSuccess())
  } catch (error) {
    yield put(getAllUsersFailed(error));
  }
}



// =============== userSagas all with takeLatest ===================

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onUpdatePasswordStart() {
  yield takeLatest(USER_ACTION_TYPES.UPDATE_PASSWORD_START, updateUserPassword);
}
export function* onSendEmailRecoverPassword() {
  yield takeLatest(USER_ACTION_TYPES.SEND_EMAIL_RECOVER_PASSWORD_START, sendEmailRecoverPassword);
}
export function* onGetUserAuthenticated() {
  yield takeLatest(USER_ACTION_TYPES.GET_CURRENT_USER_AUTHENTICATED, getUserAuthenticated);
}
export function* onGetAllUsersStart() {
  yield takeLatest(USER_ACTION_TYPES.GET_USERS_START, getAllUsersAsync);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
    call(onUpdatePasswordStart),
    call(onSendEmailRecoverPassword),
    call(onGetUserAuthenticated),
    call(onGetAllUsersStart)
  ]);
}
