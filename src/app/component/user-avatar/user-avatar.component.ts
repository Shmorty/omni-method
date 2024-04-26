import {CommonModule} from '@angular/common';
import {Component, OnInit, Input} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {User} from 'src/app/store/user/user.model';

@Component({
  imports: [CommonModule, IonicModule],
  standalone: true,
  selector: 'user-avatar',
  template: `
    <ion-avatar>
      <img src="{{ user.avatar }}" *ngIf="user.avatar" />
      <img *ngIf="!user.avatar" src="/assets/images/icons/NoProfilePic.png">
    </ion-avatar>
  `,
  styles: [
    `
      ion-avatar {
        background-color: var(--ion-color-light);
        border: solid 0.5px var(--ion-color-medium);
        border-radius: 50%;
        display: block;
        margin: auto;
        padding-left: 0px;
        /* aspect-ratio: 1 / 1; */
        position:relative;
        width: 64px;
        height: 64px;
      }
      ion-avatar img {
        border-radius: 50%;
      }
    `,
  ],
})
export class UserAvatarComponent implements OnInit {
  @Input() user: User;
  constructor() {}

  ngOnInit() {
    console.log('UserAvatarComponent ngOnInit');
    console.log("user", this.user);
  }

  userInitial() {
    return (this.user.username) ?
      this.user.username.substring(0, 1) : this.user.firstName.substring(0, 1);
  }
}
