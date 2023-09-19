import {DatePipe} from '@angular/common';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {Keyboard} from '@capacitor/keyboard';
import {AlertController, IonModal, isPlatform, ModalController} from '@ionic/angular';
import {OverlayEventDetail} from '@ionic/core/components';
import {EditPropertyComponent} from 'src/app/component/edit-property/edit-property.component';
import {AuthService} from 'src/app/services/auth.service';
// import {DatePicker, DatePickerOptions} from '@pantrist/capacitor-date-picker';
import {UserService} from 'src/app/services/user/user.service';
import {User} from 'src/app/store/user/user.model';

@Component({
  selector: 'edit-profile-page',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  // @ViewChild(IonModal) modal: IonModal;
  @Input() user: User;
  profileForm: FormGroup;

  // message =
  //   'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  constructor(
    private modalCtrl: ModalController,
    public userService: UserService,
    private auth: AuthService,
    public formBuilder: FormBuilder,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.profileForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      nickname: new FormControl(this.user.nickname),
      gender: new FormControl(this.user.gender),
      dob: new FormControl(this.user.dob),
      height: new FormGroup({
        feet: new FormControl(this.user.height.feet, [
          Validators.required,
          Validators.pattern('[0-9]'),
        ]),
        inches: new FormControl(this.user.height.inches, [
          Validators.required,
          Validators.pattern('[0-9]{1,2}'),
          Validators.min(0),
          Validators.max(11),
        ]),
      }),
      weight: new FormControl(this.user.weight),
    });
  }

  logout() {
    this.modalCtrl.dismiss(null, 'logout');
    this.auth.logout();
  }

  submitForm() {
    console.log('edit profile submitForm', this.profileForm.value);
    this.userService.updateUser(this.profileForm.value);
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    console.log('edit profile onSubmit', this.profileForm.value);
    // create user in database
    this.userService.updateUser(this.profileForm.value);
    this.modalCtrl.dismiss();
  }

  cancel() {
    // let dob = this.profileForm.get('dob');
    // console.log("dob", dob);
    // this.profileForm.get('dob').setValue(dob);
    this.modalCtrl.dismiss(null, 'cancel');
  }

  save() {
    this.modalCtrl.dismiss(this.name, 'save');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    // if (ev.detail.role === 'confirm') {
    //   this.message = `Hello, ${ev.detail.data}!`;
    // }
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.profileForm.get('dob').setValue(date, {
      onlyself: true,
    });
  }

  async openPicker() {
    let maxDate = new Date(); //.setFullYear(2006);
    let curYear = maxDate.getFullYear();
    maxDate.setFullYear(curYear - 2);
  }

  async openModal(targetProperty: string) {
    const modal = await this.modalCtrl.create({
      backdropDismiss: false,
      component: EditPropertyComponent,
      componentProps: {targetProperty: targetProperty},
      cssClass: "custom-popover",
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss();

    // if (role === 'confirm') {
    //   this.message = `Hello, ${data}!`;
    // }
  }

  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Name',
  //     buttons: ['OK'],
  //     inputs: [],
  //   });

  //   await alert.present();
  // }

}
