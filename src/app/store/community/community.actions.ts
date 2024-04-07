import {createAction, props} from "@ngrx/store";
import {User} from '../user/user.model';

export enum CommunityActionType {
    LOAD_USERS = '[Community Page] Load Users',
    LOAD_USERS_SUCCESS = '[User API] Load Users Success',
    LOAD_USERS_FAILURE = '[User API] Load Users Failure',
    // Get user assessment scores
}

export const loadCommunityUsers = createAction(
    CommunityActionType.LOAD_USERS
);
export const loadCommunityUsersSuccess = createAction(
    CommunityActionType.LOAD_USERS_SUCCESS,
    props<{users: User[]}>()
);
export const loadCommunityUsersFailure = createAction(
    CommunityActionType.LOAD_USERS_FAILURE,
    props<{error: any}>()
);
