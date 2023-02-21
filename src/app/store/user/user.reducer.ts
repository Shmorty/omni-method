import { User } from './user.model';
import * as UserActions from './user.actions';
import { createReducer, on } from '@ngrx/store';

export interface UserState {
  user: User;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  loading: false,
  user: null,
  error: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUserAction, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(UserActions.loadUserSuccess, (state, action) => ({
    loading: false,
    user: action.payload,
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
  }))
);
