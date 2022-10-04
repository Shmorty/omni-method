import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {

  formData: FormGroup;
  
  constructor() { }

  ngOnInit() {
    this.formData = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      nickname: new FormControl(),
      dob: new FormControl(),
      feet: new FormControl(),
      inches: new FormControl(),
      weight: new FormControl()
    })
  }

  onSubmit() {
    console.log(this.formData.value);
  }

}
