import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import * as CommunityActions from './community.actions';
import {catchError, finalize, map, switchMap, tap} from "rxjs";
import {UserFirestoreService} from "../../services/user-firestore.service";

@Injectable()
export class CommunityEffects {
    constructor(
        private actions$: Actions,
        private firestoreService: UserFirestoreService,
        private store: Store,
    ) {}

    // loadCommunityUsers
    loadCommunityUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommunityActions.loadCommunityUsers),
            tap(() => console.log("loadCommunityUsers effect")),
            switchMap(() => {
                console.log("community.effect getAllUsers");
                return this.firestoreService.getAllUsers().pipe(
                    tap((res) => console.log('firestore getAllUsers response', res)),
                    map((res) => {
                        if (res) {
                            return CommunityActions.loadCommunityUsersSuccess({users: res});
                        } else {
                            return CommunityActions.loadCommunityUsersFailure({error: 'failed to load all users'});
                        }
                    }),
                );
            })
        )
    );

    // loadCommunityUsersSuccess
    loadCommunityUsersSuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommunityActions.loadCommunityUsersSuccess),
            tap((res) => console.log('loadCommunityUsersSuccessEffect', res)),
        ),
        {dispatch: false}
    )

    // loadCommunityUsersFailure
    loadCommunityUsersFailureEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommunityActions.loadCommunityUsersFailure),
            tap((res) => console.log('loadCommunityUsersFailureEffect', res)),
        ),
        {dispatch: false}
    )

}