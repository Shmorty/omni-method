import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/user/user.mock.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {
  formData: FormGroup;
  step: any = 1;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.formData = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      nickname: new FormControl(),
      dob: new FormControl(),
      height: new FormGroup({
        feet: new FormControl('', [Validators.pattern('[0-9]')]),
        inches: new FormControl('', [
          Validators.pattern('[0-9]{1,2}'),
          Validators.min(0),
          Validators.max(11),
        ]),
      }),
      weight: new FormControl('', [
        Validators.pattern('[0-9]*'),
        Validators.min(50),
        Validators.max(500),
      ]),
    });
  }

  onSubmit() {
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

    this.userService.setUser(this.formData.value);
    this.router.navigate(['/home']);
  }

  next() {
    this.step = this.step + 1;
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
}
