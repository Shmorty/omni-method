import { Observable } from 'rxjs';
import { Score } from 'src/app/store/models/score.model';
import { User } from '../../store/user/user.model';

export interface IUserService {
  // dynamoDB database interactions (called by NgRx effects)
  getUserFromDb(id: string): Observable<User>;
  saveUserToDb(user: User): Observable<User>;
  saveScoreToDb(score: Score): Observable<Score>;
  deleteScoreFromDb(score: Score): Observable<Score>;

  // NgRx global store interactions (called by components)
  getUser(): Observable<User>;
  saveNewUser(user: User): void;
  updateUser(user: User): void;
  saveScore(score: Score): void;
  deleteScore(score: Score): void;
}
