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

export const selectCategoryById = (cid: string) =>
  createSelector(selectAssessments, (state: AssessmentState) =>
    state.categories.find((category) => category.cid === cid)
  );

export const selectAssessmentById = (aid: string) =>
  createSelector(selectAssessments, (state: AssessmentState) =>
    state.assessments.find((assessment) => assessment.aid === aid)
  );

export const assessmentsByCategory = (category: Category) =>
  createSelector(selectAllAssessments, (assessment) => {
    return assessment.filter((a) => a.cid === category.cid);
  });

export const selectAllChecklists = createSelector(
  selectAssessments,
  (asmtState: AssessmentState) => asmtState.checklists
);

export const selectChecklist = (aid: string) =>
  createSelector(
    selectAssessments,
    (state: AssessmentState) =>
      state.checklists.find((checklist) => checklist.aid === aid).skills
  );

// export const selectChecklist = createSelector(
//   selectAssessments,
//   props: { aid: string }) =>
//   (assessmentState: AssessmentState) => assessmentState.checklists
// );
