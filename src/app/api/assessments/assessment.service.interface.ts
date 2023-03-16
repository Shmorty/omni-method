import { Observable } from 'rxjs';
import { Assessment, Category } from '../../store/assessments/assessment.model';

export interface IAssessmentService {
  // getAssessments(): Observable<Category[]>;
  getCategories(): Observable<Category[]>;
  getAssessments(): Observable<Assessment[]>;

  setCurrentAssessment(assessment: Assessment): void;

  getCurrentAssessment(): Observable<Assessment>;

  setCurrentCategory(category: Category): void;

  getCurrentCategory(): Observable<Category>;

  getChecklist(aid: string): Array<string>;
}
