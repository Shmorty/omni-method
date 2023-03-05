import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AssessmentService } from '../../api/assessments/assessment.service';
import * as AssessmentActions from './assessment.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable()
export class AssessmentEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private assessmentService: AssessmentService
  ) {}

  loadAssessments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AssessmentActions.loadAssessmentsBegin),
      switchMap(() =>
        this.assessmentService.loadData().pipe(
          tap(console.log),
          map((data) =>
            AssessmentActions.loadAssessmentsSuccess({
              data: data,
            })
          ),
          tap(console.log),
          catchError((error) =>
            of(AssessmentActions.loadAssessmentsFailure({ error }))
          )
        )
      )
    )
  );
}
