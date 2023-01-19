import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAssessment from './reducers/assessment.reducer';
import * as fromCategories from './reducers/category.reducer';

export interface State {
  assessments: fromAssessment.AssessmentState;
  categories: fromCategories.CategoryState;
}
export const reducers: ActionReducerMap<State> = {
  assessments: fromAssessment.reducer,
  categories: fromCategories.reducer,
};
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
