import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CategoryState } from './category.reducer';

export const selectCategories = (state: AppState) => state.categoryState;
export const selectAllCategories = createSelector(
  selectCategories,
  (catState: CategoryState) => catState.categories
);
export const isLoadingCategories = createSelector(
  selectCategories,
  (categoryState: CategoryState) => categoryState.loading
);
export const errorCategories = createSelector(
  selectCategories,
  (categoryState: CategoryState) => categoryState.error
);
