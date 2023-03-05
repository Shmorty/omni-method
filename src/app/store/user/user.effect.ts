import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../api/user/user.service';
import {
  map,
  switchMap,
  mergeMap,
  tap,
  take,
  first,
  mapTo,
} from 'rxjs/operators';
import * as UserActions from './user.actions';
import { State, Store } from '@ngrx/store';
import { authUser } from './user.selectors';
import { OmniScoreService } from 'src/app/services/omni-score.service';
import { EMPTY, pipe } from 'rxjs';
import * as OmniScoreActions from '../omni-score/omni-score.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store,
    private omniScoreService: OmniScoreService
  ) {}

  userAuthenticated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.userAuthenticatd),
      tap(console.log),
      map((payload) => UserActions.loadUserAction({ uid: payload.payload.uid }))
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserAction),
      tap(console.log),
      switchMap(({ uid }) =>
        this.userService.getUser(uid).pipe(
          tap(console.log),
          map((data) => UserActions.loadUserSuccess({ payload: data }))
        )
      )
    )
  );

  loadScoresEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loadUserSuccess),
        tap(() => console.log),
        tap(() => this.omniScoreService.calculateScores())
      ),
    { dispatch: false }
  );

  saveScoreEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.saveNewScore),
        tap(console.log),
        switchMap(({ data }) =>
          this.userService.saveScoreToDb(data).pipe(
            tap(console.log),
            map((data) =>
              this.store.dispatch(OmniScoreActions.calculateOmniScore())
            )
          )
        )
      ),
    { dispatch: false }
  );
}
