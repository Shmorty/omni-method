import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assessment } from '../../store/models/assessment.model';
import { Category } from '../../store/models/category.model';
import { IAssessmentService } from './assessment.service.interface';
import { environment } from '../../../environments/environment';
import { Score } from '../../store/models/score.model';
import * as checkList from '../../../assets/data/checkLists.json';
import { Store } from '@ngrx/store';
// import { AppState } from 'src/app/store/models/state.model';
import {
  AppState,
  getCategories,
  getAssessments,
} from 'src/app/store/reducers';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService implements IAssessmentService {
  public categories: Observable<Category[]>;
  public assessments: Observable<Assessment[]>;

  private _currentAssessment: Assessment;
  private _currentCategory: Category;
  private _currentScores: Score[];
  private _checkLists; //: Map<string, Array<string>>;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.categories = this.store.select(getCategories);
    this.assessments = this.store.select(getAssessments);
    this._checkLists = checkList;
  }

  getChecklist(aid: string): string[] {
    return this._checkLists[aid];
  }

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

  setCurrentScores(scores: Score[]) {
    this._currentScores = scores;
  }

  getCurrentScores(): Observable<Score[]> {
    return of(this._currentScores);
  }
}
