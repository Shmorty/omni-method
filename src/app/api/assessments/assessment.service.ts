import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assessment } from '../../store/models/assessment.model';
import { Category } from '../../store/models/category.model';
import { IAssessmentService } from './assessment.service.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService implements IAssessmentService {
  private _currentAssessment: Assessment;
  private _currentCategory: Category;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<any>(environment.baseUrl + '/categories');
  }

  getAssessments(): Observable<Assessment[]> {
    return this.http.get<any>(environment.baseUrl + '/assessments');
  }

  setCurrentAssessment(assessment: Assessment) {
    this._currentAssessment = assessment;
  }

  getCurrentAssessment(): Observable<Assessment> {
    return of(this._currentAssessment);
  }

  setCurrentCategory(category: Category): void {
    this._currentCategory = category;
  }

  getCurrentCategory(): Observable<Category> {
    return of(this._currentCategory);
  }
}
