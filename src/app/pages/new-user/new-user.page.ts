import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/user/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/store/user/user.model';
import { DatePicker, DatePickerOptions } from '@pantrist/capacitor-date-picker';
import { isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {
  userId: string;
  userEmail: string;
  formData: FormGroup;
  userDob: string;
  step = 1;
  isApp = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private auth: AuthService,
    private datePipe: DatePipe
  ) {
    let calcDate = new Date(); //.setFullYear(2006);
    let curYear = calcDate.getFullYear();
    console.log('year: ' + curYear);
    calcDate.setFullYear(curYear - 16);
    this.userDob = datePipe.transform(calcDate, 'MM-dd-yyyy');
    // https://stackoverflow.com/questions/65056918/reactive-form-date-picker-in-ionic-5
    // console.log(datePipe.transform(this.userDob, 'M-d-y'));
    console.log(this.userDob);
    // this.formData.get('dob').setValue(this.userDob.toISOString());
    // .setValue(datePipe.transform(this.startDate, 'M-d-y'));
    // console.log(datePipe.transform(this.currentDate, 'M-d-y'));
  }

  ngOnInit() {
    this.userId = this.auth.currUserId;
    this.userEmail = this.auth.currUserEmail;

    this.formData = new FormGroup({
      id: new FormControl(this.userId, Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl(this.userEmail, [
        Validators.required,
        Validators.email,
      ]),
      nickname: new FormControl(),
      gender: new FormControl(),
      dob: new FormControl(this.userDob),
      height: new FormGroup({
        feet: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]'),
        ]),
        inches: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{1,2}'),
          Validators.min(0),
          Validators.max(11),
        ]),
      }),
      weight: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.min(50),
        Validators.max(500),
      ]),
    });
  }

  onSubmit() {
    // let dob: string = this.formData.get('dob');
    // this.formData.setValue(dob.substring(0, 10));
    console.log(this.formData.value);
    // create user in database
    // this.currUser.firstName = 'first';
    // this.currUser.lastName = 'last';
    // this.currUser.nickname = 'nickname';
    // this.userService.addUser(this.currUser).subscribe(
    //   (data) => {
    //     console.log('addUser returned ' + JSON.stringify(data));
    //   },
    //   (err) => {
    //     console.log('Error: ' + err().message);
    //     alert(err().message);
    //   }
    // );

    this.userService.setUser(this.formData.value).subscribe((data) => {
      console.log('setUser returned:');
      console.log(data);
      this.router.navigate(['/home']);
    });
  }

  next() {
    if (this.step < 5) {
      this.step = this.step + 1;
    } else {
      this.onSubmit();
    }
  }

  previous() {
    this.step = this.step - 1;
  }

  get first() {
    return this.formData.get('firstName');
  }

  get last() {
    return this.formData.get('lastName');
  }

  get email() {
    return this.formData.get('email');
  }

  get dob() {
    return this.formData.get('dob');
  }

  async openPicker() {
    const options: DatePickerOptions = {
      format: 'MM-dd-yyyy',
      mode: 'date',
      date: this.userDob,
      max: '01-03-2023',
      // date: this.userDob.toISOString(),
      // max: new Date().toISOString(),
    };
    console.log(options.date);
    console.log(options.max);
    if (isPlatform('mobile')) {
      console.log('is mobile');
      return DatePicker.present(options).then((date) => {
        this.userDob = date.value;
        this.formData.get('dob').setValue(date.value);
      });
    }
  }
}
