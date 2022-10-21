import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assessment } from '../../store/models/assessment.model';
import { Category } from '../../store/models/category.model';
import { IAssessmentService } from './assessment.service.interface';
import { DATA } from './mock-assessements';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService implements IAssessmentService {
  private _currentAssessment: Assessment;
  private _currentCategory: Category;
  private _categoryResponse;
  private _assessmentResponse;
  baseUrl = 'https://7crsalgmhk.execute-api.us-east-1.amazonaws.com';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    var reply: Category[];
    this.http.get<any>(this.baseUrl + '/categories').subscribe({
      next: (data) => {
        this._categoryResponse = data;
        console.log(JSON.stringify(data));
        data.Items.forEach((element) => {
          console.log(JSON.stringify(element));
          reply.push({
            id: element.seq,
            cid: element.cid,
            label: element.label,
          });
        });
      },
      error: (error) => {
        console.error('There was an error', error);
      },
    });
    return of(reply);
  }

  getAssessments(): Observable<Assessment[]> {
    var reply: Assessment[];
    this.http.get<any>(this.baseUrl + '/assessments').subscribe({
      next: (data) => {
        this._assessmentResponse = data;
        console.log(JSON.stringify(data));
        data.Items.forEach((element, index) => {
          console.log(JSON.stringify(element));
          reply.push({
            id: index,
            aid: element.aid,
            cid: element.cid,
            icon: element.icon,
            label: element.label,
            units: element.units,
          });
        });
      },
      error: (error) => {
        console.error('There was an error', error);
      },
    });
    return of(reply);
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
