import {createReducer, on} from "@ngrx/store";
import {User} from "../user/user.model";
import * as CommunityActions from './community.actions';
import {Score} from "../models/score.model";

export interface CommunityState {
    users: User[];
    loading: boolean;
    error: string;
    selectedUID: string;
    selectedUser: User;
    selectedUserScores: Score[];
}

const initialState: CommunityState = {
    users: [],
    loading: false,
    error: '',
    selectedUID: '',
    selectedUser: undefined,
    selectedUserScores: [],
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
    on(CommunityActions.loadSelectedUserScores, (state, action) => ({
        ...state,
        loading: true,
        selectedUserScores: [],
    })),
    on(CommunityActions.loadSelectedUserScoresSuccess, (state, action) => ({
        ...state,
        loading: false,
        selectedUserScores: action.scores,
    })),
    on(CommunityActions.loadSelectedUserScoresFailure, (state, action) => ({
        ...state,
        loading: false,
        error: action.error
    })),
);
