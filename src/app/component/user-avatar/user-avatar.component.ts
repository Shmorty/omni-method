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
      <ion-label *ngIf="!user.avatar" class="textAvatar" color="color">
        {{user.firstName | slice : 0 : 1 }}{{user.lastName | slice : 0 : 1 }}
      </ion-label>
      <ion-icon id="icon" name="pencil-outline"></ion-icon>
      <ion-label id="label" *ngIf="label">{{label}}</ion-label>
    </ion-avatar>
  `,
  styles: [
    `
      #avatar {
        border-radius: 50%;
        display: block;
        margin: auto;
        padding-left: 0px;
        /* aspect-ratio: 1 / 1; */
        /* overflow: hidden; */
        position:relative;
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
        border: 2px solid;
        border-radius: 50%;
        font-weight: bold;
        overflow: hidden;
        padding: 0.7em 0.5em;
        width: 3em;
        height: 3em;
      }
      #label {
        position: absolute;
        bottom: -8px;
        left: 6px;
      }
    `,
  ],
})
export class UserAvatarComponent implements OnInit {
  @Input() user: User;
  @Input() label: string | undefined;
  constructor() {}

  ngOnInit() {
    console.log('UserAvatarComponent ngOnInit');
    console.log("user", this.user);
    console.log("label", this.label);
  }
}
