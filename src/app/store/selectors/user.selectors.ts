import { createFeatureSelector, createSelector, State } from "@ngrx/store";
import { AppState, UserState } from "../models/state.model";
import { User } from "../models/user.model";

// const userState = (state: State) => state.config;

export const selectUser = (state: AppState) => state.user;

// Creating selectors
export const getUserFirstName = createSelector(
    selectUser,
    (user: User) => user.firstName
);
