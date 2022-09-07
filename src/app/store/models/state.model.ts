import { Assessment } from "./assessment.model";
import { Category } from "./category.model";
import { User } from "./user.model";

export interface UserState {
    loading: boolean;
    user: User;
    error: string;
}

export interface AppState {
    readonly user: User;
    readonly categories: Array<Category>;
    readonly assessments: Array<Assessment>;
}