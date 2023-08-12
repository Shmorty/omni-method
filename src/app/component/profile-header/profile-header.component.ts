import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {Observable} from 'rxjs';
import {User} from '../../store/user/user.model';
import {UserAvatarComponent} from '../user-avatar/user-avatar.component';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, UserAvatarComponent],
})
export class ProfileHeaderComponent implements OnInit {

  user$: Observable<User>;

  constructor() {}

  ngOnInit() {}

}
