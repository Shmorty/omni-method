import {DatePipe} from '@angular/common';
import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {Keyboard} from '@capacitor/keyboard';
import {AlertController, IonModal, isPlatform, ModalController, PickerColumn, PickerColumnOption, PickerController} from '@ionic/angular';
import {OverlayEventDetail} from '@ionic/core/components';
import {Subscription, delay} from 'rxjs';
import {EditPropertyComponent} from '../../component/edit-property/edit-property.component';
import {AuthService} from '../../services/auth.service';
// import {DatePicker, DatePickerOptions} from '@pantrist/capacitor-date-picker';
import {UserService} from '../../services/user/user.service';
import {User} from '../../store/user/user.model';
import {NumberPickerService} from 'src/app/services/number-picker.service';

@Component({
  selector: 'edit-profile-page',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit, OnDestroy {
  // @ViewChild(IonModal) modal: IonModal;
  @Input() user: User;
  profileForm: FormGroup;
  private numberPickerSubscription: Subscription;
  public deleteAccountButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      htmlAttributes: {
        'aria-label': 'cancel',
      }
    },
    {
      text: 'Delete',
      role: 'confirm',
      handler: () => {
        // confirm delete with password
        this.confirmDeleteAccount();
      },
      htmlAttributes: {
        'aria-label': 'delete',
      }
    },
  ];
  public confirmDeleteAccountButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      htmlAttributes: {
        'aria-label': 'cancel',
      }
    },
    {
      text: 'Delete',
      role: 'confirm',
      handler: (alertData) => {
        this.authService.verifyPassword(alertData.password).then((success) => {
          console.log("verifyPassword success", success);
          // do delete user
          this.userService.deleteUser(this.user);
          this.modalCtrl.dismiss(null, 'logout');
          this.authService.logout();
        }, (error) => {
          console.log("verifyPassword error", error);
          alert("failed to verify password");
        });
      },
      htmlAttributes: {
        'aria-label': 'delete',
      }
    },
  ];
  public confirmLogoutButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      htmlAttributes: {
        'aria-label': 'cancel',
      }
    },
    {
      text: 'Log Out',
      cssClass: 'logout-button-confirm',
      role: 'confirm',
      handler: () => {
        this.modalCtrl.dismiss(null, 'logout');
        this.authService.logout();
      },
      htmlAttributes: {
        'aria-label': 'logout',
      }
    }
  ]

  name: string;
  public user$ = this.userService.getUser(); // .pipe(delay(5000));

  constructor(
    private modalCtrl: ModalController,
    public userService: UserService,
    private authService: AuthService,
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    public numberPickerService: NumberPickerService
  ) {}

  ngOnInit() {
    console.log("editProfile ngOnInit user", this.user);
    this.user$.subscribe((user) => {
      console.log("editProfile ngOnInit got user", user);
      this.user = user;
      this.profileForm = new FormGroup({
        firstName: new FormControl(this.user.firstName, Validators.required),
        lastName: new FormControl(this.user.lastName, Validators.required),
        username: new FormControl(this.user.username),
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
    });
    console.log("editProfile subscribe numberPickerService updates");
    this.numberPickerSubscription = this.numberPickerService.currentValue
      .subscribe((val) => {
        console.log("editProfile numberPickerService value update", val);
        this.userService.updateUser(val as User);
      }
      );
  }

  ngOnDestroy(): void {
    console.log("editProfile unsubscribe numberPickerService updates");
    this.numberPickerSubscription.unsubscribe();
  }

  async deleteAccount() {
    const alert = await this.alertController.create({
      header: 'Delete Account Data',
      subHeader: 'This action can not be undone.',
      // message: 'If you would like to permanently delete all your data tap "Delete" buttons, otherwise tap "Cancel".',
      buttons: this.deleteAccountButtons,
    });
    await alert.present();
  }

  async confirmDeleteAccount() {
    const alert = await this.alertController.create({
      header: 'Warning',
      subHeader: 'This action can not be undone.',
      message: 'To permanently delete all your data please entery your password and tap "Delete" button.',
      buttons: this.confirmDeleteAccountButtons,
      inputs: [{
        name: "password",
        placeholder: "Password",
        type: "password"
      }],
    });
    await alert.present();
  }

  async logout() {
    // this.modalCtrl.dismiss(null, 'logout');
    // this.authService.logout();
    const alert = await this.alertController.create({
      header: 'Log out of your account?',
      buttons: this.confirmLogoutButtons,
    });
    await alert.present();
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
    if (ev.detail.role === 'save') {
      console.log("onWillDismiss save", ev.detail.data);
    }
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.profileForm.get('dob').setValue(date, {
      onlyself: true,
    });
  }

  async openModal(targetProperty: string) {
    const modal = await this.modalCtrl.create({
      backdropDismiss: false,
      component: EditPropertyComponent,
      componentProps: {
        targetProperty: targetProperty,
        user: this.user
      },
      cssClass: "custom-popover",
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss();

    if (role === 'save') {
      console.log("openModal.save updateUser", data);
      this.user = data;
      this.userService.updateUser(data);
    }
  }

  // openPicker(user: User, targetProperty: string) {
  //   this.numberPickerService.openProfilePicker(user, targetProperty);
  // }
}

