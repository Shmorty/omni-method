import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as CommunityActions from './community.actions';
import {catchError, finalize, map, switchMap, take, tap} from "rxjs";
import {UserFirestoreService} from "../../services/user-firestore.service";

@Injectable()
export class CommunityEffects {
    constructor(
        private actions$: Actions,
        private firestoreService: UserFirestoreService,
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

    // loadSelectedUser
    loadSelectedUserEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommunityActions.loadSelectedUser),
            tap(() => console.log("loadSelectedUser effect")),
            switchMap(({uid}) => {
                if (uid) {
                    return this.firestoreService.getUserById(uid)
                        // .pipe(take(2))
                        .pipe(
                            tap((res) => console.log("community effect loadSelectedUser response", res)),
                            map((res) => {
                                if (res.id === uid) {
                                    return CommunityActions.loadSelectedUserSuccess({user: res});
                                } else {
                                    return CommunityActions.loadSelectedUserFailure({error: 'not found'});
                                }
                            }),
                            catchError(async (err) =>
                                CommunityActions.loadSelectedUserFailure({error: err})
                            ),
                            finalize(() => console.log("loadSelectedUser finalize"))
                        );
                }
            })
        )
    );

    // loadSelectedUserSuccess
    loadSelectedUserSuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommunityActions.loadSelectedUserSuccess),
            map((user) => {
                console.log("loadSelectedUserSuccess effect", user);
            })
        ),
        {dispatch: false}
    );

    // loadSelectedUserFailure
    loadSelectedUserFailureEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommunityActions.loadSelectedUserFailure),
            tap((err) => console.log("loadSelectedUserFailure effect", err))
        ),
        {dispatch: false}
    );

}