import * as fireAuth from '@angular/fire/auth';
import {createAction, props} from '@ngrx/store';
import {Score} from '../models/score.model';
import {User} from './user.model';

export enum UserActionType {
  USER_AUTHENTICATION_START = '[User Login] Authentication Start',
  USER_AUTHENTICATED = '[User Login] User Authenticated',
  USER_AUTHENTICATION_FAILURE = '[User Login] Authentication Failed',
  USER_LOGOUT = '[User Logout] User Logout',
  LOAD_USER = '[User Login] Load User',
  UPDATE_USER = '[User Profile Page] Update User',
  LOAD_USER_SUCCESSFUL = '[User API] Load User Successful',
  LOAD_USER_FAILURE = '[User API] Error Loading User',
  REGISTER_USER_SUCCESS = '[Auth Service] Register User Success',
  REGISTER_USER_FAILURE = '[Register Page] Register User Failure',
  NEW_USER = '[New User] New User',
  NEW_USER_SUCCESS = '[User API] New User Success',
  NEW_USER_FAILURE = '[User API] New User Error',
  DELETE_USER_SCORE = '[User Profile Page] Delete User Score',
  SAVE_NEW_SCORE = '[New Score Page] Save New Score',
  SAVE_NEW_SCORE_SUCCESS = '[New Score Page] Save New Score Success',
  DELETE_ASSESSMENT_SCORE = '[Assessment Detail Page] Delete Score',
  DELETE_ASSESSMENT_SCORE_SUCCESS = '[User Service] Delete Score Success',
  LOAD_USER_SCORES = '[User API] Load User Scores',
  LOAD_USER_SCORES_SUCCESS = '[User API] Load User Scores Successful',
  DELETE_USER = '[User API] Delete User',
  DELETE_USER_SUCCESS = '[User API] Delete User Successful',
}

export const userAuthenticationStart = createAction(UserActionType.USER_AUTHENTICATION_START);
export const userAuthenticated = createAction(
  UserActionType.USER_AUTHENTICATED,
  props<{payload: any}>()
);
export const userAuthenticationFailed = createAction(
  UserActionType.USER_AUTHENTICATION_FAILURE,
  props<{error: any}>()
)
export const logoutAction = createAction(UserActionType.USER_LOGOUT);
export const loadUserAction = createAction(
  UserActionType.LOAD_USER,
  props<{uid: string}>()
);
export const registerUserSuccess = createAction(
  UserActionType.REGISTER_USER_SUCCESS,
  props<{payload: fireAuth.User}>()
);
export const registerUserFailure = createAction(
  UserActionType.REGISTER_USER_FAILURE,
  props<{error: any}>()
);
export const loadUserSuccess = createAction(
  UserActionType.LOAD_USER_SUCCESSFUL,
  props<{payload: User}>()
);
export const loadUserFailure = createAction(
  UserActionType.LOAD_USER_FAILURE,
  props<{error: any}>()
);
export const newUser = createAction(
  UserActionType.NEW_USER,
  props<{payload: User}>()
);
export const newUserSuccess = createAction(
  UserActionType.NEW_USER_SUCCESS,
  props<{payload: User}>()
);
export const newUserFailure = createAction(
  UserActionType.NEW_USER_FAILURE,
  props<{error: any}>()
);
export const updateUserAction = createAction(
  UserActionType.UPDATE_USER,
  props<{payload: User}>()
);
export const deleteUserScore = createAction(
  UserActionType.DELETE_USER_SCORE,
  props<{payload: Score}>()
);
export const saveNewScore = createAction(
  UserActionType.SAVE_NEW_SCORE,
  props<{score: Score}>()
);
export const saveNewScoreSuccess = createAction(
  UserActionType.SAVE_NEW_SCORE_SUCCESS,
  props<{score: Score}>()
);
export const deleteAssessmentScore = createAction(
  UserActionType.DELETE_ASSESSMENT_SCORE,
  props<{score: Score}>()
);
export const deleteAssessmentScoreSuccess = createAction(
  UserActionType.DELETE_ASSESSMENT_SCORE_SUCCESS,
  props<{score: Score}>()
);
export const loadUserScoresAction = createAction(
  UserActionType.LOAD_USER_SCORES,
  props<{uid: string}>()
);
export const loadUserScoresSuccessAction = createAction(
  UserActionType.LOAD_USER_SCORES_SUCCESS,
  props<{scores: Score[]}>()
);
export const deleteUser = createAction(
  UserActionType.DELETE_USER,
  props<{user: User}>()
);
export const deleteUserSuccess = createAction(
  UserActionType.DELETE_USER_SUCCESS,
  props<{user: User}>()
);
