import { ActionReducerMap } from '@ngrx/store';
import {
  assessmentReducer,
  AssessmentState,
} from './assessments/assessment.reducer';
import { categoryReducer, CategoryState } from './categories/category.reducer';
import { userReducer, UserState } from './user/user.reducer';

export interface AppState {
  categoryState: CategoryState;
  assessmentState: AssessmentState;
  userState: UserState;
  authenticatedUserId: string | null;
}

export const reducers: ActionReducerMap<AppState> = {
  categoryState: categoryReducer,
  assessmentState: assessmentReducer,
  userState: userReducer,
  authenticatedUserId: undefined,
};

// export const metaReducers: MetaReducer<State>[] = !environment.production
//   ? []
//   : [];
