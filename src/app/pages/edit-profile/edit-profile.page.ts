import {DatePipe} from '@angular/common';
import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AlertController, IonInput, IonModal, LoadingController, ModalController,
} from '@ionic/angular';
import {OverlayEventDetail} from '@ionic/core/components';
import {Subscription, delay} from 'rxjs';
import {EditPropertyComponent} from '../../component/edit-property/edit-property.component';
import {AuthService} from '../../services/auth.service';
import {UserService, usernameMaxLength} from '../../services/user/user.service';
import {User} from '../../store/user/user.model';
import {NumberPickerService} from 'src/app/services/number-picker.service';
import {Camera, CameraDirection, CameraResultType, CameraSource} from '@capacitor/camera';
import {Capacitor} from '@capacitor/core';
import {ImageCroppedEvent, ImageCropperComponent, ImageTransform} from 'ngx-image-cropper';
import {ShowToastService} from 'src/app/services/show-toast.service';

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
  getAge = UserService.getAge;
  public today = new Date().toISOString();
  isAvatarOptionOpen = false;
  isEditAvatarOpen = false;
  @ViewChild('avatarOption') avatarOptionModal: IonModal;
  public imageUrl: string;
  @ViewChild('cropper') cropper: ImageCropperComponent;
  isMobile = Capacitor.getPlatform() !== 'web';
  transform: ImageTransform = {};
  // name: string;
  userWeight: number;
  userHeightFeet: number;
  userHeightInches: number;
  usernameMaxLength = usernameMaxLength;
  public user$ = this.userService.getUser(); //.pipe(delay(5000));
  @ViewChild('editAvatar') editAvatarModal: IonModal;
  @ViewChild('usernameInput') usernameInput: IonInput;

  constructor(
    private modalCtrl: ModalController,
    public userService: UserService,
    private authService: AuthService,
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    public numberPickerService: NumberPickerService,
    private loadingCtrl: LoadingController,
    private showToastService: ShowToastService,
  ) {}

  ngOnInit() {
    console.log("editProfile ngOnInit user", this.user);
    this.user$.subscribe((user) => {
      console.log("editProfile ngOnInit got user", user);
      this.user = user;
      this.userWeight = user.weight;
      this.userHeightFeet = user.height.feet;
      this.userHeightInches = user.height.inches;
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
    const deleteAccountButtons = [
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
    // present confirmation alert
    const alert = await this.alertController.create({
      header: 'Delete Account Data',
      subHeader: 'This action can not be undone.',
      // message: 'If you would like to permanently delete all your data tap "Delete" buttons, otherwise tap "Cancel".',
      buttons: deleteAccountButtons,
    });
    await alert.present();
  }

  async confirmDeleteAccount() {
    const confirmDeleteAccountButtons = [
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
            this.showToastService.showToast("failed to verify password", "danger");
          });
        },
        htmlAttributes: {
          'aria-label': 'delete',
        }
      },
    ];
    // present alert
    const alert = await this.alertController.create({
      header: 'Warning',
      subHeader: 'This action can not be undone.',
      message: 'To permanently delete all your data please entery your password and tap "Delete" button.',
      buttons: confirmDeleteAccountButtons,
      inputs: [{
        name: "password",
        placeholder: "Password",
        type: "password"
      }],
    });
    await alert.present();
  }

  async logout() {
    const confirmLogoutButtons = [
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
    ];
    // present logout confirmation
    const alert = await this.alertController.create({
      header: 'Log out of your account?',
      buttons: confirmLogoutButtons,
    });
    await alert.present();
  }

  onTextChange(e) {
    // console.log("onTextChange", e.target.id, " ", e.target.value);
    this.profileForm.get(e.target.id).setValue(e.target.value);
    this.submitForm();
  }

  onUsernameInput(ev) {
    const value = ev.target!.value;

    // Removes non alphanumeric characters, allow [.-_]
    const filteredValue = value.replace(/[^a-zA-Z0-9_\-\.]+/g, '');

    /**
     * Update both the state variable and
     * the component to keep them in sync.
     */
    this.usernameInput.value = '@' + filteredValue.toLowerCase();
  }

  async updateUsername(e) {
    console.log("updateUsername", e);
    const username = e.target.value.substring(1);
    console.log('check username', username);
    const isAvailable = await this.userService.isUsernameAvailable(username);
    console.log("username is available", isAvailable);
    if (!isAvailable) {
      this.usernameInput.setFocus();
      this.showToastService.showToast("Sorry, a user already exists with that username", "danger");
      return;
    }
  }

  setGender(gender: string) {
    console.log("setGender", gender);
    this.profileForm.get('gender').setValue(gender);
    this.submitForm();
  }

  onWeightChange(weight) {
    console.log("onWeightChange", weight);
    if (weight !== this.user.weight) {
      console.log("update user weight");
      this.profileForm.get('weight').setValue(weight);
      this.submitForm();
    }
  }

  onHeightFeetChange(feet) {
    if (feet !== this.user.height.feet) {
      console.log("heightFeetChange", this.profileForm);
      this.profileForm.get('height').get('feet').setValue(feet);
      this.submitForm();
    }
  }

  onHeightInchesChange(inches) {
    if (inches !== this.user.height.inches) {
      console.log("heightInchesChange", this.profileForm);
      this.profileForm.get('height').get('inches').setValue(inches);
      this.submitForm();
    }
  }

  submitForm() {
    console.log('edit profile submitForm', this.profileForm.value);
    this.userService.updateUser(this.profileForm.value);
    // this.modalCtrl.dismiss();
  }

  onSubmit() {
    console.log('edit profile onSubmit', this.profileForm.value);
    // create user in database
    this.userService.updateUser(this.profileForm.value);
    this.modalCtrl.dismiss();
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  // save() {
  //   this.modalCtrl.dismiss(this.name, 'save');
  // }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'save') {
      console.log("onWillDismiss save", ev.detail.data);
    }
  }

  onDobChange(e) {
    console.log("onDobChange", e);
    // }

    // getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.profileForm.get('dob').setValue(date, {
      onlyself: true,
    });
    this.submitForm();
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
    this.setAvatarOptionOpen(false);

    const {data, role} = await modal.onWillDismiss();

    if (role === 'save') {
      console.log("openModal.save updateUser", data);
      this.user = data;
      this.userService.updateUser(data);
    }
  }

  setAvatarOptionOpen(isOpen: boolean) {
    console.log("setAvatarOptionOpen", isOpen);
    this.isAvatarOptionOpen = isOpen;
  }

  onDidDismiss(ev: Event) {
    this.setAvatarOptionOpen(false);
  }

  chooseFromLibrary() {
    this.setAvatarOptionOpen(false);
    this.getPicture(CameraSource.Photos);
  }


  takePhoto() {
    this.setAvatarOptionOpen(false);
    this.getPicture(CameraSource.Camera);
  }

  // camera plugin
  getPicture = async (cameraSource: CameraSource) => {
    const image = await Camera.getPhoto({
      quality: 90,
      direction: CameraDirection.Front,
      allowEditing: true,
      saveToGallery: true,
      resultType: CameraResultType.DataUrl,
      source: cameraSource
    });
    const loading = await this.loadingCtrl.create();
    await loading.present();
    console.log("picture selected, open editor");
    this.isEditAvatarOpen = true;
    this.imageUrl = image.dataUrl;
    console.log("imageUrl", this.imageUrl);
  }

  async saveImage() {
    // crop to trigger imageCropped event
    this.cropper.crop();
    // show loading spinner
    const loading = await this.loadingCtrl.create();
    await loading.present();
  }

  async imageCropped(event: ImageCroppedEvent) {
    // image cropped event
    // write file to storage and get url
    const urlPromise = this.userService.saveAvatarFile(event.blob, "profilePicture.png");
    console.log("urlPromise", urlPromise);
    await urlPromise.then(
      (url) => {
        this.imageUrl = url;
        console.log("imageUrl", this.imageUrl);
      },
      error => {
        console.log("error", error);
        this.imageUrl = null;
      });
    if (this.imageUrl) {
      // update user with new image url
      const user = this.profileForm.value as User;
      console.log("saveImage", this.imageUrl);
      user.avatar = this.imageUrl;
      this.userService.updateUser(user);
    }
    this.loadingCtrl.dismiss();
    this.isEditAvatarOpen = false;
  }

  imageLoaded() {
    this.loadingCtrl.dismiss();
  }

  loadImageFailed() {
    console.log("Image load failed");
    this.showToastService.showToast("Failed to load image, please try again.", "danger");
  }

  rotate() {
    const newValue = ((this.transform.rotate ?? 0) + 90) % 360;
    this.transform = {
      ...this.transform,
      rotate: newValue
    }
  }
  cancelEditImage() {
    this.imageUrl = null;
    this.isEditAvatarOpen = false;
  }

}
