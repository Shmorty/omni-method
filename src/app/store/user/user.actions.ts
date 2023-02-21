// import { createAction, props } from "@ngrx/store";
import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export enum UserActionType {
  LOAD_USER = '[User Login] Load User',
  UPDATE_USER = '[User Profile Page] Update User',
  LOAD_USER_SUCCESSFUL = '[User API] Load Successful',
  LOAD_USER_FAILURE = '[User API] Error Loading User',
}

export const loadUserAction = createAction(UserActionType.LOAD_USER);
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
