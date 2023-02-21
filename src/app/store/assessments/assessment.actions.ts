import { Action, createAction, props } from '@ngrx/store';
import { Assessment } from './assessment.model';

// export enum AssessmentActionType {
//   GET_ASSESSMENTS = '[Assessment] Get User Assessments',
//   ADD_ASSESSMENT = '[Assessment] Add User Assessment',
// }

// export class GetAssessmentsAction implements Action {
//   readonly type = AssessmentActionType.GET_ASSESSMENTS;

//   constructor() {}
// }

// export class AddAssessmentsAction implements Action {
//   readonly type = AssessmentActionType.ADD_ASSESSMENT;

//   constructor(public payload: Assessment) {}
// }

// export type AssessmentAction = GetAssessmentsAction | AddAssessmentsAction;

export enum AssessmentActionType {
  LOAD_ASSESSMENTS_BEGIN = '[App Startup] Load Assessments Begin',
  LOAD_ASSESSMENTS_SUCCESS = '[Assessment API] Load Assessments Success',
  LOAD_ASSESSMENTS_FAILURE = '[Assessment API] Load Assessments Failure',
}

export const loadAssessmentsBegin = createAction(
  AssessmentActionType.LOAD_ASSESSMENTS_BEGIN
);

export const loadAssessmentsSuccess = createAction(
  AssessmentActionType.LOAD_ASSESSMENTS_SUCCESS,
  // props<{ categories: Category[] }>()
  props<{ data: any }>()
);

export const loadAssessmentsFailure = createAction(
  AssessmentActionType.LOAD_ASSESSMENTS_FAILURE,
  props<{ error: any }>()
);
