import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { GetUserAction, GetUserSuccessAction } from './user.actions';
import { UserService } from '../../api/user/user.service';
import {
  map,
  switchMap,
  mergeMap,
  catchError,
  debounceTime,
} from 'rxjs/operators';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserAction),
      switchMap(() =>
        this.userService
          .getUser('DVpqcI1NXZP6ZJMD3bt4xH0yx1o1')
          .pipe(map((data) => UserActions.loadUserSuccess({ payload: data })))
      )
    )
  );
}
