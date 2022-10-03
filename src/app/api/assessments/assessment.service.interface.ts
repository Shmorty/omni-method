import { Observable } from "rxjs";
import { Category } from "../../store/models/category.model";
import { Assessment } from "../../store/models/assessment.model";

export interface IAssessmentService {

    getAssessments(): Observable<Category[]>;

    setCurrentAssessment(assessment: Assessment): void;
    
    getCurrentAssessment(): Observable<Assessment>;

    setCurrentCategory(category: Category): void;
    
    getCurrentCategory(): Observable<Category>;

}
