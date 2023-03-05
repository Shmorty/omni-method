import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of, pipe } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as OmniScoreActions from './omni-score.actions';

@Injectable()
export class OmniScoreEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  calculateOmniScore$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OmniScoreActions.calculateOmniScore),
        tap({
          next: () => console.log('calc omni score effect'),
          error: (e) => console.log(e),
        })
      ),
    { dispatch: false }
  );

  // readonly getAllMovies = this.effect<void>(
  //   trigger$ => trigger$.pipe(
  //     exhaustMap(() => this.moviesService.fetchAllMovies().pipe(
  //       tapResponse(
  //         movies => this.addAllMovies(movies),
  //         (error) => this.logError(error),
  //       )
  //     )
  //   )
  // ));

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
