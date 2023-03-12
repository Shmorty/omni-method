import { Observable } from 'rxjs';
import { User } from '../../store/user/user.model';

export interface IUserService {
  // return current user
  getUser(id: string): Observable<User>;

  setUser(user: User): Observable<User>;
}
