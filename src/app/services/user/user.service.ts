import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, pipe, Subject, throwError } from 'rxjs';
import { catchError, first, map, single, take, tap } from 'rxjs/operators';
import { User } from '../../store/user/user.model';
import { IUserService } from './user.service.interface';
import { environment } from 'src/environments/environment';
import { Score } from '../../store/models/score.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import * as UserActions from '../../store/user/user.actions';
import { selectAuthUser, selectUser } from 'src/app/store/user/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserService {
  private _currentUser: User = null;
  private newScore = new Subject<Score>();

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  load() {
    this.store.dispatch(
      UserActions.loadUserAction({ uid: 'anJJeMDX6RTHDNOCPpPIxOObLy92' })
    );
  }

  getUser(id: string): Observable<User> {
    console.log('GET ' + environment.baseUrl + '/users/' + id);
    return this.http.get<User>(environment.baseUrl + '/users/' + id).pipe(
      map((user) => {
        this._currentUser = user;
        return user;
      })
    );
  }

  saveUser(user: User) {
    console.log('userService.saveUser');
    this.store
      .select(selectAuthUser)
      .pipe(first())
      .subscribe(
        (authUser) => {
          user.id = authUser['uid'];
          user.email = authUser['email'];
          console.log(user);
          console.log('do insert');
          this.store.dispatch(UserActions.newUser({ payload: user }));
        },
        (err) => console.error('Observer got an error: ' + err)
      );
  }

  setUser(user: User): Observable<User> {
    console.log('userService.setUser');
    this._currentUser = user;
    return this.http
      .post<User>(environment.baseUrl + `/users`, user)
      .pipe(catchError(this.handleError));
  }

  currentUser() {
    return this.store.select(selectUser);
  }

  // setCurrentUser(user: User) {
  //   this._currentUser = user;
  // }

  // getCurrentUser(): User {
  //   return this._currentUser;
  // }

  onNewScore(): Observable<Score> {
    return this.newScore.asObservable();
  }

  saveScore(score: Score) {
    this.store.dispatch(UserActions.saveNewScore({ score }));
  }

  deleteScore(score: Score) {
    this.store.dispatch(UserActions.deleteAssessmentScore({ score }));
  }

  saveScoreToDb(score: Score) {
    console.log('user.service.saveScoreToDb ' + JSON.stringify(score));
    return this.http
      .post<Score>(environment.baseUrl + `/users/${score.uid}/scores`, score)
      .pipe(catchError(this.handleError))
      .pipe(
        tap((m) => {
          this.newScore.next(m);
        })
      );
  }

  deleteScoreFromDb(score: Score) {
    // SCORE#DLFT#2023-03-01
    console.log('user.service.deleteScoreFromDb ' + JSON.stringify(score));
    let delScoreDate = new Date(score.scoreDate);
    console.log(delScoreDate.toISOString().split('T')[0]);
    score = { ...score, scoreDate: delScoreDate.toISOString().split('T')[0] };
    console.log('scoreDate: ' + score.scoreDate);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(score),
    };
    console.log(options.body);
    return this.http
      .delete<Score>(
        environment.baseUrl + `/users/${score.uid}/scores`,
        options
      )
      .pipe(catchError(this.handleError))
      .pipe(
        tap((m) => {
          this.newScore.next(m);
        })
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
