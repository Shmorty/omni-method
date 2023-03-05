import { ActionReducerMap } from '@ngrx/store';
import {
  assessmentReducer,
  AssessmentState,
} from './assessments/assessment.reducer';
import {
  omniScoreReducer,
  OmniScoreState,
} from './omni-score/omni-score.reducer';
import { userReducer, UserState } from './user/user.reducer';

export interface AppState {
  assessmentState: AssessmentState;
  userState: UserState;
  omniScoreState: OmniScoreState;
}

export const reducers: ActionReducerMap<AppState> = {
  omniScoreState: omniScoreReducer,
  assessmentState: assessmentReducer,
  userState: userReducer,
};

// export const metaReducers: MetaReducer<State>[] = !environment.production
//   ? []
//   : [];
