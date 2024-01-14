import {Component, Inject, OnInit, inject} from '@angular/core';
import {Capacitor} from '@capacitor/core';
import {StatusBar, Style} from '@capacitor/status-bar';
import {isPlatform} from '@ionic/angular';
import {AuthService} from 'src/app/services/auth.service';

interface Item {
  hello: string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  title = 'Welcome to Omni Method';

  // private firestore: Firestore = inject(Firestore);
  // private user$: Observable<Item[]>;

  constructor(private auth: AuthService) {}

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

  registerWithGoogle() {
    console.log('registerWithGoogle');
    // this.auth.googleSignIn_codetrix();
  }
}
