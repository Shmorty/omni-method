import { Category } from './category.model';
import * as CategoryActions from './category.actions';
import { createReducer, on } from '@ngrx/store';

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
  status: 'pending',
};

export const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.loadCategoriesBegin, (state) => ({
    ...state,
    loading: true,
    error: null,
    status: 'loading',
  })),
  on(CategoryActions.loadCategoriesSuccess, (state, action) => ({
    ...state,
    categories: action.data,
    loading: false,
    error: null,
    status: 'success',
  })),
  on(CategoryActions.loadCategoriesFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
    status: 'error',
  }))
);
