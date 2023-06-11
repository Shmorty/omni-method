import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { Assessment, Category } from '../assessments/assessment.model';
import { OmniScoreState } from './omni-score.reducer';

// export const selectOmniScoreState = (state: AppState) => state.omniScoreState;

// export const selectCategoryScore = (category: Category) =>
//   createSelector(
//     selectOmniScoreState,
//     (omniScoreState: OmniScoreState) =>
//       omniScoreState.categoryScores[category.cid]
//   );

// export const selectOmniScore = createSelector(
//   selectOmniScoreState,
//   (omniScoreState: OmniScoreState) => omniScoreState.omniScore
// );
