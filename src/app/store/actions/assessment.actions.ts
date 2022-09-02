import { Action } from "@ngrx/store";
import { Assessment } from "../models/assessment.model";

export enum AssessmentActionType {
    GET_ASSESSMENTS = '[Assessment] Get User Assessments',
    ADD_ASSESSMENT = '[Assessment] Add User Assessment',
}

export class GetAssessmentsAction implements Action {
    readonly type = AssessmentActionType.GET_ASSESSMENTS;

    constructor () {}
}

export class AddAssessmentsAction implements Action {
    readonly type = AssessmentActionType.ADD_ASSESSMENT;

    constructor (public payload: Assessment) {}
}

export type AssessmentAction = GetAssessmentsAction | AddAssessmentsAction;