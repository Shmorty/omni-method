import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {isPlatform} from '@ionic/angular';
import {StatusBar, Style} from '@capacitor/status-bar';
import {Capacitor} from '@capacitor/core';

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
  user = null;

  // constructor(private signInService: GoogleSigninService, private ref: ChangeDetectorRef) {
  constructor(private auth: AuthService) {}

  ionViewWillEnter() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if (Capacitor.isNativePlatform()) {
      // if (isPlatform('mobile')) {
      // StatusBar.setStyle({style: Style.Dark});
      if (prefersDark.matches) {
        StatusBar.setStyle({style: Style.Dark});
      } else {
        StatusBar.setStyle({style: Style.Light});
      }
    }
  }

  doLogin() {
    this.auth.login(this.email, this.password);
    this.email = this.password = '';
  }

  async signInWithGoogle() {
    console.log('sign in with google');
    // this.auth.googleSignIn_firebase();
    // console.log('signInWithGoogle user, ', this.user);
  }

  ngOnInit(): void {}
}
