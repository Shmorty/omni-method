import {Component, Inject, OnInit, inject} from '@angular/core';
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

  registerWithGoogle() {
    console.log('registerWithGoogle');
    // this.auth.googleSignIn_codetrix();
  }
}
