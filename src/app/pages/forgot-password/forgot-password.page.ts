import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  title = 'Forgot Password';
  email: string = '';
  errorMessage: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  forgotPassword() {
    if (this.email == null) {
      this.errorMessage = 'All fields are required';
      return;
    }
    this.errorMessage = '';
    this.auth.forgotPassword(this.email);
    this.email = '';
  }
}
