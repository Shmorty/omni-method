import {createAction, props} from "@ngrx/store";
import {User} from '../user/user.model';

export enum CommunityActionType {
    LOAD_ALL_USERS = '[Community Page] Load Users',
    LOAD_USERS_SUCCESS = '[User API] Load Users Success',
    LOAD_USERS_FAILURE = '[User API] Load Users Failure',
    LOAD_SELECTED_USER = '[Ranking Detail] Load Selected User',
    LOAD_SELECTED_USER_SUCCESS = '[User API] Load Selected User Success',
    LOAD_SELECTED_USER_FAILURE = '[User API] Load Selected User Failure',
}

export const loadCommunityUsers = createAction(
    CommunityActionType.LOAD_ALL_USERS
);
export const loadCommunityUsersSuccess = createAction(
    CommunityActionType.LOAD_USERS_SUCCESS,
    props<{users: User[]}>()
);
export const loadCommunityUsersFailure = createAction(
    CommunityActionType.LOAD_USERS_FAILURE,
    props<{error: any}>()
);
export const loadSelectedUser = createAction(
    CommunityActionType.LOAD_SELECTED_USER,
    props<{uid: string}>()
);
export const loadSelectedUserSuccess = createAction(
    CommunityActionType.LOAD_SELECTED_USER_SUCCESS,
    props<{user: User}>()
);
export const loadSelectedUserFailure = createAction(
    CommunityActionType.LOAD_SELECTED_USER_FAILURE,
    props<{error: any}>()
);