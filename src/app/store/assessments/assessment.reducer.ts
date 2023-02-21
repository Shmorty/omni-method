import { Assessment } from './assessment.model';
import * as AssessmentActions from './assessment.actions';
import { createReducer, on } from '@ngrx/store';

export interface AssessmentState {
  assessments: Assessment[];
  loading: boolean;
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: AssessmentState = {
  assessments: [],
  loading: false,
  error: null,
  status: 'pending',
};

export const assessmentReducer = createReducer(
  initialState,
  on(AssessmentActions.loadAssessmentsBegin, (state) => ({
    ...state,
    loading: true,
    error: null,
    status: 'loading',
  })),
  on(AssessmentActions.loadAssessmentsSuccess, (state, action) => ({
    ...state,
    assessments: action.data,
    loading: false,
    error: null,
    status: 'success',
  })),
  on(AssessmentActions.loadAssessmentsFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
    status: 'error',
  }))
);
