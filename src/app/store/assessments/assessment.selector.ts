import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AssessmentState } from './assessment.reducer';

export const selectAssessments = (state: AppState) => state.assessmentState;
export const selectAllAssessments = createSelector(
  selectAssessments,
  (asmtState: AssessmentState) => asmtState.assessments
);
export const getAssessmentsByCategory = (
  state: AssessmentState,
  props: { cid: string }
) => state.assessments.find((assessment) => assessment.cid === props.cid);
