import { createAction, props } from '@ngrx/store';

export enum OmniScoreActionType {
  CALCULATE_OMNI_SCORE = '[APP Data] Calculate Omni Score',
  SET_CATEGORY_SCORE = '[Omni Score Service] Set Category Score',
  SET_OMNI_SCORE = '[Omni Score Service] Set Omni Score',
}

export const calculateOmniScore = createAction(
  OmniScoreActionType.CALCULATE_OMNI_SCORE
);
export const setCategoryScore = createAction(
  OmniScoreActionType.SET_CATEGORY_SCORE,
  props<{ cid: string; score: number }>()
);
export const setOmniScore = createAction(
  OmniScoreActionType.SET_OMNI_SCORE,
  props<{ score: number }>()
);
