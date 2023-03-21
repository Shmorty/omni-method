import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user/user.service';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { Store } from '@ngrx/store';
import { OmniScoreService } from 'src/app/services/omni-score.service';
import { of } from 'rxjs';
import * as OmniScoreActions from '../omni-score/omni-score.actions';
import { Router } from '@angular/router';
import { selectAuthUser } from './user.selectors';
import { User } from './user.model';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store,
    private omniScoreService: OmniScoreService,
    private router: Router
  ) {}

  // UserActions.registerUserSuccess
  userRegistered$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.registerUserSuccess),
        tap(() => this.router.navigate(['new-user']))
      ),
    { dispatch: false }
  );

  // UserActions.userAuthenticatd
  userAuthenticated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.userAuthenticatd),
      tap(console.log),
      map((payload) => UserActions.loadUserAction({ uid: payload.payload.uid }))
    )
  );

  // UserActions.loadUserAction
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserAction),
      tap(console.log),
      switchMap(({ uid }) =>
        this.userService.getUserFromDb(uid).pipe(
          tap(console.log),
          map((data) => UserActions.loadUserSuccess({ payload: data }))
        )
      )
    )
  );

  // UserActions.newUser
  newUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.newUser),
      tap(console.log),
      switchMap(({ payload }) =>
        this.userService.saveUserToDb(payload).pipe(
          tap(console.log),
          map((data) => UserActions.newUserSuccess({ payload: data })),
          catchError((error) => of(UserActions.newUserFailure({ error })))
        )
      )
    )
  );

  // UserActions.newUserSuccess
  newUserSuccessEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.newUserSuccess),
        tap(console.log),
        tap(() => this.router.navigate(['home']))
      ),
    { dispatch: false }
  );

  // UserActions.loadUserSuccess
  loadScoresEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loadUserSuccess),
        tap(console.log),
        tap((data) => {
          // user loaded test if exist
          if (Object.keys(data.payload.user).length) {
            this.router.navigate(['home']);
          }
        }),
        tap(() => this.omniScoreService.calculateScores())
      ),
    { dispatch: false }
  );

  // UserActions.saveNewScore
  saveScoreEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.saveNewScore),
        switchMap((data) =>
          this.userService.saveScoreToDb(data.score).pipe(
            map((data) => {
              this.store.dispatch(
                UserActions.saveNewScoreSuccess({ score: data })
              );
              this.store.dispatch(OmniScoreActions.calculateOmniScore());
            })
          )
        )
      ),
    { dispatch: false }
  );

  // UserActions.deleteAssessmentScore
  deleteScoreEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.deleteAssessmentScore),
        switchMap((data) =>
          this.userService.deleteScoreFromDb(data.score).pipe(
            map(() => {
              this.store.dispatch(
                UserActions.deleteAssessmentScoreSuccess({ score: data.score })
              );
              this.store.dispatch(OmniScoreActions.calculateOmniScore());
            })
          )
        )
      ),
    { dispatch: false }
  );
}
