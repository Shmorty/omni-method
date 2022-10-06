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
  
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.formData = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      nickname: new FormControl(),
      dob: new FormControl(),
      height: new FormGroup({
        feet: new FormControl(),
        inches: new FormControl(),
      }),
      weight: new FormControl()
    })
  }

  onSubmit() {
    console.log(this.formData.value);
    this.userService.setUser(this.formData.value);
    this.router.navigate(['/home']);
  }

}
