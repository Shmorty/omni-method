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
                    tap((res) => console.log('firestore getAllUsers response', res.length)),
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
            tap((res) => console.log('loadCommunityUsersSuccessEffect', res.users.length)),
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
                            tap((user) => console.log("community effect loadSelectedUser response", user)),
                            map((user) => {
                                if (user.id === uid) {
                                    return CommunityActions.loadSelectedUserSuccess({user: user});
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
            tap(({user}) => console.log("loadSelectedUserSuccess effect", user)),
            map(({user}) =>
                CommunityActions.loadSelectedUserScores({uid: user.id})
            )
        )
    );

    // loadSelectedUserFailure
    loadSelectedUserFailureEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommunityActions.loadSelectedUserFailure),
            tap((err) => console.log("loadSelectedUserFailure effect", err))
        ),
        {dispatch: false}
    );

    // loadSelectedUserScores
    loadSelectedUserScoresEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommunityActions.loadSelectedUserScores),
            tap(({uid}) => console.log("loadSelectedUserScores effect", uid)),
            switchMap(({uid}) => {
                if (uid) {
                    return this.firestoreService.getUserScores(uid).pipe(
                        tap((scores) => console.log("community effect loadSelectedUserScores response", scores)),
                        map((scores) => {
                            if (scores) {
                                return CommunityActions.loadSelectedUserScoresSuccess({scores: scores});
                            } else {
                                return CommunityActions.loadSelectedUserScoresFailure({error: 'scores not found'});
                            }
                        }),
                        catchError(async (err) =>
                            CommunityActions.loadSelectedUserScoresFailure({error: err})
                        ),
                        finalize(() => console.log("loadSelectedUserScores finalize"))
                    );
                }
            })
        )
    );

    // loadSelectedUserScoresSuccess
    loadSelectedUserScoresSuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommunityActions.loadSelectedUserScoresSuccess),
            tap(({scores}) => console.log("loadSelectedUserScoresSuccess effect", scores)),
        ),
        {dispatch: false}
    );

    // loadSelectedUserScoresFailure
    loadSelectedUserScoresFailureEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommunityActions.loadSelectedUserScoresFailure),
            tap((err) => console.log("loadSelectedUserScoresFailure effect", err))
        ),
        {dispatch: false}
    );

}