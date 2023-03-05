import { AuthenticationUser, User } from './user.model';
import * as UserActions from './user.actions';
import { createReducer, on } from '@ngrx/store';
import { Score } from '../models/score.model';

export interface UserState {
  isAuthenticated: boolean;
  loading: boolean;
  user: User;
  authUser: any;
  scores: Score[];
  error: string;
}

const initialState: UserState = {
  isAuthenticated: false,
  authUser: null,
  loading: false,
  user: null,
  scores: [],
  error: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.userAuthenticatd, (state, action) => ({
    ...state,
    isAuthenticated: true,
    authUser: action.payload,
  })),
  on(UserActions.logoutAction, (state) => ({
    ...state,
    isAuthenticated: false,
    authUser: null,
  })),
  on(UserActions.loadUserAction, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(UserActions.loadUserSuccess, (state, action) => ({
    ...state,
    loading: false,
    user: action.payload['user'],
    scores: action.payload['scores'],
    error: '',
  })),
  on(UserActions.loadUserFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(UserActions.updateUserAction, (state, action) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(UserActions.saveNewScore, (state, action) => ({
    ...state,
    scores: [...state.scores, action.score],
    loading: false,
    error: null,
  }))
);
