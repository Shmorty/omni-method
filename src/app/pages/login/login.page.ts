import { Component, OnInit } from '@angular/core';
// import { GoogleSigninService } from '../google-signin.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  title = 'Omni Method';
  user = 'none';
  email: string = '';
  password: string = '';

  // constructor(private signInService: GoogleSigninService, private ref: ChangeDetectorRef) {
  constructor(private auth: AuthService) {}

  doLogin() {
    this.auth.login(this.email, this.password);
  }

  signOut() {
    // this.signInService.signOut()
  }

  ngOnInit(): void {}
}
