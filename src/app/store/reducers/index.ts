import { createSelector } from '@ngrx/store';
import { State } from '..';
import { AppState } from '../models/state.model';
import * as fromAssessment from './assessment.reducer';
import * as fromCategories from './category.reducer';

export const getAssessmentState = (state: State) => state.assessments;

export const getAssessments = createSelector(
  getAssessmentState,
  fromAssessment.getAssessments
);

export const getAssessmentsByCategory = createSelector(
  getAssessmentState,
  fromAssessment.getAssessmentsByCategory
);

export const getCategoryState = (state: State) => state.categories;

export const getCategories = createSelector(
  getCategoryState,
  fromCategories.getCategories
);
