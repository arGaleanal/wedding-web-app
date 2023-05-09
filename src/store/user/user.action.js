import { USER_ACTION_TYPES } from './user.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

/*
CHECK_USER_SESSION: 'user/CHECK_USER_SESSION',
  GOOGLE_SIGN_IN_START: 'user/GOOGLE_SIGN_IN_START',
  EMAIL_SIGN_IN_START: 'user/EMAIL_SIGN_IN_START',
  SIGN_IN_SUCCESS: 'user/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'user/SIGN_IN_FAILURE'

*/
export const getAllUsersStart = () =>
  createAction(USER_ACTION_TYPES.GET_USERS_START);

export const getAllUsersSuccess = (users) =>
  createAction(USER_ACTION_TYPES.GET_USERS_SUCCESS, users);

export const getAllUsersFailed = (error) =>
  createAction(USER_ACTION_TYPES.GET_USERS_FAILED, error);

export const getUserAuthenticated = (user) =>
  createAction(USER_ACTION_TYPES.GET_CURRENT_USER_AUTHENTICATED,{user});

export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

export const signUpStart = (email, password, displayName, name, lastName, capitan) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    email,
    password,
    displayName,
    name,
    lastName,
    capitan
  });

export const signUpSuccess = (userAuth, additionalDetails) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { userAuth, additionalDetails });

export const signUpFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);

export const signOutStart = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START);

export const signOutSuccess = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

export const signOutFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);

export const updatePasswordStart = (newPassword) =>
  createAction(USER_ACTION_TYPES.UPDATE_PASSWORD_START, { newPassword });

export const updatePasswordSuccess = () =>
  createAction(USER_ACTION_TYPES.UPDATE_PASSWORD_SUCCESS);

export const updatePasswordFailed = (error) =>
  createAction(USER_ACTION_TYPES.UPDATE_PASSWORD_FAILED, error);

export const sendEmailRecoverPasswordStart = (email) =>
  createAction(USER_ACTION_TYPES.SEND_EMAIL_RECOVER_PASSWORD_START, { email });

export const sendEmailRecoverPasswordSuccess = () =>
  createAction(USER_ACTION_TYPES.SEND_EMAIL_RECOVER_PASSWORD_SUCCESS);

export const sendEmailRecoverPasswordFailed = (error) =>
  createAction(USER_ACTION_TYPES.SEND_EMAIL_RECOVER_PASSWORD_FAILED, error);

export const resetUserError = () =>
  createAction(USER_ACTION_TYPES.RESET_USER_ERROR);