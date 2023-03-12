import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of, pipe } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as OmniScoreActions from './omni-score.actions';
import { OmniScoreService } from 'src/app/services/omni-score.service';

@Injectable()
export class OmniScoreEffects {
  constructor(
    private actions$: Actions,
    private omniScoreService: OmniScoreService
  ) {}

  // OmniScoreActions.calculateOmniScore
  calculateOmniScore$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OmniScoreActions.calculateOmniScore),
        tap({
          next: () => this.omniScoreService.calculateScores(),
          error: (e) => console.log(e),
        })
      ),
    { dispatch: false }
  );

  // OmniScoreActions.setCategoryScore
  loadUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OmniScoreActions.setCategoryScore),
        tap(console.log)
        // switchMap(({ cid, score }) =>

        // )
      ),
    { dispatch: false }
  );
}
