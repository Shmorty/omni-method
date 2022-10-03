import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../store/models/user.model';
import { IUserService } from './user.service.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {

  constructor(private httpClient: HttpClient) { }

  getUser(): Observable<User> {
      return this.httpClient.get<User>('/api/user');
  }
}
