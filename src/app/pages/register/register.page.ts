import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  doRegister() {
    this.auth.register(this.email, this.password);
    this.email = this.password = this.confirmPassword = '';
  }

  passwordMatch() {
    return this.password && this.password == this.confirmPassword;
  }
}
