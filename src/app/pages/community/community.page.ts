import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {UserService} from 'src/app/services/user/user.service';

export enum View {
  Rankings = 'Rankings',
  Updates = 'Updates',
  People = 'People',
}
export interface Athlete {
  rank: number;
  name: string;
  score: number;
}

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
})
export class CommunityPage implements OnInit {
  View = View;
  public view: View = View.Rankings;
  public ranking$ = this.userService.getUserRankings();

  constructor(private auth: AuthService, private userService: UserService) {}

  ngOnInit() {}

  setView(viewName: View) {
    this.view = viewName;
  }

  viewClass(viewName: View) {
    return this.view === viewName ? 'active' : 'normal';
  }

  logout() {
    this.auth.logout();
  }
}
