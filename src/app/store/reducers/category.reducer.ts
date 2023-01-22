import { Category } from '../models/category.model';
import {
  CategoryAction,
  CategoryActionType,
} from '../actions/category.actions';

export interface CategoryState {
  categories: Category[];
}

export const initialState: CategoryState = {
  categories: [],
};

export function reducer(
  state = initialState,
  action: CategoryAction
): CategoryState {
  switch (action.type) {
    case CategoryActionType.GET_CATEGORIES:
      return {
        categories: [...state.categories],
      };
      break;
    default:
      return state;
      break;
  }
}

export const getCategories = (state: CategoryState) => state.categories;
