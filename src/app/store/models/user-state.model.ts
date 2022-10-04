import { User } from "./user.model";
import { Assessment } from "./assessment.model";
import { Category } from "./category.model";
import { Score } from "./score.model";


export interface userState {
    user: User,
    unadjustedScore: number, // sum category averages
    localRank: number,
    worldRank: number,
    categories: Category[],
    assessments: [
        {
            id: number;
            icon: string;
            label: string;
            description?: string;
            category: string;
            categoryAvg?: number,
            units?: string;
            scores: Score[]
        }
    ]
}