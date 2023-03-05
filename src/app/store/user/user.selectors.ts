import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { Assessment } from '../assessments/assessment.model';
import { User } from './user.model';
import { UserState } from './user.reducer';

export const selectUserState = (state: AppState) => state.userState;

export const authUser = createSelector(
  selectUserState,
  (userState: UserState) => userState.authUser
);
export const selectUser = createSelector(
  selectUserState,
  (userState: UserState) => userState.user
);
export const userScores = createSelector(
  selectUserState,
  (userState: UserState) => userState.scores
);
export const assessmentScores = (assessment: Assessment) =>
  createSelector(userScores, (score) =>
    score.filter((s) => s.aid === assessment.aid)
  );
