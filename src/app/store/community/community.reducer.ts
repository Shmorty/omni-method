import {createReducer, on} from "@ngrx/store";
import {User} from "../user/user.model";
import * as CommunityActions from './community.actions';

export interface CommunityState {
    users: User[];
    loading: boolean;
    error: string;
}

const initialState: CommunityState = {
    users: [],
    loading: false,
    error: '',
}

export const communityReducer = createReducer(
    initialState,
    on(CommunityActions.loadCommunityUsers, (state) => ({
        ...state,
        loading: true,
    })),
    on(CommunityActions.loadCommunityUsersSuccess, (state, action) => ({
        ...state,
        loading: false,
        users: action.users,
    })),
    on(CommunityActions.loadCommunityUsersFailure, (state, action) => ({
        ...state,
        loading: false,
        error: action.error,
    }))
);
