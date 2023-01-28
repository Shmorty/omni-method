import { Category } from '../models/category.model';
import {
  CategoryAction,
  CategoryActionType,
} from '../actions/category.actions';

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: any;
}

export const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export function reducer(
  state = initialState,
  action: CategoryAction
): CategoryState {
  switch (action.type) {
    case CategoryActionType.GET_CATEGORIES:
      return {
        categories: [...state.categories],
        loading: false,
        error: null,
      };
      break;
    case CategoryActionType.LOAD_CATEGORIES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
      break;
    case CategoryActionType.LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.data,
      };
      break;
    case CategoryActionType.LOAD_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    default:
      return state;
      break;
  }
}

export const getCategories = (state: CategoryState) => state.categories;
