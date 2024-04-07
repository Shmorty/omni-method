import {createReducer, on} from "@ngrx/store";
import {User} from "../user/user.model";
import * as CommunityActions from './community.actions';

export interface CommunityState {
    users: User[];
    loading: boolean;
    error: string;
    selectedUID: string,
    selectedUser: User;
}

const initialState: CommunityState = {
    users: [],
    loading: false,
    error: '',
    selectedUID: '',
    selectedUser: undefined,
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
    })),
    on(CommunityActions.loadSelectedUser, (state, action) => ({
        ...state,
        loading: true,
        selectedUID: action.uid,
        selectedUser: undefined,
    })),
    on(CommunityActions.loadSelectedUserSuccess, (state, action) => ({
        ...state,
        loading: false,
        selectedUser: action.user,
    })),
    on(CommunityActions.loadSelectedUserFailure, (state, action) => ({
        ...state,
        loading: false,
        error: action.error
    })),
);
