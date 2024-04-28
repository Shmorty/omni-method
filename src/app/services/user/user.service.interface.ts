import {Observable} from 'rxjs';
import {Score} from 'src/app/store/models/score.model';
import {User} from '../../store/user/user.model';

export interface IUserService {
  // NgRx global store interactions (called by components)
  getUser(): Observable<User>;
  saveNewUser(user: User): void;
  updateUser(user: User): void;
  saveScore(score: Score): void;
  deleteScore(score: Score): void;
  saveAvatarFile(blob: Blob, filename: string): Promise<string>;
}
