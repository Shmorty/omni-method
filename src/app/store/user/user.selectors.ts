import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { Assessment } from '../assessments/assessment.model';
import { UserState } from './user.reducer';

export const selectUserState = (state: AppState) => state.userState;

export const selectAuthUser = createSelector(
  selectUserState,
  (userState: UserState) => userState.authUser
);
export const selectIsAuthenticated = createSelector(
  selectUserState,
  (userState: UserState) => userState.isAuthenticated
);
export const selectUser = createSelector(
  selectUserState,
  (userState: UserState) => userState.user
);
export const selectUserError = createSelector(
  selectUserState,
  (userState: UserState) => userState.error
);
export const userScores = createSelector(
  selectUserState,
  (userState: UserState) => userState.scores
);
export const assessmentScores = (assessment: Assessment) =>
  createSelector(userScores, (score) =>
    score.filter((s) => s.aid === assessment.aid)
  );
