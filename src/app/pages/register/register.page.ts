import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { selectUserError } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  title: string = 'Sign up with email';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  public userError$ = this.store.select(selectUserError);

  constructor(private auth: AuthService, private store: Store) {}

  ngOnInit() {}

  doRegister() {
    this.auth.register(this.email, this.password);
    // this.email =
    this.password = this.confirmPassword = '';
  }

  passwordMatch() {
    return this.password && this.password == this.confirmPassword;
  }
}
