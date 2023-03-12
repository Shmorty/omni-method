import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { selectAllCategories } from 'src/app/store/assessments/assessment.selector';
import { selectUser, userScores } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  public categories$ = this.store.select(selectAllCategories);
  public user$ = this.store.select(selectUser);
  public scores$ = this.store.select(userScores);

  constructor(private auth: AuthService, private store: Store) {}

  ngOnInit() {}

  logout() {
    this.auth.logout();
  }
}
