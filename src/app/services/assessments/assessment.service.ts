import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Assessment, Category} from '../../store/assessments/assessment.model';
import {IAssessmentService} from './assessment.service.interface';
import {Score} from '../../store/models/score.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.state';
import {
  selectAllAssessments,
  selectAllCategories,
  selectAssessmentById,
  selectAssessmentByIndex,
  selectCategoryById,
  selectChecklist,
  selectChecklistCategories,
  selectChecklistSkill,
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
  getAssessmentByIndex(i: number): Observable<Assessment> {
    return this.store.select(selectAssessmentByIndex(i));
  }
  getAllAssessments(): Observable<Assessment[]> {
    return this.store.select(selectAllAssessments);
  }
  getAllCategories(): Observable<Category[]> {
    return this.store.select(selectAllCategories);
  }
  loadData() {
    return this.http.get('assets/data/assessments.json');
  }

  load() {
    this.store.dispatch(AssessmentActions.loadAssessmentsBegin());
  }

  getChecklist(aid: string): Observable<object[]> {
    return this.store.select(selectChecklist(aid));
  }

  getChecklistCategories(aid: string): Observable<string[]> {
    return this.store.select(selectChecklistCategories(aid));
  }

  getChecklistSkill(aid: string, index: number): Observable<Object> {
    return this.store.select(selectChecklistSkill(aid, index));
  }

  getNewCategoryScores() {
    const obj = {};
    const categories$ = this.store.select(selectAllCategories);
    categories$.subscribe((cat) => {
      cat.forEach((c) => {
        console.log('addCategoryScore', c.cid);
        obj[c.cid] = 0;
      });
    });
    console.log('obj', obj);
    return obj;
  }

  isReverse(aid: string): boolean {
    return ["PSPR", "AGLTY"].includes(aid);
  }

}