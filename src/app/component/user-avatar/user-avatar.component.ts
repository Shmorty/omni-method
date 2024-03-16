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
      <div class="avatar-container" *ngIf="user.avatar">
        <img src="{{ user.avatar }}" />
      </div>
      <ion-label *ngIf="!user.avatar" class="textAvatar" color="color">
        {{userInitial()}}
      </ion-label>
      <!-- <ion-icon id="icon" name="pencil-outline"></ion-icon> -->
    </ion-avatar>
  `,
  styles: [
    `
      #avatar {
        background-color: var(--ion-color-primary);
        border-radius: 50%;
        display: block;
        margin: auto;
        padding-left: 0px;
        /* aspect-ratio: 1 / 1; */
        /* overflow: hidden; */
        position:relative;
        width: 64px;
        height: 64px;
      }
      .avatar-container {
        padding-top: 8px;
      }
      #icon {
          color: var(--ion-color-primary);
          position: absolute;
          top: 28px;
          right: -15px;
          background: white;
          border-radius: 50%;
          padding: 4px;
        }
      .textAvatar {
        border: 1px solid;
        border-radius: 50%;
        display: block;
        font-size: 32pt;
        font-weight: bold;
        text-align: center;
        overflow: hidden;
        width: 64px;
        height: 64px;
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
