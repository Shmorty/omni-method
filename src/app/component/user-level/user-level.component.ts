import {CommonModule} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {User} from '../../store/user/user.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-level',
  standalone: true,
  templateUrl: './user-level.component.html',
  styleUrls: ['./user-level.component.scss'],
  imports: [CommonModule, IonicModule]
})
export class UserLevelComponent implements OnInit {

  @Input() user$: Observable<User>;

  constructor() {}

  ngOnInit() {}

  userLevel(user: User): number {
    return Math.trunc(user.omniScore / 100);
  }

  userExp(user: User): number {
    return Math.trunc(user.omniScore % 100);
  }

}
