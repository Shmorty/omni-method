import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { Category } from './assessment.model';
import { AssessmentState } from './assessment.reducer';

export const selectAssessments = (state: AppState) => state.assessmentState;
export const selectAllAssessments = createSelector(
  selectAssessments,
  (asmtState: AssessmentState) => asmtState.assessments
);
export const selectAllCategories = createSelector(
  selectAssessments,
  (assessmentState: AssessmentState) => assessmentState.categories
);

// export const getAssessmentsByCategory = (
//   state: AssessmentState,
//   props: { cid: string }
// ) => state.assessments.find((assessment) => assessment.cid === props.cid);

export const assessmentsByCategory = (category: Category) =>
  createSelector(selectAllAssessments, (assessment) => {
    return assessment.filter((a) => a.cid === category.cid);
  });

// export const selectChecklist = createSelector(
//   selectAssessments,
//   props: { aid: string }) =>
//   (assessmentState: AssessmentState) => assessmentState.checklists
// );
