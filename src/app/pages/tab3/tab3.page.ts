import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
// import { Store } from '@ngrx/store';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  logout() {
    this.auth.logout();
  }
}
