import { Assessment } from "../models/assessment.model";
import { AssessmentAction, AssessmentActionType } from "../actions/assessment.actions";
// create a dummy initial state
const initialState: Array<Assessment> = [
    {
        id: 0,
        label: '',
        description: '',
        icon: '',
        score: 0,
        units: '',
    },
];
export function assessmentReducer(
    state: Array<Assessment> = initialState,
    action: AssessmentAction
) {
    switch (action.type) {
        case AssessmentActionType.ADD_ASSESSMENT:
            return [...state, action.payload]
            break;
        default:
            return state;
            break;
    }
}