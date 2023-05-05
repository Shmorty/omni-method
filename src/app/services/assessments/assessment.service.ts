import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assessment, Category } from '../../store/assessments/assessment.model';
import { IAssessmentService } from './assessment.service.interface';
import { Score } from '../../store/models/score.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {
  selectAllAssessments,
  selectAllCategories,
  selectAssessmentById,
  selectCategoryById,
  selectChecklist,
} from '../../store/assessments/assessment.selector';
import * as AssessmentActions from '../../store/assessments/assessment.actions';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService implements IAssessmentService {
  // public categories$: Observable<Category[]>;
  // public assessments: Observable<Assessment[]>;

  private _currentAssessment: Assessment;
  private _currentCategory: Category;
  private _currentScores: Score[];

  constructor(private http: HttpClient, private store: Store<AppState>) {
    // this.categories$ = this.store.select(selectAllCategories);
    // this.assessments = this.store.select(selectAllAssessments);
  }

  getCategoryById(cid: string): Observable<Category> {
    return this.store.select(selectCategoryById(cid));
  }
  getAssessmentById(aid: string): Observable<Assessment> {
    return this.store.select(selectAssessmentById(aid));
  }

  loadData() {
    return this.http.get('assets/data/assessments.json');
  }

  load() {
    this.store.dispatch(AssessmentActions.loadAssessmentsBegin());
  }

  getChecklist(aid: string): Observable<string[]> {
    return this.store.select(selectChecklist(aid));
  }

  // getCategories(): Observable<Category[]> {
  //   return this.http.get<any>(environment.baseUrl + '/categories');
  // }

  // getAssessments(): Observable<Assessment[]> {
  //   return this.http.get<any>(environment.baseUrl + '/assessments');
  // }

  // setCurrentAssessment(assessment: Assessment) {
  //   this._currentAssessment = assessment;
  // }

  // getCurrentAssessment(): Observable<Assessment> {
  //   return of(this._currentAssessment);
  // }

  // setCurrentCategory(category: Category): void {
  //   this._currentCategory = category;
  // }

  // getCurrentCategory(): Observable<Category> {
  //   return of(this._currentCategory);
  // }

  // setCurrentScores(scores: Score[]) {
  //   this._currentScores = scores;
  // }

  // getCurrentScores(): Observable<Score[]> {
  //   return of(this._currentScores);
  // }
}