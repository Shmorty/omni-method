import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../store/models/user.model';
import { IUserService } from './user.service.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService {

  private mockUser: User = {
    id: 1,
    email: 'fake@email.com',
    firstName: 'Kyle',
    lastName: 'Martel',
    nickname: 'Kyle',
    dob: new Date("1996-07-31"),
    height: 
    {
      feet: 6,
      inches: 2,
    },
    weight: 180,
  }

  constructor() { }

  getUser(): Observable<User> {
      return of(this.mockUser);
  }
}
