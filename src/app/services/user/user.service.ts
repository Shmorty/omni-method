import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, first, map, single, take, tap } from 'rxjs/operators';
import { User } from '../../store/user/user.model';
import { IUserService } from './user.service.interface';
import { environment } from 'src/environments/environment';
import { Score } from '../../store/models/score.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as UserActions from '../../store/user/user.actions';
import {
  assessmentScores,
  selectAuthUser,
  selectUser,
} from '../../store/user/user.selectors';
import { Assessment } from '../../store/assessments/assessment.model';
import {UserFirestoreService} from '../user-firestore.service';

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserService {
  constructor(private http: HttpClient,
    private store: Store<AppState>,
    private firestoreService: UserFirestoreService) {}

  // get user and scores from database
  getUserFromDb(id: string): Observable<User> {
    console.log('GET ' + environment.baseUrl + '/users/' + id);
    return this.http
      .get<User>(environment.baseUrl + '/users/' + id)
      .pipe(
        map((user) => {
          // this._currentUser = user;
          return user;
        })
      )
      .pipe(catchError(this.handleError));
  }

  // write user to database
  saveUserToDb(user: User): Observable<User> {
    console.log('userService.setUser');
    return this.http
      .post<User>(environment.baseUrl + `/users`, user)
      .pipe(catchError(this.handleError));
  }

  // write score to database
  saveScoreToDb(score: Score) {
    console.log('user.service.saveScoreToDb ' + JSON.stringify(score));
    return this.http
      .post<Score>(environment.baseUrl + `/users/${score.uid}/scores`, score)
      .pipe(catchError(this.handleError));
  }

  //
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
      .pipe(catchError(this.handleError));
  }

  // get user from store
  getUser() {
    return this.store.select(selectUser);
  }

  getUserRankings(): Observable<User[]> {
    // get from firestore
    const sortFn = (a,b) => {
      return (a.omniScore < b.omniScore) ? 1 : (a.omniScore > b.omniScore) ? -1 : 0;
    }
    return this.firestoreService.getAllUsers().pipe(map((data) => data.sort(sortFn)));
  }

  // trigger new user action
  saveNewUser(user: User) {
    console.log('userService.saveNewUser');
    this.store
      .select(selectAuthUser)
      .pipe(first())
      .subscribe(
        (authUser) => {
          console.log('got authUser ', authUser);
          user.id = authUser.user['uid'];
          user.email = authUser.user['email'];
          console.log('user', user);
          // newUser action
          console.log('dispatch newUser action');
          this.store.dispatch(UserActions.newUser({ payload: user }));
        },
        (err) => console.error('Observer got an error: ' + err)
      );
  }

  // trigger update user action
  updateUser(user: User) {
    console.log('userService.updateUser');
    this.store
      .select(selectAuthUser)
      .pipe(first())
      .subscribe((authUser) => {
        console.log('authUser', authUser);
        user.id = authUser.user['uid'];
        console.log('user', user);
        // updateUserAction
        console.log('dispatch updateUser action');
        this.store.dispatch(UserActions.updateUserAction({ payload: user }));
      });
  }

  // get score from store
  getScoresForAssessment(assessment: Assessment): Observable<Score[]> {
    return this.store.select(assessmentScores(assessment)).pipe(
      tap((results) => {
        results.sort(function (a, b) {
          return Date.parse(b.scoreDate) - Date.parse(a.scoreDate);
        });
      })
    );
  }

  // trigger save score event
  saveScore(score: Score) {
    this.store.dispatch(UserActions.saveNewScore({ score }));
  }

  // trigger delete score event
  deleteScore(score: Score) {
    this.store.dispatch(UserActions.deleteAssessmentScore({ score }));
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
      () => new Error('Unable to process request; please try again later.')
    );
  }
}
