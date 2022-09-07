import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { GetUserAction, GetUserSuccessAction } from "../actions/user.actions";
import { UserService } from "../../services/user.service";
import { map, switchMap, mergeMap, catchError, debounceTime } from 'rxjs/operators';

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private userService: UserService
    ) {}

    loadUser$ = createEffect(() => this.actions$.pipe(
        ofType(GetUserAction),
        switchMap(() =>
            this.userService.getUser().pipe(
                map(data => GetUserSuccessAction({payload: data}))
            )
        )
    ));
}