import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assessment } from '../../store/models/assessment.model';
import { Category } from '../../store/models/category.model';
import { IAssessmentService } from './assessment.service.interface';
import { DATA } from './mock-assessements';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AssessmentService implements IAssessmentService {
  private _currentAssessment: Assessment;
  private _currentCategory: Category;
  private _categoryResponse;
  private _assessmentResponse;
  // baseUrl = 'https://7crsalgmhk.execute-api.us-east-1.amazonaws.com';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    var reply: Category[] = [];
    this.http.get<any>(environment.baseUrl + '/categories').subscribe({
      next: (data) => {
        this._categoryResponse = data;
        console.log(JSON.stringify(data));
        data.Items.forEach((element, index) => {
          // console.log(JSON.stringify(element));
          var rec: Category = {
            id: element.cid,
            cid: element.cid,
            seq: element.seq,
            label: element.label,
            categoryAverage: 0,
            assessments: [],
          };
          console.log(JSON.stringify(rec));
          console.log('index: ' + index);
          reply[index] = rec;
        });
        reply.sort((a, b) => {
          if (a.seq < b.seq) {
            return -1;
          } else if (a.seq > b.seq) {
            return 1;
          } else {
            return 0;
          }
        });
      },
      error: (error) => {
        console.error('There was an error', error);
      },
    });
    return of(reply);
  }

  getAssessments(): Observable<Assessment[]> {
    var reply: Assessment[] = [];
    this.http.get<any>(environment.baseUrl + '/assessments').subscribe({
      next: (data) => {
        this._assessmentResponse = data;
        console.log(JSON.stringify(data));
        data.Items.forEach((element, index) => {
          // console.log(JSON.stringify(element));
          var rec: Assessment = {
            id: index,
            aid: element.aid,
            cid: element.cid,
            icon: element.icon,
            label: element.label,
            units: element.units,
          };
          console.log(JSON.stringify(rec));
          console.log('index: ' + index);
          reply[index] = rec;
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
