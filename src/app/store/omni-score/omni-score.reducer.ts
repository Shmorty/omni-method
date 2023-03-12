import * as OmniScoreActions from './omni-score.actions';
import { createReducer, on } from '@ngrx/store';
// import { OmniScore } from './omni-score.model';

export interface OmniScoreState {
  omniScore: number;
  // categoryScores: Map<string, number>;
  categoryScores: {};
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: OmniScoreState = {
  omniScore: null,
  // categoryScores: new Map<string, number>(),
  categoryScores: {},
  error: null,
  status: 'pending',
};

export const omniScoreReducer = createReducer(
  initialState,
  on(OmniScoreActions.calculateOmniScore, (state) => ({
    ...state,
    error: null,
    status: 'loading',
  })),
  on(OmniScoreActions.setCategoryScore, (state, action) => ({
    ...state,
    categoryScores: {
      ...state.categoryScores,
      [action.cid]: action.score,
    },
    error: null,
    status: 'loading',
  })),
  on(OmniScoreActions.setOmniScore, (state, action) => ({
    ...state,
    omniScore: action.score,
    error: null,
    status: 'success',
  }))
);
