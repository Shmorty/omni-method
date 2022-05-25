import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GoogleSigninService } from '../google-signin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  title = 'google-signin'
  user = 'none'

  constructor(private signInService: GoogleSigninService, private ref: ChangeDetectorRef) {

   }

  signIn() {
  }

  signOut() {
    this.signInService.signOut()
  }

  ngOnInit(): void {
  }

}
