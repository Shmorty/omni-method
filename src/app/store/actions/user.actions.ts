// import { createAction, props } from "@ngrx/store";
import { User } from '../models/user.model';

export enum UserActionType {
  GET_USER = '[User] Get User',
  UPDATE_USER = '[User] Update User',
  USER_GET_SUCCESSFUL = '[User] Get Successful',
  ERROR_GETTING_USER = '[User] Error Getting',
}

// export const GetUserAction = createAction(UserActionType.GET_USER);
// export const GetUserSuccessAction = createAction(
//   UserActionType.USER_GET_SUCCESSFUL,
//   props<{ payload: User }>()
// );
// export const ErrorGettingUserAction = createAction(
//   UserActionType.ERROR_GETTING_USER,
//   props<{ payload: any }>()
// );
// export const UpdateUserAction = createAction(
//   UserActionType.UPDATE_USER,
//   props<{ payload: User }>()
// );
