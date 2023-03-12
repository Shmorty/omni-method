import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { Assessment, Category } from '../assessments/assessment.model';
import { OmniScoreState } from './omni-score.reducer';

export const selectOmniScoreState = (state: AppState) => state.omniScoreState;
// export const selectAllCategories = createSelector(
//   selectCategories,
//   (catState: CategoryState) => catState.categories
// );
// export const isLoadingCategories = createSelector(
//   selectCategories,
//   (categoryState: CategoryState) => categoryState.loading
// );
// export const errorCategories = createSelector(
//   selectCategories,
//   (categoryState: CategoryState) => categoryState.error
// );

export const selectCategoryScore = (category: Category) =>
  createSelector(
    selectOmniScoreState,
    (omniScoreState: OmniScoreState) =>
      omniScoreState.categoryScores[category.cid]
  );

export const selectOmniScore = createSelector(
  selectOmniScoreState,
  (omniScoreState: OmniScoreState) => omniScoreState.omniScore
);
