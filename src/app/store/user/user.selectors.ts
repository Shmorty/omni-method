import { createFeatureSelector, createSelector, State } from '@ngrx/store';
// import { AppState, UserState } from "../models/state.model";
import { AppState } from '../app.state';
import { User } from './user.model';

// const userState = (state: State) => state.config;

export const selectUser = (state: AppState) => state.user;

// Creating selectors
export const getUserFirstName = createSelector(
  selectUser,
  (user: User) => user.firstName
);
