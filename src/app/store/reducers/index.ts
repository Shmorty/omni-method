import { createSelector } from '@ngrx/store';
import { State } from '..';
import { AppState } from '../models/state.model';
import * as fromAssessment from './assessment.reducer';

export const getAssessmentState = (state: State) => state.assessments;

export const getAssessments = createSelector(
  getAssessmentState,
  fromAssessment.getAssessments
);
