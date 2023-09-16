import {CommonModule} from '@angular/common';
import {Component, OnInit, Input} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {User} from 'src/app/store/user/user.model';

@Component({
  imports: [CommonModule, IonicModule],
  standalone: true,
  selector: 'user-avatar',
  template: `
    <ion-avatar id="avatar" color="color">
      <span *ngIf="user.avatar">
        <img src="{{ user.avatar }}" />
      </span>
      <ion-label *ngIf="!user.avatar" class="textAvatar" color="color">{{user.firstName | slice : 0 : 1 }}{{user.lastName | slice : 0 : 1 }}</ion-label>
      <ion-icon name="pencil-outline"></ion-icon>
    </ion-avatar>
  `,
  styles: [
    `
      #avatar {
        margin: auto;
        padding-left: 0px;
        border-radius: 50%;
        aspect-ratio: 1 / 1;
        /* overflow: hidden; */
      }
      ion-icon {
          color: var(--ion-color-primary);
          position: relative;
          bottom: 24px;
          right: -40px;
          background: white;
          border-radius: 50%;
          padding: 4px;
        }
      .textAvatar {
        border: 2px solid;
        border-radius: 50%;
        font-weight: bold;
        overflow: hidden;
        padding: 0.7em 0.5em;
      }
    `,
  ],
})
export class UserAvatarComponent implements OnInit {
  @Input() user: User;
  constructor() {}

  ngOnInit() {
    console.log('UserAvatarComponent ngOnInit');
    console.log(this.user);
  }
}
