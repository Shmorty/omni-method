import {CommonModule} from '@angular/common';
import {Component, OnInit, Input} from '@angular/core';
import {AnimationController, IonicModule, ModalController} from '@ionic/angular';
import {User} from 'src/app/store/user/user.model';
import {ImageComponent} from '../image/image.component';

@Component({
  imports: [CommonModule, IonicModule],
  standalone: true,
  selector: 'user-avatar',
  template: `
    <ion-avatar (click)="toggleShowPic()">
      <img src="{{ user.avatar }}" *ngIf="user.avatar"/>
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
  @Input() enableShowPic: boolean = true;
  showPic: boolean = true;

  constructor(
    private modalCtrl: ModalController,
    private animationCtrl: AnimationController,
  ) {}

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        {offset: 0, opacity: '0', transform: 'scale(0)'},
        {offset: 1, opacity: '0.99', transform: 'scale(1)'},
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  ngOnInit() {
    console.log('UserAvatarComponent ngOnInit');
    console.log("user", this.user);

  }

  async toggleShowPic() {
    if (this.enableShowPic && this.user.avatar) {
      console.log("toggleShowPic");
      this.showPic = !this.showPic;
      const modal = await this.modalCtrl.create({
        component: ImageComponent,
        componentProps: {imageSrc: this.user.avatar},
        cssClass: "image-modal",
        enterAnimation: this.enterAnimation,
        leaveAnimation: this.leaveAnimation,
      });
      modal.present();
    }
  }

  // userInitial() {
  //   return (this.user.username) ?
  //     this.user.username.substring(0, 1) : this.user.firstName.substring(0, 1);
  // }
}
