import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../store/models/user.model';
import { IUserService } from './user.service.interface';
import { environment } from 'src/environments/environment';
import { Score } from '../../store/models/score.model';

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserService {
  // var _userResponse: User;

  constructor(private http: HttpClient) {}

  getUser(id: string): Observable<User> {
    var response$ = this.http.get<any>(environment.baseUrl + '/users/' + id);
    return response$;
  }

  setUser(user: User): Observable<User> {
    return this.http
      .post<User>(environment.baseUrl + '/users', user)
      .pipe(catchError(this.handleError));
  }

  saveScore(score: Score) {
    return this.http
      .post<Score>(environment.baseUrl + `/users/${score.uid}/scores`, score)
      .pipe(catchError(this.handleError));
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
