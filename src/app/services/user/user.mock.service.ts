import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../store/user/user.model';
import { IUserService } from './user.service.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserService {
  private mockUser: User = {
    id: '0001',
    email: 'fake@email.com',
    firstName: 'Mock',
    lastName: 'Martel',
    nickname: 'Mock',
    dob: new Date('1996-07-31'),
    height: {
      feet: 6,
      inches: 2,
    },
    weight: 180,
  };

  constructor() {}

  setUser(user: User): Observable<User> {
    return of((this.mockUser = user));
  }

  getUser(): Observable<User> {
    console.log('getUser returning mock data');
    return of(this.mockUser);
  }
}
