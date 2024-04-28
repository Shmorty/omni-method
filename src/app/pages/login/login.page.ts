import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AlertController, isPlatform} from '@ionic/angular';
import {StatusBar, Style} from '@capacitor/status-bar';
import {Capacitor} from '@capacitor/core';
import {Observable, Subscription, filter} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  title = 'Login';
  email: string = '';
  password: string = '';
  showPassword = false;
  user = null;
  error$: Observable<any>;
  errorSubscription: Subscription;

  // constructor(private signInService: GoogleSigninService, private ref: ChangeDetectorRef) {
  constructor(
    private auth: AuthService,
    private alertController: AlertController
  ) {
    this.error$ = auth.authError();
  }

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

  ngOnInit(): void {
    this.errorSubscription = this.error$
      .pipe(filter(err => err !== ''))
      .subscribe(async (error) => {
        const alert = await this.alertController.create({
          header: 'Error',
          // subHeader: 'A Sub Header Is Optional',
          message: error,
          buttons: ['Ok'],
        });

        await alert.present();
      })
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  async doLogin() {
    try {
      await this.auth.login(this.email, this.password);
    } catch (error) {
      console.log("doLogin error", error);

    }
    this.email = this.password = '';
  }

  async signInWithGoogle() {
    console.log('sign in with google');
    // this.auth.googleSignIn_firebase();
    // console.log('signInWithGoogle user, ', this.user);
  }

}
