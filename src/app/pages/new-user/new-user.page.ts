import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {UserService} from 'src/app/services/user/user.service';
import {AuthService} from 'src/app/services/auth.service';
import {User} from 'src/app/store/user/user.model';
// import {DatePicker, DatePickerOptions} from '@pantrist/capacitor-date-picker';
import {isPlatform} from '@ionic/angular';
import {Keyboard} from '@capacitor/keyboard';
import {UserFirestoreService} from 'src/app/services/user-firestore.service';
import {AssessmentService} from 'src/app/services/assessments/assessment.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {
  userId: string;
  userEmail: string;
  public newUser: User = {
    id: this.auth.currUserId,
    email: this.auth.currUserEmail,
    firstName: '',
    lastName: '',
    dob: undefined,
    weight: 75,
    omniScore: 0,
    categoryScore: undefined,
  };
  formData: FormGroup;

  userDob: string;
  step = 1;
  isApp = false;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private datePipe: DatePipe,
    private assessmentService: AssessmentService
  ) {
    let calcDate = new Date();
    let curYear = calcDate.getFullYear();
    calcDate.setFullYear(curYear - 16);
    this.userDob = datePipe.transform(calcDate, 'yyyy-MM-dd');
    // https://stackoverflow.com/questions/65056918/reactive-form-date-picker-in-ionic-5
    console.log("newUser userDob", this.userDob);
    console.log("newUser", this.newUser);
    // set default values for new user
    this.newUser.dob = calcDate;
    // this.newUser.weight = 100;
    // this.newUser.height.feet = 4;
    // this.newUser.height.inches = 6;
    this.newUser.height = {feet: 4, inches: 6};
  }

  ngOnInit() {
    this.userId = this.auth.currUserId;
    this.userEmail = this.auth.currUserEmail;
    console.log("newUser ngOnInit", this.userId, this.userEmail);

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
      dob: new FormControl(this.userDob, [Validators.required]),
      height: new FormGroup({
        feet: new FormControl(4, [
          Validators.required,
          Validators.pattern('[0-9]'),
        ]),
        inches: new FormControl(8, [
          Validators.required,
          Validators.pattern('[0-9]{1,2}'),
          Validators.min(0),
          Validators.max(11),
        ]),
      }),
      weight: new FormControl(95, [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.min(0),
        Validators.max(500),
      ]),
      fitnessLevel: new FormControl('none', Validators.required),
    });
    // console.log("ngOnInit formData", this.formData);
    console.log("ngOnInit newUser", this.newUser);
  }

  onSubmit() {
    console.log('new user onSubmit', this.formData.value);
    this.assessmentService.getChecklist;
    // create user in database
    this.userService.saveNewUser({
      ...this.formData.value,
      omniScore: 0,
      categoryScore: this.assessmentService.getNewCategoryScores(),
    });
  }

  next() {
    console.log('next', this.formData.value);
    if (this.step < 6) {
      this.step = this.step + 1;
    } else {
      this.onSubmit();
    }
  }

  previous() {
    console.log('previous', this.formData.value);
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

  get weight() {
    return this.formData.get('weight');
  }

  async openPicker() {
    let maxDate = new Date(); //.setFullYear(2006);
    let curYear = maxDate.getFullYear();
    maxDate.setFullYear(curYear - 2);
  }

}
