import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  title = 'Login';
  email: string = '';
  password: string = '';
  showPassword = false;

  // constructor(private signInService: GoogleSigninService, private ref: ChangeDetectorRef) {
  constructor(private auth: AuthService) {}

  doLogin() {
    this.auth.login(this.email, this.password);
    this.email = this.password = '';
  }

  signInWithGoogle() {
    console.log('sign in with google');
    // this.auth.googleSignIn();
  }

  ngOnInit(): void {}
}
