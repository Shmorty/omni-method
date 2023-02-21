import { createAction, props } from '@ngrx/store';
import { Category } from './category.model';

export enum CategoryActionType {
  LOAD_CATEGORIES_BEGIN = '[App Startup] Load Categories Begin',
  LOAD_CATEGORIES_SUCCESS = '[Category API] Load Categories Success',
  LOAD_CATEGORIES_FAILURE = '[Category API] Load Categories Failure',
}

export const loadCategoriesBegin = createAction(
  CategoryActionType.LOAD_CATEGORIES_BEGIN
);

export const loadCategoriesSuccess = createAction(
  CategoryActionType.LOAD_CATEGORIES_SUCCESS,
  // props<{ categories: Category[] }>()
  props<{ data: any }>()
);

export const loadCategoriesFailure = createAction(
  CategoryActionType.LOAD_CATEGORIES_FAILURE,
  props<{ error: any }>()
);
