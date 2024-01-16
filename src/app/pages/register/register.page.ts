import {Component, OnInit} from '@angular/core';
import {Capacitor} from '@capacitor/core';
import {StatusBar, Style} from '@capacitor/status-bar';
import {isPlatform} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {AuthService} from 'src/app/services/auth.service';
import {selectUserError} from 'src/app/store/user/user.selectors';

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

  doRegister() {
    this.auth.register(this.email, this.password);
    this.password = this.confirmPassword = '';
  }

  passwordMatch() {
    return this.password && this.password == this.confirmPassword;
  }
}
