import { Assessment } from '../models/assessment.model';
import {
  AssessmentAction,
  AssessmentActionType,
} from '../actions/assessment.actions';

export interface AssessmentState {
  assessments: Assessment[];
}

export const initialState: AssessmentState = {
  assessments: [],
};

export function reducer(
  state = initialState,
  action: AssessmentAction
): AssessmentState {
  switch (action.type) {
    case AssessmentActionType.GET_ASSESSMENTS:
      return {
        assessments: [...state.assessments],
      };
      break;
    case AssessmentActionType.ADD_ASSESSMENT:
      return {
        assessments: [...state.assessments, action.payload],
      };
      break;
    default:
      return state;
      break;
  }
}
