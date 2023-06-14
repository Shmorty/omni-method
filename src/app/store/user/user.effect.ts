import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, catchError, finalize, take, takeWhile, takeUntil } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { UserFirestoreService } from 'src/app/services/user-firestore.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private firestoreService: UserFirestoreService,
    private store: Store,
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

  // UserActions.logoutAction
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.logoutAction),
        map(() => {
          this.router.navigate(['login']);
        })
      ),
    { dispatch: false }
  );

  // UserActions.userAuthenticatd
  userAuthenticated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.userAuthenticatd),
      tap((payload) => 
        console.log('userAuthenticatd effect', JSON.stringify(payload))
      ),
      map((payload) =>
        UserActions.loadUserAction({ uid: payload.payload.user.uid })
      )
    )
  );

  // UserActions.loadUserAction
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserAction),
      tap(console.log),
      switchMap(({ uid }) => {
        return this.firestoreService.getUserById(uid)
          .pipe(takeUntil(this.logout$))
          .pipe(
            tap((res) => console.log('firestore getUserById response', res)),
            map((res) => {
              if (res) {
                return UserActions.loadUserSuccess({ payload: res });
              } else {
                return UserActions.loadUserFailure({ error: 'not found' });
              }
            }),
            catchError(async (err) =>
              UserActions.loadUserFailure({ error: err })
            ),
            finalize(() => console.log('getUserById finalize'))
          );
      })
    )
  );

  // UserActions.newUser
  newUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.newUser),
      tap(console.log),
      switchMap(({ payload }) => {
        console.log('newUser effect calling firestoreService addUser');
        return this.firestoreService.addUser(payload).pipe(
          tap(console.log),
          map((data) => UserActions.newUserSuccess({ payload: data })),
          catchError((error) => of(UserActions.newUserFailure({ error }))),
          finalize(() => console.log('addUser finalize'))
        );
      })
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

  // UserActions.newUser
  updateUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserAction),
        tap(console.log),
        switchMap(({ payload }) => {
          console.log(
            'effect updateUserAction call firestoreService updateUser',
            payload
          );
          return this.firestoreService.updateUser(payload).pipe(
            // this.userService.saveUserToDb(payload).pipe(
            tap((reply) => console.log('reply', reply))
            // map((data) => UserActions.newUserSuccess({ payload: data })),
            // catchError((error) => of(UserActions.newUserFailure({ error })))
          );
        })
      ),
    { dispatch: false }
  );

  // UserActions.loadUserSuccess
  loadUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserSuccess),
      tap((res) => console.log('loadUserSuccess effect ', res)),
      map((res) => UserActions.loadUserScoresAction({ uid: res.payload.id }))
    )
  );

  // UserActions.loadUserSuccess
  loadScoresEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loadUserSuccess),
        tap((data) => {
          // user loaded test if exist
          if (data.payload) {
            console.log('loadUserSuccess navigate home');
            this.router.navigate(['home']);
          } else {
            console.log('loadUserSuccess navigate new-user');
            this.router.navigate(['new-user']);
          }
        })
      ),
    { dispatch: false }
  );

  // new user effect
  newUserEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loadUserFailure),
        tap((err) => {
          console.log('newUserEffect ', err);
          this.router.navigate(['new-user']);
        })
      ),
    { dispatch: false }
  );

  // UserActions.saveNewScore
  saveScoreEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.saveNewScore),
        switchMap((data) =>
          this.firestoreService.saveScoreToDb(data.score).pipe(
            // this.userService.saveScoreToDb(data.score).pipe(
            map((data) => {
              this.store.dispatch(
                UserActions.saveNewScoreSuccess({ score: data })
              );
              // this.store.dispatch(OmniScoreActions.calculateOmniScore());
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
          this.firestoreService.deleteScoreFromDb(data.score).pipe(
            // this.userService.deleteScoreFromDb(data.score).pipe(
            map(() => {
              this.store.dispatch(
                UserActions.deleteAssessmentScoreSuccess({ score: data.score })
              );
              // this.store.dispatch(OmniScoreActions.calculateOmniScore());
            })
          )
        )
      ),
    { dispatch: false }
  );

  // UserActions.loadUserScoresAction
  loadUserScores$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserScoresAction),
      tap((param) =>
        console.log('loadUserScoresAction effect, param ', param.uid)
      ),
      switchMap((param) => {
        console.log('calling getUserScores');
        return this.firestoreService.getUserScores(param.uid)
        .pipe(takeUntil(this.logout$))
        .pipe(
            tap((res) => console.log('getUserScores res ', res)),
            map((res) => UserActions.loadUserScoresSuccessAction({ scores: res })),
            // catchError(async (err) => UserActions.loadUserScoresFailure({ error: err }))
            finalize(() => console.log('getUserScores unsubscribed'))
          );
      })
    )
  );

}
