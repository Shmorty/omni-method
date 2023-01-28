import { Action } from '@ngrx/store';
import { Category } from '../models/category.model';

export enum CategoryActionType {
  GET_CATEGORIES = '[Category] Get Categories',
  LOAD_CATEGORIES_BEGIN = '[Category] Load Categories Begin',
  LOAD_CATEGORIES_SUCCESS = '[Category] Load Categories Success',
  LOAD_CATEGORIES_FAILURE = '[Category] Load Categories Failure',
}

export class GetCategoriesAction implements Action {
  readonly type = CategoryActionType.GET_CATEGORIES;

  constructor() {}
}

export class LoadCategoriesBegin implements Action {
  readonly type = CategoryActionType.LOAD_CATEGORIES_BEGIN;
}

export class LoadCategoriesSuccess implements Action {
  readonly type = CategoryActionType.LOAD_CATEGORIES_SUCCESS;
  constructor(public payload: { data: any }) {}
}

export class LoadCategoriesFailure implements Action {
  readonly type = CategoryActionType.LOAD_CATEGORIES_FAILURE;
  constructor(public payload: { error: any }) {}
}

export type CategoryAction =
  | GetCategoriesAction
  | LoadCategoriesBegin
  | LoadCategoriesSuccess
  | LoadCategoriesFailure;
