import { Assessment } from "./assessment.model";

export interface Category {
    id: number,
    label: string,
    categoryAverage?: number,
    assessments: Assessment[]
}