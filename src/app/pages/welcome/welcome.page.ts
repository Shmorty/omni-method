import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  title = 'Welcome to Omni Method';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.currUser;
    if (this.auth.isLoggedIn()) {
      console.log('User is logged in, go to home page');
      this.router.navigate(['/home']);
    } else {
      console.log('user is not logged in');
    }
  }
}
