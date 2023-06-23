import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { IonModal, isPlatform, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { DatePicker, DatePickerOptions } from '@pantrist/capacitor-date-picker';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/store/user/user.model';

@Component({
  selector: 'edit-profile-page',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  // @ViewChild(IonModal) modal: IonModal;
  @Input() user: User;
  profileForm: FormGroup;

  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  constructor(
    private modalCtrl: ModalController,
    private userService: UserService,
    private datePipe: DatePipe,
    public formBuilder: FormBuilder
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
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalCtrl.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
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

    const options: DatePickerOptions = {
      format: 'MM/dd/yyyy',
      mode: 'date',
      date: this.datePipe.transform(this.user.dob, 'MM/dd/yyyy'),
      max: this.datePipe.transform(maxDate, 'MM/dd/yyyy'),
    };
    console.log(options.date);
    console.log(options.max);
    if (isPlatform('mobile')) {
      console.log('is mobile');
      Keyboard.hide();
      return DatePicker.present(options).then((date) => {
        console.log('set dob: ' + date.value);
        this.profileForm.get('dob').setValue(date.value);
      });
    }
  }
}
