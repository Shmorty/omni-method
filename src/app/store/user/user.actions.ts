// import { createAction, props } from "@ngrx/store";
import { createAction, props } from '@ngrx/store';
import { Score } from '../models/score.model';
import { User } from './user.model';

export enum UserActionType {
  USER_AUTHENTICATED = '[User Login] User Authenticated',
  USER_LOGOUT = '[User Logout] User Logout',
  LOAD_USER = '[User Login] Load User',
  UPDATE_USER = '[User Profile Page] Update User',
  LOAD_USER_SUCCESSFUL = '[User API] Load User Successful',
  LOAD_USER_FAILURE = '[User API] Error Loading User',
  DELETE_USER_SCORE = '[User Profile Page] Delete User Score',
  SAVE_NEW_SCORE = '[New Score Page] Save New Score',
}

export const userAuthenticatd = createAction(
  UserActionType.USER_AUTHENTICATED,
  props<{ payload: any }>()
);
export const logoutAction = createAction(UserActionType.USER_LOGOUT);
export const loadUserAction = createAction(
  UserActionType.LOAD_USER,
  props<{ uid: string }>()
);
export const loadUserSuccess = createAction(
  UserActionType.LOAD_USER_SUCCESSFUL,
  props<{ payload: User }>()
);
export const loadUserFailure = createAction(
  UserActionType.LOAD_USER_FAILURE,
  props<{ error: any }>()
);
export const updateUserAction = createAction(
  UserActionType.UPDATE_USER,
  props<{ payload: User }>()
);
export const deleteUserScore = createAction(
  UserActionType.DELETE_USER_SCORE,
  props<{ payload: Score }>()
);
export const saveNewScore = createAction(
  UserActionType.SAVE_NEW_SCORE,
  props<{ score: Score }>()
);
