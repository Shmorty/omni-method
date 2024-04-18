import {ActionReducerMap} from '@ngrx/store';
import {assessmentReducer, AssessmentState} from './assessments/assessment.reducer';
import {userReducer, UserState} from './user/user.reducer';
import {communityReducer, CommunityState} from './community/community.reducer';
// import {
//   omniScoreReducer,
//   OmniScoreState,
// } from './omni-score/omni-score.reducer';

export interface AppState {
  assessmentState: AssessmentState;
  userState: UserState;
  communityState: CommunityState;
  // omniScoreState: OmniScoreState;
}

export const reducers: ActionReducerMap<AppState> = {
  // omniScoreState: omniScoreReducer,
  assessmentState: assessmentReducer,
  userState: userReducer,
  communityState: communityReducer,
};
