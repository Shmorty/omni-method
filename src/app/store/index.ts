import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAssessment from './reducers/assessment.reducer';
export interface State {
  assessments: fromAssessment.AssessmentState;
}
export const reducers: ActionReducerMap<State> = {
  assessments: fromAssessment.reducer,
};
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
